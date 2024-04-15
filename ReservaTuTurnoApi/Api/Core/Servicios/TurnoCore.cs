using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Enums;
using Api.Core.Otros;
using Api.Core.Repositorios;
using Api.Core.Servicios.Interfaces;
using AutoMapper;
using NuGet.Packaging;

namespace Api.Core.Servicios;

public class TurnoCore : ABMCore<ITurnoRepo, Turno, TurnoDTO>, ITurnoCore
{
    private readonly IAgendaCore _agendaCore;
    private readonly IProfesionalRepo _profesionalRepo;
    private readonly IServicioRepo _servicioRepo;
    private readonly IAgendaRepo _agendaRepo;

    public TurnoCore(IBDVirtual bd, ITurnoRepo repo, IMapper mapper, IAgendaCore agendaCore, 
                        IProfesionalRepo profesionalRepo, IServicioRepo servicioRepo, IAgendaRepo agendaRepo) : base(bd, repo, mapper)
    {
        _agendaCore = agendaCore;
        _profesionalRepo = profesionalRepo;
        _servicioRepo = servicioRepo;
        _agendaRepo = agendaRepo;
    }

    public async Task<IList<TurnosPorDia>> ListarTurnosLibres(int? profesionalId, int servicioId, DateOnly fechaDesde,
        DateOnly fechaHasta)
    {
        Profesional? profesional = null;
        if (profesionalId != null)
            profesional = await _profesionalRepo.ObtenerPorId((int)profesionalId); // ObtenerPorId debería tirar excepción?
        
        var servicio = await _servicioRepo.ObtenerPorId(servicioId);
        if (servicio == null)
            throw new ExcepcionControlada("El servicioId es incorrecto");
        
        // Validar que fechaDesde y fechaHasta sean futuras
        // Validar que fechaHasta sea mayor a fechaDesde
        
        var agendas = await _agendaRepo.Listar(profesional, servicio);
        var turnosTomados = await Repo.Listar(profesional, fechaDesde, fechaHasta);
        var turnosPosibles = GenerarTurnosPosibles(agendas, servicio, fechaDesde, fechaHasta);
        var resultado = QuitarTurnosOcupados(turnosPosibles, turnosTomados);
        
        return resultado;
    }

    private static List<TurnosPorDia> GenerarTurnosPosibles(IList<Agenda> agendas, Servicio servicio, DateOnly fechaDesde, DateOnly fechaHasta)
    {
        var result = new List<TurnosPorDia>();
        foreach (var dia in DiasEntre(fechaDesde, fechaHasta))
        {
            var diaDeLaSemana = dia.DayOfWeek.ToDiaDeLaSemana();
            var agendasQueIncluyenElDia = agendas.Where(x => x.Dias.HasFlag(diaDeLaSemana));
            // .OrderByDescending(x => x.FranjasHorarias.Select(f => f.Desde));

            var turnosDelDia = new TurnosPorDia{Dia = dia, Horarios = new List<TimeOnly>()};
            
            foreach (var agenda in agendasQueIncluyenElDia) // Tengo que estar muy seguro que las agendas no se pisan
            {
                foreach (var franja in agenda.FranjasHorarias)
                {
                    var duracion = (int)(agenda.Servicios.Single(x => x.ServicioDelProfesional.ServicioId == servicio.Id).ServicioDelProfesional.DuracionDelTurnoEnMinutos ??
                                     servicio.DuracionDelTurnoPorDefectoEnMinutos)!;
                    
                    var horariosPosibles = GenerarHorariosPosibles(franja.Desde, franja.Hasta, duracion);
                    turnosDelDia.Horarios.AddRange(horariosPosibles); 
                }
            }

            result.Add(turnosDelDia);
        }

        return result;
    }

    // ReSharper disable once ReturnTypeCanBeEnumerable.Local
    private static List<TimeOnly> GenerarHorariosPosibles(TimeOnly desde, TimeOnly hasta, int duracion)
    {
        var result = new List<TimeOnly>();
        
        var proximoHorario = desde;
        while (proximoHorario < hasta)
        {
            result.Add(proximoHorario);
            proximoHorario = proximoHorario.AddMinutes(duracion);
        }

        return result;
    }

    private static IEnumerable<DateOnly> DiasEntre(DateOnly desde, DateOnly hasta)
    {
        for(var dia = desde; dia <= hasta; dia = dia.AddDays(1))
            yield return dia;
    }
    
    private static List<TurnosPorDia> QuitarTurnosOcupados(List<TurnosPorDia> turnosPosibles, List<Turno> turnosTomados)
    {
        foreach (var turnoTomado in turnosTomados)
        {
            var dia = turnosPosibles.Single(x => x.Dia == turnoTomado.Fecha);
            dia.Horarios.Remove(turnoTomado.Hora);
        }

        return turnosPosibles;
    }
}