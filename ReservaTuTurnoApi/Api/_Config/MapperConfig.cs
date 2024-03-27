using Api.Core.DTOs;
using Api.Core.Entidades;
using AutoMapper;

namespace Api._Config;

public class MapperConfig : Profile
{
    public MapperConfig()
    {   
        CreateMap<Servicio, ServicioDTO>().PreserveReferences().ReverseMap();           
        CreateMap<Profesional, ProfesionalDTO>().ReverseMap();
        CreateMap<CategoriaDeServicio, CategoriaDeServicioDTO>().PreserveReferences().ReverseMap();

        CreateMap<ServiciosDelProfesional, ServiciosDelProfesionalDTO>()
            .ForMember(x => x.ServicioNombre, o => o.MapFrom(x => x.Servicio.Nombre));

        CreateMap<AgendaServiciosDelProfesional, AgendaServiciosDelProfesionalDTO>().ReverseMap();
        
        CreateMap<ServiciosDelProfesionalDTO, ServiciosDelProfesional>();
        CreateMap<Agenda, AgendaDTO>().PreserveReferences().ReverseMap();
        CreateMap<FranjaHoraria, FranjaHorariaDTO>().ReverseMap();
        
        CreateMap<Turno, TurnoDTO>().ReverseMap();
        
        CreateMap<string, TimeOnly>().ConvertUsing(s => TimeOnly.Parse(s));
        CreateMap<string, DateOnly>().ConvertUsing(s => DateOnly.Parse(s));
    }
}