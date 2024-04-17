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

        CreateMap<ServicioProfesional, ServiciosDelProfesionalDTO>()
            .ForMember(x => x.ServicioNombre, o => o.MapFrom(x => x.Servicio.Nombre));

        CreateMap<AgendaServicioProfesional, AgendaServicioProfesionalDTO>().ReverseMap();
        
        CreateMap<ServiciosDelProfesionalDTO, ServicioProfesional>();
        CreateMap<Agenda, AgendaDTO>().PreserveReferences().ReverseMap();
        CreateMap<FranjaHoraria, FranjaHorariaDTO>().ReverseMap();
        
        CreateMap<Turno, TurnoDTO>().ReverseMap();
        
        CreateMap<string, TimeOnly>().ConvertUsing(s => TimeOnly.Parse(s));
        CreateMap<TimeOnly, string>().ConvertUsing(t => t.ToString("HH:mm"));
        CreateMap<string, DateOnly>().ConvertUsing(s => DateOnly.Parse(s));
    }
}