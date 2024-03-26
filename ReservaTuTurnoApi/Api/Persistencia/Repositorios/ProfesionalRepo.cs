using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Persistencia._Config;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Api.Persistencia.Repositorios;

public class ProfesionalRepo : RepositorioABM<Profesional>, IProfesionalRepo
{
    protected readonly IMapper Mapper; 
    
    public ProfesionalRepo(AppDbContext context, IMapper mapper) : base(context)
    {
        Mapper = mapper;
    }
    
    protected override IQueryable<Profesional> Set()
    {
        return Context.Set<Profesional>()
            .Include(x => x.Agendas)
            .ThenInclude(x => x.FranjasHorarias)
            .Include(x => x.Agendas)
            .ThenInclude(x => x.Servicios)
            .ThenInclude(x => x.ServicioDelProfesional)
            .AsQueryable()
            .AsNoTracking();
    }
    
    public async Task<List<ServiciosDelProfesional>> ListarServicios(int id)
    {
        return await Context.ServiciosDelProfesional.Where(x => x.ProfesionalId == id).Include(x => x.Servicio).ToListAsync();
    }

    protected override void AntesDeModificar(Profesional entidadAnterior, Profesional entidadNueva)
    {
        // var agendasAnteriores = entidadAnterior.Agendas;
        // var agendasNuevas = entidadNueva.Agendas;
        //
        // foreach (var agendaAnterior in agendasAnteriores)
        // {
        //     if (!agendasNuevas.Select(x => x.Id).Contains(agendaAnterior.Id))
        //         Context.Remove(agendaAnterior);
        //
        //     foreach (var franjaAnterior in agendaAnterior.FranjasHorarias)
        //     {
        //         var franjasNuevas = agendasNuevas.SelectMany(x => x.FranjasHorarias);
        //         
        //         if (!franjasNuevas.Select(x => x.Id).Contains(franjaAnterior.Id))
        //             Context.Remove(franjaAnterior);
        //     }
        // }
        
    }
    
    // protected override void AntesDeModificar(Profesional entidadAnterior, Profesional entidadNueva)
    // {
    //     var agendasAnteriores = entidadAnterior.Agendas;
    //     var agendasNuevasIds = entidadNueva.Agendas.Select(x => x.Id);
    //
    //     foreach (var agendaAnterior in agendasAnteriores)
    //     {
    //         if (!agendasNuevasIds.Contains(agendaAnterior.Id))
    //             EliminarAgenda(agendaAnterior);
    //         else
    //         {
    //             var agendaModificada = entidadNueva.Agendas.FirstOrDefault(x => x.Id == agendaAnterior.Id);
    //             if (agendaModificada != null)
    //             {
    //                 var franjasHorariasNuevas = agendaModificada.FranjasHorarias;
    //                 foreach (var franjaHoraria in agendaAnterior.FranjasHorarias)
    //                 {
    //                     var franjaHorariaModificada = franjasHorariasNuevas.FirstOrDefault(x => x.Id == franjaHoraria.Id);
    //                     Context.Attach(franjaHoraria);
    //                     if (franjaHorariaModificada != null)
    //                         Context.Entry(franjaHoraria).CurrentValues.SetValues(franjaHorariaModificada);
    //                     else
    //                         Context.Remove(franjaHoraria);
    //                 }
    //
    //                 var franjasHorariasACrear = franjasHorariasNuevas
    //                     .Where(x => x.Id == 0).ToList();
    //                 if (franjasHorariasACrear.Count > 0)
    //                     Context.AddRange(franjasHorariasACrear);
    //             }
    //         }
    //     }
    // }

    private void EliminarAgenda(Agenda agenda)
    {
        agenda.Servicios = new List<AgendaServiciosDelProfesional>(); // No quiero que borre estas entidades, sí las de la franja horaria
        Context.Agendas.Remove(agenda);
    }
}