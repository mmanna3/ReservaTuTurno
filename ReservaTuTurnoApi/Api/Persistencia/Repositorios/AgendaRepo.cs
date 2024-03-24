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
        return Context.Set<Agenda>().Include(x => x.FranjasHorarias).AsQueryable();
    }
    
    protected override void AntesDeCrear(Agenda entidad)
    {
        var servicios = entidad.Servicios;
        entidad.Servicios = new List<ServiciosDelProfesional>();
        foreach (var servicio in servicios)
        {
            var servicioDelProfesional = Context.ServiciosDelProfesional.Find(servicio.Id);
            if (servicioDelProfesional != null) 
                entidad.Servicios.Add(servicioDelProfesional);
        }
    }
}