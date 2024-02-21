using Api.Core.Entidades;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Api.Core.Repositorios;

public interface IRepositorioABM<TModel>
    where TModel : Entidad
{
    Task<IEnumerable<TModel>> Listar();
    EntityEntry<TModel> Crear(TModel reserva);
    Task<TModel?> ObtenerPorId(int id);
    void Modificar(TModel anterior, TModel nuevo);
}