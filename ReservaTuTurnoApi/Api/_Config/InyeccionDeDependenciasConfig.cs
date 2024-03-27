using Api.Core.Repositorios;
using Api.Core.Servicios;
using Api.Core.Servicios.Interfaces;
using Api.Persistencia._Config;
using Api.Persistencia.Repositorios;

namespace Api._Config;

public static class InyeccionDeDependenciasConfig
{
    public static WebApplicationBuilder Configurar(WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<IBDVirtual, BDVirtual>();
        builder.Services.AddScoped<IServicioRepo, ServicioRepo>();
        builder.Services.AddScoped<IServicioCore, ServicioCore>();
        builder.Services.AddScoped<IProfesionalRepo, ProfesionalRepo>();
        builder.Services.AddScoped<IProfesionalCore, ProfesionalCore>();
        builder.Services.AddScoped<ICategoriaDeServicioRepo, CategoriaDeServicioRepo>();
        builder.Services.AddScoped<ICategoriaDeServicioCore, CategoriaDeServicioCore>();
        builder.Services.AddScoped<IAgendaRepo, AgendaRepo>();
        builder.Services.AddScoped<IAgendaCore, AgendaCore>();
        builder.Services.AddScoped<ITurnoRepo, TurnoRepo>();
        builder.Services.AddScoped<ITurnoCore, TurnoCore>();
        
        return builder;
    }
}