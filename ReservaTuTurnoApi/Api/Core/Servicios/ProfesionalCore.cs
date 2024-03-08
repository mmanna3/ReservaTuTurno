using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Core.Servicios.Interfaces;
using AutoMapper;

namespace Api.Core.Servicios;

public class ProfesionalCore : ABMCore<IProfesionalRepo, Profesional, ProfesionalDTO>, IProfesionalCore
{
    public ProfesionalCore(IBDVirtual bd, IProfesionalRepo repo, IMapper mapper) : base(bd, repo, mapper)
    {
    }
}