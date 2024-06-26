using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Persistencia._Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistencia.Repositorios;

public class ProfesionalRepo : RepositorioABM<Profesional>, IProfesionalRepo
{
    
    public ProfesionalRepo(AppDbContext context) : base(context)
    {
    }
    
    protected override IQueryable<Profesional> Set()
    {
        return Context.Set<Profesional>()
            .Include(x => x.Agendas)
            .ThenInclude(x => x.FranjasHorarias)
            .Include(x => x.Agendas)
            .ThenInclude(x => x.Servicios)
            .ThenInclude(x => x.ServicioProfesional)
            .ThenInclude(x => x.Servicio)
            .AsQueryable();

    }
    
    public async Task<List<ServicioProfesional>> ListarServicios(int id)
    {
        return await Context.ServiciosProfesionales.Where(x => x.ProfesionalId == id).Include(x => x.Servicio).ToListAsync();
    }

    protected override void DespuesDeModificar(Profesional entidadAnterior, Profesional entidadNueva)
    {
        var agendasAnteriores = entidadAnterior.Agendas;
        var agendasNuevas = entidadNueva.Agendas;
        
        foreach (var agendaAnterior in agendasAnteriores)
        {
            if (!agendasNuevas.Select(x => x.Id).Contains(agendaAnterior.Id))
                Context.Entry(agendaAnterior).State = EntityState.Deleted;
        
            foreach (var franjaAnterior in agendaAnterior.FranjasHorarias)
            {
                var franjasNuevas = agendasNuevas.SelectMany(x => x.FranjasHorarias);

                if (!franjasNuevas.Select(x => x.Id).Contains(franjaAnterior.Id))
                    Context.Entry(franjaAnterior).State = EntityState.Deleted;
            }
            
            foreach (var servicioAnterior in agendaAnterior.Servicios)
            {
                var serviciosNuevos = agendasNuevas.SelectMany(x => x.Servicios);

                if (!serviciosNuevos.Select(x => x.Id).Contains(servicioAnterior.Id))
                    Context.Entry(servicioAnterior).State = EntityState.Deleted;
            }
        }
    }

    private void EliminarAgenda(Agenda agenda)
    {
        agenda.Servicios = new List<AgendaServicioProfesional>(); // No quiero que borre estas entidades, sí las de la franja horaria
        Context.Agendas.Remove(agenda);
    }
}