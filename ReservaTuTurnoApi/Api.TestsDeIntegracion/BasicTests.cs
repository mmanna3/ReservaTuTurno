using Api.Persistencia._Config;
using Microsoft.Extensions.DependencyInjection;

namespace Api.TestsDeIntegracion;

public class BasicTests 
    : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly CustomWebApplicationFactory<Program> _factory;

    public BasicTests(CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;

        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        context.Database.EnsureCreated();
    }

    [Theory]
    [InlineData("categoriaDeServicio")]
    [InlineData("servicio")]
    [InlineData("profesional")]
    [InlineData("agenda")]
    [InlineData("turno")]
    public async Task Get_en_ABMEndpoints_Devuelve_Success(string endpoint)
    {
        var client = _factory.CreateClient();
        
        var response = await client.GetAsync($"/api/{endpoint}");
        
        response.EnsureSuccessStatusCode();
    }
}