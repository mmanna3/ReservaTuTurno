using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Persistencia._Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistencia.Repositorios;

public class TurnoRepo : RepositorioABM<Turno>, ITurnoRepo
{
    public TurnoRepo(AppDbContext context) : base(context)
    {
    }
    
    protected override IQueryable<Turno> Set()
    {
        return Context.Set<Turno>()
            .Include(x => x.ServicioProfesional)
            .AsQueryable();
    }

    public Task<List<Turno>> Listar(Profesional profesional, DateOnly fechaDesde, DateOnly fechaHasta)
    {
        return Context.Turnos.Where(x =>
            x.ServicioProfesional.ProfesionalId == profesional.Id && fechaDesde <= x.Fecha && x.Fecha <= fechaHasta).ToListAsync();
    }
}