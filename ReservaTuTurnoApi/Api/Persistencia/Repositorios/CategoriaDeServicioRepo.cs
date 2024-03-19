using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Persistencia._Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistencia.Repositorios;

public class CategoriaDeServicioRepo : RepositorioABM<CategoriaDeServicio>, ICategoriaDeServicioRepo
{
    public CategoriaDeServicioRepo(AppDbContext context) : base(context)
    {
    }
    
    protected override IQueryable<CategoriaDeServicio> Set()
    {
        return Context
            .Set<CategoriaDeServicio>()
            .Include(x => x.Servicios)
            .ThenInclude(x => x.ProfesionalesQueLoBrindan)
            .AsQueryable();
    }
}