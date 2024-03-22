using Api.Core.Entidades;
using Microsoft.EntityFrameworkCore;

namespace Api.Persistencia._Config;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ServiciosDelProfesional>()
            .HasIndex("ProfesionalId", "ServicioId");
    }
    
    public DbSet<Servicio> Servicios { get; set; } = null!;
    public DbSet<Profesional> Profesionales { get; set; } = null!;
    public DbSet<ServiciosDelProfesional> ServiciosDelProfesional { get; set; } = null!;
}