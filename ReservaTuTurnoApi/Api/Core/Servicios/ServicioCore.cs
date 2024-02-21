using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Core.Servicios.Interfaces;
using AutoMapper;

namespace Api.Core.Servicios;

public class ServicioCore : ABMCore<IServicioRepo, Servicio, ServicioDTO>, IServicioCore
{
    public ServicioCore(IBDVirtual bd, IServicioRepo repo, IMapper mapper) : base(bd, repo, mapper)
    {
    }
}