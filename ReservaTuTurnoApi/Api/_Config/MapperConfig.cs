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
        CreateMap<HashSet<Servicio>, List<ServicioDTO>>().ReverseMap();
        CreateMap<ServiciosDelProfesional, ServiciosDelProfesionalDTO>().ReverseMap();
        CreateMap<HashSet<ServiciosDelProfesional>, List<ServiciosDelProfesionalDTO>>().ReverseMap();
        CreateMap<Agenda, AgendaDTO>().ReverseMap();
        CreateMap<string, TimeOnly>().ConvertUsing(s => TimeOnly.Parse(s));
    }
}