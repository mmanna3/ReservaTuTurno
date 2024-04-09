using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Core.Servicios.Interfaces;
using AutoMapper;

namespace Api.Core.Servicios;

public class TurnoCore : ABMCore<ITurnoRepo, Turno, TurnoDTO>, ITurnoCore
{
    private readonly IAgendaCore _agendaCore;
    
    public TurnoCore(IBDVirtual bd, ITurnoRepo repo, IMapper mapper, IAgendaCore agendaCore) : base(bd, repo, mapper)
    {
        _agendaCore = agendaCore;
    }

    public IList<TurnosPorDia> ObtenerTurnosLibres(Profesional? profesional, Servicio? servicio, DateOnly fechaDesde, DateOnly fechaHasta)
    {
        // recibir los ids, no las entidades
        // Validar que fechaDesde y fechaHasta sean futuras
        // Validar que fechaHasta sea mayor a fechaDesde
        
        // Get profesional, si no existe, excepción
        // Get servicio, si no existe, excepción
        _agendaCore.Obtener(profesional, servicio); // esto devuelve las agendas pertinentes
        // Obtener los turnos para el rango de fechas
        // ObtenerTurnosPosiblesParaElRango(agendas, desde, hasta) // devuelve IList<TurnosPorDia>
        // QuitarTurnosOcupados(turnosPosibles, turnosOcupados) // devuelve IList<TurnosPorDia>
        
        return new List<TurnosPorDia>();
    }
}