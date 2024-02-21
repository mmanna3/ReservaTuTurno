using Api.Core.Entidades;
using Api.Core.Repositorios;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Api.Persistencia._Config;

public abstract class RepositorioABM<TModel> : RepositorioBase, IRepositorioABM<TModel>
    where TModel : Entidad
{
    protected RepositorioABM(AppDbContext context) : base(context)
    {
    }

    public virtual async Task<IEnumerable<TModel>> Listar()
    {
        return await Context.Set<TModel>().ToListAsync();
    }

    public EntityEntry<TModel> Crear(TModel reserva)
    {
        return Context.Set<TModel>().Add(reserva);
    }

    public virtual async Task<TModel?> ObtenerPorId(int id)
    {
        return await Context.Set<TModel>().SingleOrDefaultAsync(x => x.Id == id);
    }

    public void Modificar(TModel anterior, TModel nuevo)
    {
        Context.Entry(anterior).CurrentValues.SetValues(nuevo);
    }
}