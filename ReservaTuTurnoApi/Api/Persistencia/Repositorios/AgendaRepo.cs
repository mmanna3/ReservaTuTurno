using System.Collections;
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

    // ReSharper disable once ConvertIfStatementToSwitchStatement
    public IList<Agenda> Obtener(Profesional? profesional, Servicio? servicio)
    {
        if (servicio == null && profesional == null)
            throw new Exception("Tiene que haber profesional o servicio");
        
        if (servicio == null)
            return Context.Agendas.Where(x => x.ProfesionalId == profesional!.Id).ToList();
        
        if (profesional == null)
            return Context.Agendas.Where(x => x.Servicios.Select(s => s.ServicioDelProfesional.ServicioId).Contains(servicio.Id)).ToList();
        
        var servicioDelProfesional = Context.Set<ServiciosDelProfesional>().Where(x => x.ProfesionalId == profesional.Id && x.ServicioId == servicio.Id);
        return servicioDelProfesional.SelectMany(x => x.Agendas.Select(a => a.Agenda)).ToList();
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