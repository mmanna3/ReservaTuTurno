namespace Api.Persistencia._Config;

public abstract class RepositorioBase
{
    protected readonly AppDbContext Context;

    protected RepositorioBase(AppDbContext context)
    {
        Context = context;
    }
}