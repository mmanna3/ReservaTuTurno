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
        
        var agendaEntity = await CrearUnaAgenda(profesional, servicio);

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
    public async Task Obtener_ConProfesionalYServicioNull_TiraExcepcion()
    {
        Func<Task> act = () => _repo.Obtener(null, null);
        
        await Assert.ThrowsAsync<ExcepcionControlada>(act);
    }
    
    private async Task<EntityEntry<Agenda>> CrearUnaAgenda(Profesional profesional, Servicio servicio)
    {
        var franjaHoraria = new FranjaHoraria
        {
            Desde = TimeOnly.Parse("09:00"),
            Hasta = TimeOnly.Parse("18:00"),
            Id = 0,
            AgendaId = 0
        };

        var agenda = new Agenda
        {
            ProfesionalId = profesional.Id,
            Dias = DiaDeLaSemana.Lunes | DiaDeLaSemana.Miercoles,
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