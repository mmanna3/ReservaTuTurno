using Api.Persistencia._Config;
using Microsoft.Extensions.DependencyInjection;

namespace Api.TestsDeIntegracion;

public abstract class TestBase 
    : IClassFixture<CustomWebApplicationFactory<Program>>
{
    protected readonly CustomWebApplicationFactory<Program> Factory;

    protected TestBase(CustomWebApplicationFactory<Program> factory)
    {
        Factory = factory;

        using var scope = Factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        context.Database.EnsureCreated();
    }
}