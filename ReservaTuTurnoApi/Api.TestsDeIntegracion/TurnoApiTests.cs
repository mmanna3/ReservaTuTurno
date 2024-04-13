using Api.Core.Entidades;
using Api.Core.Enums;
using Api.Persistencia._Config;
using Api.TestsDeIntegracion._Config;
using Api.TestsUtilidades;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Api.TestsDeIntegracion;
public class TurnoApiTests : TestBase
{
    private readonly Utilidades _utilidades;

    public TurnoApiTests(CustomWebApplicationFactory<Program> factory) : base(factory)
    {
        using var scope = Factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        
        _utilidades = new Utilidades(context);
        var categoria = _utilidades.DadoQueExisteUnaCategoriaDeServicio();
        var profesional = _utilidades.DadoQueExisteUnProfesional();
        var servicio = _utilidades.DadoQueExisteElServicio(categoria, profesional);
        context.SaveChanges();
        
        _utilidades.DadoQueExisteLaAgenda(profesional, servicio, DiaDeLaSemana.Lunes | DiaDeLaSemana.Miercoles, "09:00", "18:00");
        _utilidades.DadoQueExisteUnTurno(profesional.Id, servicio.Id, new DateOnly(2024, 01, 02), new TimeOnly(9, 0));
        
        // SeedData();
        
        context.SaveChanges();
    }

    private void SeedData()
    {

    }

    [Fact]
    public async Task ListarTurnosLibres_Funciona()
    {
        var client = Factory.CreateClient();
        
        var response = await client.GetAsync($"/api/turno/ListarTurnosLibres?profesionalId=1&servicioId=1&fechaDesde=2024-01-01&fechaHasta=2024-01-15");
        
        var content = JsonConvert.DeserializeObject<List<TurnosPorDia>>(await response.Content.ReadAsStringAsync());
        
        response.EnsureSuccessStatusCode();
    }
}