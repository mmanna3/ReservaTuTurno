using Api.Core.Repositorios;

namespace Api.Persistencia._Config;

//En inglés esto es UnitOfWork
public class BDVirtual : IBDVirtual
{
    private readonly AppDbContext _context;

    public BDVirtual(AppDbContext context)
    {
        _context = context;
    }

    public async Task GuardarCambios()
    {
        await _context.SaveChangesAsync();
    }
}