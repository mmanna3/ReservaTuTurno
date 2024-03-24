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
        CreateMap<CategoriaDeServicio, CategoriaDeServicioDTO>().PreserveReferences().ReverseMap();

        CreateMap<ServiciosDelProfesional, ServiciosDelProfesionalDTO>()
            .ForMember(x => x.Servicio, o => o.MapFrom(x => x.Servicio));
        
        CreateMap<ServiciosDelProfesionalDTO, ServiciosDelProfesional>();
        CreateMap<Agenda, AgendaDTO>().PreserveReferences().ReverseMap();
        CreateMap<FranjaHoraria, FranjaHorariaDTO>().ReverseMap();
        CreateMap<string, TimeOnly>().ConvertUsing(s => TimeOnly.Parse(s));
    }
}