using Api.Persistencia._Config;
using Microsoft.EntityFrameworkCore;

namespace Api.TestsUnitarios;

public abstract class BaseRepoTests 
{
    protected readonly AppDbContext Context;

    protected BaseRepoTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        Context = new AppDbContext(options);
    }
}