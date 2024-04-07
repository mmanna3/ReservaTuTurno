using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Core.Servicios.Interfaces;
using AutoMapper;

namespace Api.Core.Servicios;

public class AgendaCore : ABMCore<IAgendaRepo, Agenda, AgendaDTO>, IAgendaCore
{
    private readonly IAgendaRepo _repo;
    public AgendaCore(IBDVirtual bd, IAgendaRepo repo, IMapper mapper) : base(bd, repo, mapper)
    {
        _repo = repo;
    }

    public IList<Agenda> Obtener(Profesional? profesional, Servicio? servicio)
    {
        return _repo.Obtener(profesional, servicio);
    }
}