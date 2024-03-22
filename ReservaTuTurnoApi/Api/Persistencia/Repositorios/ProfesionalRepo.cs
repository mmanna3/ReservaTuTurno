using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Persistencia._Config;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistencia.Repositorios;

public class ProfesionalRepo : RepositorioABM<Profesional>, IProfesionalRepo
{
    public ProfesionalRepo(AppDbContext context) : base(context)
    {
    }

    public async Task<List<ServiciosDelProfesional>> ListarServicios(int id)
    {
        return await Context.ServiciosDelProfesional.Where(x => x.ProfesionalId == id).ToListAsync();
    }
}