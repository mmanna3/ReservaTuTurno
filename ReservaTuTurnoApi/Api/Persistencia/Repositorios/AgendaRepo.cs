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
        if (servicio == null)
            throw new ExcepcionControlada("El servicio no puede ser null");

        if (profesional == null)
            agendas = Context.Agendas.Where(x => x.Servicios.Select(s => s.ServicioProfesional.ServicioId).Contains(servicio!.Id));
        else
        {
            agendas = Context.Agendas.Where(x => x.ProfesionalId == profesional.Id);
            agendas = agendas.Where(x => x.Servicios.Select(s => s.ServicioProfesional.ServicioId).Contains(servicio!.Id));    
        }
        
        return await agendas
            .Include(x => x.FranjasHorarias)
            .Include(x => x.Servicios)
                .ThenInclude(x => x.ServicioProfesional)
                .ThenInclude(x => x.Servicio)
            .ToListAsync();
    }
    
    protected override IQueryable<Agenda> Set()
    {
        return Context.Set<Agenda>()
            .Include(x => x.FranjasHorarias)
            .Include(x => x.Servicios)
                .ThenInclude(x => x.ServicioProfesional)
                .ThenInclude(x => x.Servicio)
            .AsQueryable();
    }
}