using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Core.Servicios.Interfaces;
using AutoMapper;

namespace Api.Core.Servicios;

public class TurnoCore : ABMCore<ITurnoRepo, Turno, TurnoDTO>, ITurnoCore
{
    public TurnoCore(IBDVirtual bd, ITurnoRepo repo, IMapper mapper) : base(bd, repo, mapper)
    {
    }
}