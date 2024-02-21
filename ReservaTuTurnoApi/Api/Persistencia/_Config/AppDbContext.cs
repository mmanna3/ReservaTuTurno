using Api.Core.Entidades;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistencia._Config;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Servicio> Servicios { get; set; } = null!;
    public DbSet<Profesional> Profesionales { get; set; } = null!;
}