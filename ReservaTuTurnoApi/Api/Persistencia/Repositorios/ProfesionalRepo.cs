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
                    .ThenInclude(x => x.Servicio)
            .AsQueryable();
    }
    
    public async Task<List<ServiciosDelProfesional>> ListarServicios(int id)
    {
        return await Context.ServiciosDelProfesional.Where(x => x.ProfesionalId == id).Include(x => x.Servicio).ToListAsync();
    }
}