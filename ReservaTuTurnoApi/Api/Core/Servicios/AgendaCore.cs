using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Core.Servicios.Interfaces;
using AutoMapper;

namespace Api.Core.Servicios;

public class AgendaCore : ABMCore<IAgendaRepo, Agenda, AgendaDTO>, IAgendaCore
{
    public AgendaCore(IBDVirtual bd, IAgendaRepo repo, IMapper mapper) : base(bd, repo, mapper)
    {
    }
}