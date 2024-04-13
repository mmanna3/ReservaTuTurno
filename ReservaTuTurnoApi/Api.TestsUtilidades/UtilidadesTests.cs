using Api.Core.Enums;
using Api.Persistencia._Config;
using Api.Persistencia.Repositorios;
using Microsoft.EntityFrameworkCore;

namespace Api.TestsUtilidades;

public class UtilidadesTests
{
    
    private readonly AgendaRepo _repo;
    private readonly Utilidades _utilidades;
    private readonly AppDbContext _context;

    public UtilidadesTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);
        
        _repo = new AgendaRepo(_context);
        _utilidades = new Utilidades(_context);
    }
    
    [Fact]
    public async void Crea_Correctamente_ConTodasLasRelaciones()
    {
        var profesional = _utilidades.DadoQueExisteUnProfesional();
        var categoria = _utilidades.DadoQueExisteUnaCategoriaDeServicio();
        var servicio = _utilidades.DadoQueExisteElServicio(categoria, profesional, 30);
        var agenda = _utilidades.DadoQueExisteLaAgenda(profesional, servicio, DiaDeLaSemana.Lunes | DiaDeLaSemana.Miercoles, "09:00", "18:00");
        
        await _context.SaveChangesAsync();
        
        var agendaRecuperadaDeLaBase = await _repo.ObtenerPorId(agenda.Id);

        if (agendaRecuperadaDeLaBase != null)
        {
            Assert.Equal(agenda.Id, agendaRecuperadaDeLaBase.Id);
            Assert.Equal(agenda.Dias, agendaRecuperadaDeLaBase.Dias);
            Assert.Equal(agenda.FranjasHorarias.Count, agendaRecuperadaDeLaBase.FranjasHorarias.Count);
            Assert.Equal(agenda.Servicios.Count, agendaRecuperadaDeLaBase.Servicios.Count);
        }
    }
}