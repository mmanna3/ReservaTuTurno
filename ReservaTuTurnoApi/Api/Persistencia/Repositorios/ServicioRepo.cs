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
        return Context.Set<Servicio>()
                .Include(x => x.ProfesionalesQueLoBrindan)
                    .ThenInclude(x => x.Profesional)
                .AsQueryable();
    }
    
    protected override void DespuesDeModificar(Servicio entidadAnterior, Servicio entidadNueva)
    {
        EliminarRelacionesBorradas(entidadAnterior, entidadNueva);
        // AgregarRelacionesCreadas(entidadAnterior, entidadNueva);
    }

    private void EliminarRelacionesBorradas(Servicio entidadAnterior, Servicio entidadNueva)
    {
        var idsEntidadNueva = entidadNueva.ProfesionalesQueLoBrindan.Select(x => x.ProfesionalId);
        
        var serviciosDelProfesionalAEliminar = entidadAnterior.ProfesionalesQueLoBrindan
            .Where(n => !idsEntidadNueva.Contains(n.ProfesionalId));

        foreach (var servicio in serviciosDelProfesionalAEliminar) 
            Context.Entry(servicio).State = EntityState.Deleted;
    }
    
    private void AgregarRelacionesCreadas(Servicio entidadAnterior,Servicio entidadNueva)
    {
        var profesionalIds = Context.ServiciosProfesionales.Where(x => x.ServicioId == entidadNueva.Id).Select(x => x.ProfesionalId);
        
        foreach (var profesionalQueBrindaElServicio in entidadNueva.ProfesionalesQueLoBrindan)
        {
            if (profesionalIds.Contains(profesionalQueBrindaElServicio.ProfesionalId))
                Context.Entry(entidadAnterior.ProfesionalesQueLoBrindan.First(x => x.ProfesionalId == profesionalQueBrindaElServicio.ProfesionalId)).CurrentValues.SetValues(profesionalQueBrindaElServicio);
            else
                Context.ServiciosProfesionales.Add(profesionalQueBrindaElServicio);
        }
        
        
    }
}