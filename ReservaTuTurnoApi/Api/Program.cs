using Api._Config;
using Api.Core.Repositorios;
using Api.Core.Servicios;
using Api.Core.Servicios.Interfaces;
using Api.Persistencia._Config;
using Api.Persistencia.Repositorios;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using NLog;
using NLog.Web;

var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("Inició el servidor");

try
{
    var builder = WebApplication.CreateBuilder(args);


    builder.Services.AddScoped<IBDVirtual, BDVirtual>();
    builder.Services.AddScoped<IServicioRepo, ServicioRepo>();
    builder.Services.AddScoped<IServicioCore, ServicioCore>();

    builder.Services.AddControllers();
    
    // NLog: Setup NLog for Dependency injection
    builder.Logging.ClearProviders();
    builder.Host.UseNLog();
    
    var connectionString = builder.Configuration.GetConnectionString("Default");
    builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));
    
    builder.Services.AddAutoMapper(typeof(MapperConfig));

// builder = DependencyInjectionConfig.Configurar(builder);

    builder.Services.AddOpenApiDocument();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    // builder.Services.AddSwaggerGen(options =>
    // {
    //     options.SwaggerDoc("v1", new OpenApiInfo { Title = "Swagger", Version = "v1" });
    // });
    

    var app = builder.Build();

// Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        
        
        app.UseDeveloperExceptionPage();

        app.UseCors(policyBuilder =>
            policyBuilder
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod()
        );
    }

    app.UseOpenApi();
    
    app.UseDefaultFiles();
    app.UseStaticFiles();

    // app.UseMiddleware<MiddlewareDeExcepciones>();

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();
    
    // using (var scope = app.Services.CreateScope())
    // {
    //     var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    //     db.Database.Migrate();
    // }

    app.Run();
}
catch (Exception exception)
{
    logger.Error(exception, "El servidor interrumpió su ejecución por una excepción");
    throw;
}
finally
{
    LogManager.Shutdown();
}
