using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Core.Servicios.Interfaces;
using AutoMapper;

namespace Api.Core.Servicios;

public class CategoriaDeServicioCore : ABMCore<ICategoriaDeServicioRepo, CategoriaDeServicio, CategoriaDeServicioDTO>, ICategoriaDeServicioCore
{
    public CategoriaDeServicioCore(IBDVirtual bd, ICategoriaDeServicioRepo repo, IMapper mapper) : base(bd, repo, mapper)
    {
    }
}