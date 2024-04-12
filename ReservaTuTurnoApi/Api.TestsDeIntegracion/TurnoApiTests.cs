using Api.Core.Entidades;
using Api.Persistencia._Config;
using Api.TestsDeIntegracion._Config;
using Microsoft.Extensions.DependencyInjection;

namespace Api.TestsDeIntegracion;
public class TurnoApiTests : TestBase
{
    public TurnoApiTests(CustomWebApplicationFactory<Program> factory) : base(factory)
    {
    }
    
    [Fact]
    public async Task ListarTurnosLibres_Funciona()
    {
        using var scope = Factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        var categoriaEntity = context.CategoriasDeServicios.Add(new CategoriaDeServicio
        {
            Nombre = "Categoría",
            Id = 0
        });
        
        var servicioEntity = context.Servicios.Add(new Servicio
        {
            Nombre = "Servicio",
            Id = 0,
            CategoriaDeServicio = categoriaEntity.Entity,
            CategoriaDeServicioId = 0,
        });
        await context.SaveChangesAsync();
        
        var client = Factory.CreateClient();
        
        var response = await client.GetAsync($"/api/turno/ListarTurnosLibres?profesionalId=1&servicioId=1&fechaDesde=2024-01-01&fechaHasta=2024-01-15");
        // var response = await client.GetAsync($"/api/turno/ListarTurnosLibres");
        
        response.EnsureSuccessStatusCode();
    }
}