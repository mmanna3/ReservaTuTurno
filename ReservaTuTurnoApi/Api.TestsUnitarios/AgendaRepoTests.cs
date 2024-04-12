using Api.Core.Entidades;
using Api.Core.Enums;
using Api.Core.Otros;
using Api.Core.Repositorios;
using Api.Persistencia.Repositorios;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Api.TestsUnitarios;

public class AgendaRepoTests : BaseRepoTests
{
    private readonly IAgendaRepo _repo; 
    
    public AgendaRepoTests()
    {
        _repo = new AgendaRepo(Context);
    }

    [Fact]
    public async Task Crea_Correctamente_ConTodasLasRelaciones()
    {
        var profesional = DadoQueExisteUnProfesional();
        var categoria = DadoQueExisteUnaCategoriaDeServicio();
        var servicio = DadoQueExisteElServicio(categoria.Id, profesional.Id);
        
        var agendaEntity = await CrearUnaAgenda(profesional, servicio, DiaDeLaSemana.Lunes | DiaDeLaSemana.Miercoles, "09:00", "18:00");

        var agendaRecuperadaDeLaBase = await _repo.ObtenerPorId(agendaEntity.Entity.Id);

        if (agendaRecuperadaDeLaBase != null)
        {
            Assert.Equal(agendaEntity.Entity.Id, agendaRecuperadaDeLaBase.Id);
            Assert.Equal(agendaEntity.Entity.Dias, agendaRecuperadaDeLaBase.Dias);
            Assert.Equal(agendaEntity.Entity.FranjasHorarias.Count, agendaRecuperadaDeLaBase.FranjasHorarias.Count);
            Assert.Equal(agendaEntity.Entity.Servicios.Count, agendaRecuperadaDeLaBase.Servicios.Count);
        }
    }

    [Fact]
    public async Task Obtener_SinServicioNiProfesional_TiraExcepcion()
    {
        Func<Task> act = () => _repo.Listar(null, null);
        
        await Assert.ThrowsAsync<ExcepcionControlada>(act);
    }
    
    [Fact]
    public async Task Obtener_ConProfesionalYSinServicio_DevuelveTodasLasAgendasDelProfesional()
    {
        var profesional = DadoQueExisteUnProfesional();
        var profesional2 = DadoQueExisteUnProfesional();
        var categoria = DadoQueExisteUnaCategoriaDeServicio();
        var servicio = DadoQueExisteElServicio(categoria.Id, profesional.Id);
        var servicio2 = DadoQueExisteElServicio(categoria.Id, profesional.Id);
        
        var agendaEntity1 = await CrearUnaAgenda(profesional, servicio, DiaDeLaSemana.Lunes | DiaDeLaSemana.Miercoles, "09:00", "18:00");
        var agendaEntity2 = await CrearUnaAgenda(profesional, servicio, DiaDeLaSemana.Marte | DiaDeLaSemana.Jueves, "10:00", "13:00");
        var agendaEntity3 = await CrearUnaAgenda(profesional, servicio2, DiaDeLaSemana.Sabado, "10:00", "13:00");
        
        await CrearUnaAgenda(profesional2, servicio, DiaDeLaSemana.Marte | DiaDeLaSemana.Jueves, "10:00", "13:00");

        var agendas = await _repo.Listar(profesional, null);
        var agendasIds = agendas.Select(x => x.Id).ToList();
        
        Assert.Equal(3, agendas.Count);
        Assert.Contains(agendaEntity1.Entity.Id, agendasIds);
        Assert.Contains(agendaEntity2.Entity.Id, agendasIds);
        Assert.Contains(agendaEntity3.Entity.Id, agendasIds);
    }
    
    [Fact]
    public async Task Obtener_SinProfesionalYConServicio_DevuelveTodasLasAgendasDelServicio()
    {
        var profesional = DadoQueExisteUnProfesional();
        var profesional2 = DadoQueExisteUnProfesional();
        var categoria = DadoQueExisteUnaCategoriaDeServicio();
        var servicio1 = DadoQueExisteElServicio(categoria.Id, profesional.Id);
        var servicio2 = DadoQueExisteElServicio(categoria.Id, profesional.Id);
        
        var agendaEntity1 = await CrearUnaAgenda(profesional, servicio1, DiaDeLaSemana.Lunes | DiaDeLaSemana.Miercoles, "09:00", "18:00");
        await CrearUnaAgenda(profesional, servicio2, DiaDeLaSemana.Marte | DiaDeLaSemana.Jueves, "10:00", "13:00");
        await CrearUnaAgenda(profesional, servicio2, DiaDeLaSemana.Sabado, "10:00", "13:00");
        var agendaEntity4 = await CrearUnaAgenda(profesional2, servicio1, DiaDeLaSemana.Marte | DiaDeLaSemana.Jueves, "10:00", "13:00");

        var agendas = await _repo.Listar(null, servicio1);
        var agendasIds = agendas.Select(x => x.Id).ToList();
        
        Assert.Equal(2, agendas.Count);
        Assert.Contains(agendaEntity1.Entity.Id, agendasIds);
        Assert.Contains(agendaEntity4.Entity.Id, agendasIds);
    }
    
