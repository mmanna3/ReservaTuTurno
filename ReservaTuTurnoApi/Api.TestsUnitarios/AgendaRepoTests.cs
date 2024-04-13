using Api.Core.Enums;
using Api.Core.Otros;
using Api.Persistencia.Repositorios;
using Api.TestsUtilidades;

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

    [Fact]
    public async Task Listar_SinServicio_TiraExcepcion()
    {
        var profesional = _utilidades.DadoQueExisteUnProfesional();
        
        Func<Task> act = () => _repo.Listar(profesional, null!);
        
        await Assert.ThrowsAsync<ExcepcionControlada>(act);
    }
    
    [Fact]
    public async Task Listar_SinProfesionalYConServicio_DevuelveTodasLasAgendasDelServicio()
    {
        var profesional = _utilidades.DadoQueExisteUnProfesional();
        var profesional2 = _utilidades.DadoQueExisteUnProfesional();
        var categoria = _utilidades.DadoQueExisteUnaCategoriaDeServicio();
        var servicio1 = _utilidades.DadoQueExisteElServicio(categoria, profesional);
        var servicio2 = _utilidades.DadoQueExisteElServicio(categoria, profesional);
        
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
        var servicio1 = _utilidades.DadoQueExisteElServicio(categoria, profesional1);
        var servicio2 = _utilidades.DadoQueExisteElServicio(categoria, profesional1);
        
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