using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Otros;
using Api.Core.Repositorios;
using Api.Core.Servicios.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore.Storage;

namespace Api.Core.Servicios;

public abstract class ABMCore<TRepo, TEntidad, TDTO> : ICoreABM<TDTO>
    where TRepo : IRepositorioABM<TEntidad>
    where TEntidad : Entidad
    where TDTO: DTO
{
    // VirtalDB (como VirtualDOM sería un buen nombre?)
    protected readonly IBDVirtual BDVirtual;
    protected readonly TRepo Repo;
    protected readonly IMapper Mapper; 
    
    protected ABMCore(IBDVirtual bd, TRepo repo, IMapper mapper)
    {
        BDVirtual = bd;
        Repo = repo;
        Mapper = mapper;
    }
    
    public async Task<IEnumerable<TDTO>> Listar()
    {
        var entidades = await Repo.Listar();
        var dtos = Mapper.Map<List<TDTO>>(entidades);
        return dtos;
    }

    public async Task<int> Crear(TDTO dto)
    {
        var entidad = Mapper.Map<TEntidad>(dto);
        entidad = await AntesDeCrear(dto, entidad);
        Repo.Crear(entidad);
        await BDVirtual.GuardarCambios();
        return entidad.Id;
    }

    protected virtual Task<TEntidad> AntesDeCrear(TDTO dto, TEntidad entidad)
    {
        return Task.FromResult(entidad);
    }

    public async Task<TDTO> ObtenerPorId(int id)
    {
        var entidad = await Repo.ObtenerPorId(id);
        var dto = Mapper.Map<TDTO>(entidad);
        return dto;
    }

    public async Task<int> Modificar(int id, TDTO nuevo)
    {
        var entidadAnterior = await Repo.ObtenerPorId(id);
        if (entidadAnterior == null)
            throw new ExcepcionControlada("No existe la entidad a modificar");

        var entidadNueva = Mapper.Map<TEntidad>(nuevo);
        if (entidadNueva == null)
            throw new ExcepcionControlada("Hubo un problema mapeando la entidad");
        
        Repo.Modificar(entidadAnterior, entidadNueva);
        await BDVirtual.GuardarCambios();
        return id;    
        
    }
}