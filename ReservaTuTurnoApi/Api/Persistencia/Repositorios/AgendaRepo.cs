using System.Collections;
using Api.Core.Entidades;
using Api.Core.Otros;
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
    public async Task<List<Agenda>> Obtener(Profesional? profesional, Servicio? servicio)
    {
        if (servicio == null && profesional == null)
            throw new ExcepcionControlada("Tiene que haber profesional o servicio");
        
        if (servicio == null)
            return await Context.Agendas.Where(x => x.ProfesionalId == profesional!.Id).ToListAsync();
        
        if (profesional == null)
            return await Context.Agendas.Where(x => x.Servicios.Select(s => s.ServicioDelProfesional.ServicioId).Contains(servicio.Id)).ToListAsync();
        
        var servicioDelProfesional = Context.Set<ServiciosDelProfesional>().Where(x => x.ProfesionalId == profesional.Id && x.ServicioId == servicio.Id);
        return await servicioDelProfesional.SelectMany(x => x.Agendas.Select(a => a.Agenda)).ToListAsync();
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
}