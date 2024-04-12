using Api.Core.Enums;
using Api.Core.Otros;
using Api.Persistencia.Repositorios;

namespace Api.TestsUnitarios;

public class AgendaRepoTests : BaseRepoTests
{
    private readonly AgendaRepo _repo;
    private readonly Utilidades _utilidades;

    public AgendaRepoTests()
    {
        _repo = new AgendaRepo(Context);
        _utilidades = new Utilidades(Context);
    }

    // Este está raro, está testeando la utilidad, no el repo
    [Fact]
    public async Task Crea_Correctamente_ConTodasLasRelaciones()
    {
        var profesional = _utilidades.DadoQueExisteUnProfesional();
        var categoria = _utilidades.DadoQueExisteUnaCategoriaDeServicio();
        var servicio = _utilidades.DadoQueExisteElServicio(categoria.Id, profesional.Id);
        var agenda = _utilidades.DadoQueExisteLaAgenda(profesional, servicio, DiaDeLaSemana.Lunes | DiaDeLaSemana.Miercoles, "09:00", "18:00");
        
        await Context.SaveChangesAsync();
        
        var agendaRecuperadaDeLaBase = await _repo.ObtenerPorId(agenda.Id);

        if (agendaRecuperadaDeLaBase != null)
        {
            Assert.Equal(agenda.Id, agendaRecuperadaDeLaBase.Id);
            Assert.Equal(agenda.Dias, agendaRecuperadaDeLaBase.Dias);
            Assert.Equal(agenda.FranjasHorarias.Count, agendaRecuperadaDeLaBase.FranjasHorarias.Count);
            Assert.Equal(agenda.Servicios.Count, agendaRecuperadaDeLaBase.Servicios.Count);
        }
    }

    [Fact]
    public async Task Listar_SinServicioNiProfesional_TiraExcepcion()
    {
        Func<Task> act = () => _repo.Listar(null, null);
        
        await Assert.ThrowsAsync<ExcepcionControlada>(act);
    }
    
    [Fact]
    public async Task Listar_ConProfesionalYSinServicio_DevuelveTodasLasAgendasDelProfesional()
    {
        var profesional = _utilidades.DadoQueExisteUnProfesional();
        var profesional2 = _utilidades.DadoQueExisteUnProfesional();
        var categoria = _utilidades.DadoQueExisteUnaCategoriaDeServicio();
        var servicio = _utilidades.DadoQueExisteElServicio(categoria.Id, profesional.Id);
        var servicio2 = _utilidades.DadoQueExisteElServicio(categoria.Id, profesional.Id);
        
        var agenda1 = _utilidades.DadoQueExisteLaAgenda(profesional, servicio, DiaDeLaSemana.Lunes | DiaDeLaSemana.Miercoles, "09:00", "18:00");
        var agenda2 = _utilidades.DadoQueExisteLaAgenda(profesional, servicio, DiaDeLaSemana.Marte | DiaDeLaSemana.Jueves, "10:00", "13:00");
        var agenda3 = _utilidades.DadoQueExisteLaAgenda(profesional, servicio2, DiaDeLaSemana.Sabado, "10:00", "13:00");
        _utilidades.DadoQueExisteLaAgenda(profesional2, servicio, DiaDeLaSemana.Marte | DiaDeLaSemana.Jueves, "10:00", "13:00");
        await Context.SaveChangesAsync();
        
        var agendas = await _repo.Listar(profesional, null);
        var agendasIds = agendas.Select(x => x.Id).ToList();
        
        Assert.Equal(3, agendas.Count);
        Assert.Contains(agenda1.Id, agendasIds);
        Assert.Contains(agenda2.Id, agendasIds);
        Assert.Contains(agenda3.Id, agendasIds);
    }
    
    [Fact]
    public async Task Listar_SinProfesionalYConServicio_DevuelveTodasLasAgendasDelServicio()
    {
        var profesional = _utilidades.DadoQueExisteUnProfesional();
        var profesional2 = _utilidades.DadoQueExisteUnProfesional();
        var categoria = _utilidades.DadoQueExisteUnaCategoriaDeServicio();
        var servicio1 = _utilidades.DadoQueExisteElServicio(categoria.Id, profesional.Id);
        var servicio2 = _utilidades.DadoQueExisteElServicio(categoria.Id, profesional.Id);
        
        var agenda1 = _utilidades.DadoQueExisteLaAgenda(profesional, servicio1, DiaDeLaSemana.Lunes | DiaDeLaSemana.Miercoles, "09:00", "18:00");
        _utilidades.DadoQueExisteLaAgenda(profesional, servicio2, DiaDeLaSemana.Marte | DiaDeLaSemana.Jueves, "10:00", "13:00");
        _utilidades.DadoQueExisteLaAgenda(profesional, servicio2, DiaDeLaSemana.Sabado, "10:00", "13:00");
        var agenda4 = _utilidades.DadoQueExisteLaAgenda(profesional2, servicio1, DiaDeLaSemana.Marte | DiaDeLaSemana.Jueves, "10:00", "13:00");
        await Context.SaveChangesAsync();
        var agendas = await _repo.Listar(null, servicio1);
        var agendasIds = agendas.Select(x => x.Id).ToList();
        
        Assert.Equal(2, agendas.Count);
        Assert.Contains(agenda1.Id, agendasIds);
        Assert.Contains(agenda4.Id, agendasIds);
    }
    
    [Fact]
    public async Task Listar_ConProfesionalYConServicio_FiltraBien()
    {
        var profesional1 = _utilidades.DadoQueExisteUnProfesional();
        var profesional2 = _utilidades.DadoQueExisteUnProfesional();
        var categoria = _utilidades.DadoQueExisteUnaCategoriaDeServicio();
        var servicio1 = _utilidades.DadoQueExisteElServicio(categoria.Id, profesional1.Id);
        var servicio2 = _utilidades.DadoQueExisteElServicio(categoria.Id, profesional1.Id);
        
        var agenda1 = _utilidades.DadoQueExisteLaAgenda(profesional1, servicio1, DiaDeLaSemana.Lunes | DiaDeLaSemana.Miercoles, "09:00", "18:00");
        _utilidades.DadoQueExisteLaAgenda(profesional1, servicio2, DiaDeLaSemana.Marte | DiaDeLaSemana.Jueves, "10:00", "13:00");
        //TODO: Debería tirar excepción porque profesional2 no da servicio2
        _utilidades.DadoQueExisteLaAgenda(profesional2, servicio2, DiaDeLaSemana.Sabado, "10:00", "13:00");
        //Este también
        _utilidades.DadoQueExisteLaAgenda(profesional2, servicio1, DiaDeLaSemana.Marte | DiaDeLaSemana.Jueves, "10:00", "13:00");
        var agenda5 = _utilidades.DadoQueExisteLaAgenda(profesional1, servicio1, DiaDeLaSemana.Domingo, "09:00", "18:00");
        await Context.SaveChangesAsync();
        
        var agendas = await _repo.Listar(profesional1, servicio1);
        var agendasIds = agendas.Select(x => x.Id).ToList();
        
        Assert.Equal(2, agendas.Count);
        Assert.Contains(agenda1.Id, agendasIds);
        Assert.Contains(agenda5.Id, agendasIds);
    }
}