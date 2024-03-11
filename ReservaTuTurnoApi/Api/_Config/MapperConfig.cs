using Api.Core.DTOs;
using Api.Core.Entidades;
using AutoMapper;

namespace Api._Config;

public class MapperConfig : Profile
{
    public MapperConfig()
    {   
        CreateMap<Servicio, ServicioDTO>().ReverseMap();           
        CreateMap<Profesional, ProfesionalDTO>().ReverseMap();
        CreateMap<CategoriaDeServicio, CategoriaDeServicioDTO>().ReverseMap();
    }
}