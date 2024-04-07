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
        _agendaCore.Obtener(profesional, servicio);
        
        return new List<TurnosPorDia>();
    }
}