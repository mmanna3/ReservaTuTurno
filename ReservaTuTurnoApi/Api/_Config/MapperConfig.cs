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

        CreateMap<Turno, TurnoDTO>()
            .ForMember(dto => dto.Servicio, o => o.MapFrom(x => x.ServicioProfesional.Servicio.Nombre))
            .ForMember(dto => dto.ServicioId, o => o.MapFrom(x => x.ServicioProfesional.Servicio.Id))
            .ForMember(dto => dto.Profesional,
                o => o.MapFrom(x =>
                    x.ServicioProfesional.Profesional.Nombre + " " + x.ServicioProfesional.Profesional.Apellido))
            .ForMember(dto => dto.ProfesionalId, o => o.MapFrom(x => x.ServicioProfesional.Profesional.Id));

        CreateMap<TurnoDTO, Turno>();
        
        CreateMap<string, TimeOnly>().ConvertUsing(s => TimeOnly.Parse(s));
        CreateMap<TimeOnly, string>().ConvertUsing(t => t.ToString(Utilidades.FormatoHora));
        CreateMap<string, DateOnly>().ConvertUsing(s => DateOnly.Parse(s, Utilidades.CultureInfoAr));
    }
}