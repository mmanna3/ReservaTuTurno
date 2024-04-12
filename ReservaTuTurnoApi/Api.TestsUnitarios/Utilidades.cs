using Api.Core.Entidades;
using Api.Core.Enums;
using Api.Persistencia._Config;

namespace Api.TestsUnitarios;

public class Utilidades
{
    private readonly AppDbContext _context;

    public Utilidades(AppDbContext context)
    {
        _context = context;
    }
    
    public CategoriaDeServicio DadoQueExisteUnaCategoriaDeServicio()
    {
        var categoriaDeServicio = new CategoriaDeServicio
        {
            Nombre = "Barba",
            Id = 0
        };
        
        _context.Add(categoriaDeServicio);
        return categoriaDeServicio;
    }
    
    public Servicio DadoQueExisteElServicio(int categoriaId, int profesionalId)
    {
        var servicio = new Servicio
        {
            Id = 0,
            Nombre = "Recorte simple",
            ProfesionalesQueLoBrindan = new List<ServiciosDelProfesional>{new()
                {
                    Id = 0, ProfesionalId = profesionalId
                }
            },
            CategoriaDeServicioId = categoriaId
        };
        
        _context.Add(servicio);
        return servicio;
    }
    
    public Profesional DadoQueExisteUnProfesional(string nombre = "Sweeney", string apellido = "Todd")
    {
        var profesional = new Profesional
        {
            Nombre = nombre,
            Apellido = apellido,
            Id = 0
        };
        _context.Add(profesional);
        return profesional;
    }
    
    public Agenda DadoQueExisteLaAgenda(Profesional profesional, Servicio servicio, DiaDeLaSemana dias, string desde, string hasta)
    {
        var franjaHoraria = new FranjaHoraria
        {
            Desde = TimeOnly.Parse(desde),
            Hasta = TimeOnly.Parse(hasta),
            Id = 0,
            AgendaId = 0
        };

        var agenda = new Agenda
        {
            ProfesionalId = profesional.Id,
            Dias = dias,
            Id = 0,
            FranjasHorarias = new List<FranjaHoraria>{franjaHoraria},
            Servicios = new List<AgendaServiciosDelProfesional>{new()
            {
                Id = 0,
                AgendaId = 0,
                ServicioDelProfesionalId = servicio.ProfesionalesQueLoBrindan.First().Id,
            }}
        };
        
        _context.Agendas.Add(agenda);
        return agenda;
    }
}