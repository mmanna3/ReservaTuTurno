using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Persistencia._Config;

namespace Api.Persistencia.Repositorios;

public class ProfesionalRepo : RepositorioABM<Profesional>, IProfesionalRepo
{
    public ProfesionalRepo(AppDbContext context) : base(context)
    {
    }
}