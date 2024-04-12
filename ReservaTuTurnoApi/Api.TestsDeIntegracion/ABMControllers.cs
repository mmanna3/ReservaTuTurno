using Api.TestsDeIntegracion._Config;

namespace Api.TestsDeIntegracion;
public class ABMControllers : TestBase
{
    public ABMControllers(CustomWebApplicationFactory<Program> factory) : base(factory)
    {
    }
    
    [Theory]
    [InlineData("categoriaDeServicio")]
    [InlineData("servicio")]
    [InlineData("profesional")]
    [InlineData("agenda")]
    [InlineData("turno")]
    public async Task Get_en_ABMEndpoints_Devuelve_Success(string endpoint)
    {
        var client = Factory.CreateClient();
        
        var response = await client.GetAsync($"/api/{endpoint}");
        
        response.EnsureSuccessStatusCode();
    }
}