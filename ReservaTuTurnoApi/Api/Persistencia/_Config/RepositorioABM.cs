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

    protected virtual IQueryable<TModel> Set()
    {
        return Context.Set<TModel>();
    }
    
    public virtual async Task<IEnumerable<TModel>> Listar()
    {
        return await Set().ToListAsync();
    }

    public EntityEntry<TModel> Crear(TModel reserva)
    {
        AntesDeCrear(reserva);
        return Context.Add(reserva);
    }

    public virtual async Task<TModel?> ObtenerPorId(int id)
    {
        return await Set().AsNoTracking().SingleOrDefaultAsync(x => x.Id == id);
    }

    public void Modificar(TModel anterior, TModel nuevo)
    {
        AntesDeModificar(anterior, nuevo);
        Context.Update(nuevo);
        DespuesDeModificar(anterior, nuevo);
    }
    
    protected virtual void AntesDeModificar(TModel entidadAnterior, TModel entidadNueva)
    {
    }
    
    protected virtual void DespuesDeModificar(TModel entidadAnterior, TModel entidadNueva)
    {
    }
    
    protected virtual void AntesDeCrear(TModel entidad)
    {
    }
}