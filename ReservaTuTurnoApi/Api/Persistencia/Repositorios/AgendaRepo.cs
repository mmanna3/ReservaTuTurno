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
    public async Task<List<Agenda>> Listar(Profesional? profesional, Servicio servicio)
    {
        IQueryable<Agenda> agendas;
        if (servicio == null && profesional == null)
            throw new ExcepcionControlada("Tiene que haber profesional o servicio");
        
        if (servicio == null)
            agendas = Context.Agendas.Where(x => x.ProfesionalId == profesional!.Id);
        else if (profesional == null)
            agendas = Context.Agendas.Where(x => x.Servicios.Select(s => s.ServicioDelProfesional.ServicioId).Contains(servicio!.Id));
        else
        {
            agendas = Context.Agendas.Where(x => x.ProfesionalId == profesional.Id);
            agendas = agendas.Where(x => x.Servicios.Select(s => s.ServicioDelProfesional.ServicioId).Contains(servicio!.Id));    
        }
        
        return await agendas
            .Include(x => x.FranjasHorarias)
            .Include(x => x.Servicios)
                .ThenInclude(x => x.ServicioDelProfesional)
                .ThenInclude(x => x.Servicio)
            .ToListAsync();
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