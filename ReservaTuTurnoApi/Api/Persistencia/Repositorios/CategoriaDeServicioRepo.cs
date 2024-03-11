using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Persistencia._Config;

namespace Api.Persistencia.Repositorios;

public class CategoriaDeServicioRepo : RepositorioABM<CategoriaDeServicio>, ICategoriaDeServicioRepo
{
    public CategoriaDeServicioRepo(AppDbContext context) : base(context)
    {
    }
}