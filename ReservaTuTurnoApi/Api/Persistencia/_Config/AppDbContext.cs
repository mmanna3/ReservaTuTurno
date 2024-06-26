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
        
        builder.Entity<ServicioProfesional>()
            .HasIndex("ProfesionalId", "ServicioId");
    }
    
    public DbSet<Servicio> Servicios { get; set; } = null!;
    public DbSet<CategoriaDeServicio> CategoriasDeServicios { get; set; } = null!;
    public DbSet<Agenda> Agendas { get; set; } = null!;
    public DbSet<FranjaHoraria> AgendaFranjasHorarias { get; set; } = null!;
    public DbSet<AgendaServicioProfesional> AgendasServiciosProfesionales { get; set; } = null!;
    
    public DbSet<Profesional> Profesionales { get; set; } = null!;
    public DbSet<ServicioProfesional> ServiciosProfesionales { get; set; } = null!;
    public DbSet<Turno> Turnos { get; set; } = null!;
    
}