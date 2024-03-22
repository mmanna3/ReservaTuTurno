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

    public async Task<IEnumerable<ServiciosDelProfesionalDTO>> Servicios(int id)
    {
        var entidades = await Repo.ListarServicios(id);
        var dtos = Mapper.Map<List<ServiciosDelProfesionalDTO>>(entidades);
        return dtos;
    }
}