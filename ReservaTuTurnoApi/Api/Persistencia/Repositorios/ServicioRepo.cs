using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Persistencia._Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistencia.Repositorios;

public class ServicioRepo : RepositorioABM<Servicio>, IServicioRepo
{
    public ServicioRepo(AppDbContext context) : base(context)
    {
    }
    
    protected override IQueryable<Servicio> Set()
    {
        return Context.Set<Servicio>().Include(x => x.ProfesionalesQueLoBrindan).AsQueryable();
    }
}