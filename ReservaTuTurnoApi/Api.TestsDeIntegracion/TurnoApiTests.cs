namespace Api.TestsDeIntegracion;
public class TurnoApiTests : TestBase
{
    public TurnoApiTests(CustomWebApplicationFactory<Program> factory) : base(factory)
    {
    }
    
    [Fact]
    public async Task ListarTurnosLibres_Funciona()
    {
        var client = Factory.CreateClient();
        
        var response = await client.GetAsync($"/api/turno/ListarTurnosLibres?profesionalId=1&servicioId=1&fechaDesde='01-01-2024'&fechaHasta='15-01-2024'");
        // var response = await client.GetAsync($"/api/turno/ListarTurnosLibres");
        
        response.EnsureSuccessStatusCode();
    }
}