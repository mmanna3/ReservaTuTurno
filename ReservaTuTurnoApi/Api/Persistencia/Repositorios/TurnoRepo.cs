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
    
}