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
        builder.Services.AddScoped<IServicioCore, ServicioCore>();
        builder.Services.AddScoped<IServicioRepo, ServicioRepo>();
        builder.Services.AddScoped<IBDVirtual, BDVirtual>();
        
        return builder;
    }
}