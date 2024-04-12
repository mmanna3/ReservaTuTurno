using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Enums;
using Api.Core.Otros;
using Api.Core.Repositorios;
using Api.Core.Servicios.Interfaces;
using AutoMapper;

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

    public async Task<IList<TurnosPorDia>> ListarTurnosLibres(int profesionalId, int servicioId, DateOnly fechaDesde,
        DateOnly fechaHasta)
    {
        var profesional = await _profesionalRepo.ObtenerPorId(profesionalId); // ObtenerPorId debería tirar excepción?
        var servicio = await _servicioRepo.ObtenerPorId(servicioId);
        // Validar que fechaDesde y fechaHasta sean futuras
        // Validar que fechaHasta sea mayor a fechaDesde
        
        var agendas = await _agendaRepo.Listar(profesional, servicio);
        var turnosTomados = await Repo.Listar(profesional, fechaDesde, fechaHasta);
        var turnosPosibles = GenerarTurnosPosibles(agendas, servicio, fechaDesde, fechaHasta);
        var resultado = QuitarTurnosOcupados(turnosPosibles, turnosTomados);
        
        return resultado;
    }

    private List<TurnosPorDia> GenerarTurnosPosibles(IList<Agenda> agendas, Servicio servicio, DateOnly fechaDesde, DateOnly fechaHasta)
    {
        foreach (var dia in DiasEntre(fechaDesde, fechaHasta))
        {
            var diaDeLaSemana = dia.DayOfWeek.ToDiaDeLaSemana();
            var agendasQueIncluyenElDia = agendas.Where(x => x.Dias.HasFlag(diaDeLaSemana))
                                            .OrderByDescending(x => x.FranjasHorarias.Select(f => f.Desde));

            foreach (var agenda in agendasQueIncluyenElDia)
            {
                
            }
            
        }
        
        throw new NotImplementedException();
    }

    private static IEnumerable<DateOnly> DiasEntre(DateOnly desde, DateOnly hasta)
    {
        for(var dia = desde; dia <= hasta; dia = dia.AddDays(1))
            yield return dia;
    }
    
    private List<TurnosPorDia> QuitarTurnosOcupados(List<TurnosPorDia> turnosPosibles, List<Turno> turnosTomados)
    {
        return turnosPosibles;
    }
}