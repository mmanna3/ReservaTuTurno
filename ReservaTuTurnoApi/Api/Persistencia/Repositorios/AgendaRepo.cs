using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Persistencia._Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistencia.Repositorios;

public class AgendaRepo : RepositorioABM<Agenda>, IAgendaRepo
{
    public AgendaRepo(AppDbContext context) : base(context)
    {
    }
    
    protected override IQueryable<Agenda> Set()
    {
        return Context.Set<Agenda>()
            .Include(x => x.FranjasHorarias)
            .Include(x => x.Servicios)
                .ThenInclude(x => x.ServicioDelProfesional)
                .ThenInclude(x => x.Servicio)
            .AsQueryable();
    }
    
    protected override void AntesDeCrear(Agenda entidad)
    {
        var servicios = entidad.Servicios;
        entidad.Servicios = new List<AgendaServiciosDelProfesional>();
        foreach (var servicio in servicios)
        {
            // var servicioDelProfesional = Context.AgendaServiciosDelProfesional.Where(x => xservicio.Id);
            // if (servicioDelProfesional != null) 
            //     entidad.Servicios.Add(servicioDelProfesional);
        }
    }
}