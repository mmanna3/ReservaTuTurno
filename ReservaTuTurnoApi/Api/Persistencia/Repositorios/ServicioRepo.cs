using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Persistencia._Config;

namespace Api.Persistencia.Repositorios;

public class ServicioRepo : RepositorioABM<Servicio>, IServicioRepo
{
    public ServicioRepo(AppDbContext context) : base(context)
    {
    }
}