    [Fact]
    public async Task Obtener_ConProfesionalYConServicio_FiltraBien()
    {
        var profesional1 = DadoQueExisteUnProfesional();
        var profesional2 = DadoQueExisteUnProfesional();
        var categoria = DadoQueExisteUnaCategoriaDeServicio();
        var servicio1 = DadoQueExisteElServicio(categoria.Id, profesional1.Id);
        var servicio2 = DadoQueExisteElServicio(categoria.Id, profesional1.Id);
        
        var agendaEntity1 = await CrearUnaAgenda(profesional1, servicio1, DiaDeLaSemana.Lunes | DiaDeLaSemana.Miercoles, "09:00", "18:00");
        await CrearUnaAgenda(profesional1, servicio2, DiaDeLaSemana.Marte | DiaDeLaSemana.Jueves, "10:00", "13:00");
        //TODO: Debería tirar excepción porque profesional2 no da servicio2
        await CrearUnaAgenda(profesional2, servicio2, DiaDeLaSemana.Sabado, "10:00", "13:00");
        //Este también
        await CrearUnaAgenda(profesional2, servicio1, DiaDeLaSemana.Marte | DiaDeLaSemana.Jueves, "10:00", "13:00");
        var agendaEntity5 = await CrearUnaAgenda(profesional1, servicio1, DiaDeLaSemana.Domingo, "09:00", "18:00");

        var agendas = await _repo.Listar(profesional1, servicio1);
        var agendasIds = agendas.Select(x => x.Id).ToList();
        
        Assert.Equal(2, agendas.Count);
        Assert.Contains(agendaEntity1.Entity.Id, agendasIds);
        Assert.Contains(agendaEntity5.Entity.Id, agendasIds);
    }
    
    private async Task<EntityEntry<Agenda>> CrearUnaAgenda(Profesional profesional, Servicio servicio, DiaDeLaSemana dias, string desde, string hasta)
    {
        var franjaHoraria = new FranjaHoraria
        {
            Desde = TimeOnly.Parse(desde),
            Hasta = TimeOnly.Parse(hasta),
            Id = 0,
            AgendaId = 0
        };

        var agenda = new Agenda
        {
            ProfesionalId = profesional.Id,
            Dias = dias,
            Id = 0,
            FranjasHorarias = new List<FranjaHoraria>{franjaHoraria},
            Servicios = new List<AgendaServiciosDelProfesional>{new()
            {
                Id = 0,
                AgendaId = 0,
                ServicioDelProfesionalId = servicio.ProfesionalesQueLoBrindan.First().Id,
            }}
        };
        
        var agendaEntity = _repo.Crear(agenda);
        await Context.SaveChangesAsync();
        return agendaEntity;
    }

    private Servicio DadoQueExisteElServicio(int categoriaId, int profesionalId)
    {
        var servicio = new Servicio
        {
            Id = 0,
            Nombre = "Recorte simple",
            ProfesionalesQueLoBrindan = new List<ServiciosDelProfesional>{new()
                {
                    Id = 0, ProfesionalId = profesionalId
                }
            },
            CategoriaDeServicioId = categoriaId
        };
        
        Context.Add(servicio);
        return servicio;
    }

    private CategoriaDeServicio DadoQueExisteUnaCategoriaDeServicio()
    {
        var categoriaDeServicio = new CategoriaDeServicio
        {
            Nombre = "Barba",
            Id = 0
        };
        
        Context.Add(categoriaDeServicio);
        return categoriaDeServicio;
    }

    private Profesional DadoQueExisteUnProfesional(string nombre = "Sweeney", string apellido = "Todd")
    {
        var profesional = new Profesional
        {
            Nombre = nombre,
            Apellido = apellido,
            Id = 0
        };
        Context.Add(profesional);
        return profesional;
    }
}