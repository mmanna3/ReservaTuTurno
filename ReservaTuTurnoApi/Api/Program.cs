using Api._Config;
using Api.Persistencia._Config;
using Microsoft.EntityFrameworkCore;
using NLog;
using NLog.Web;

namespace Api;

public class Program
{
    public static void Main()
    {
        var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
        logger.Debug("Inició el servidor");
        
        try
        {
            var builder = WebApplication.CreateBuilder();
            
            builder = InyeccionDeDependenciasConfig.Configurar(builder);
        
            builder.Services.AddControllers();
            
            builder.Logging.ClearProviders();
            builder.Host.UseNLog();
            
            var connectionString = builder.Configuration.GetConnectionString("Default");
            builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));
            
            builder.Services.AddAutoMapper(typeof(MapperConfig));
        
            builder.Services.AddOpenApiDocument();
        
        
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
        
            var app = builder.Build();
            
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseDeveloperExceptionPage();
                app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            }
        
            app.UseOpenApi();
            
            app.UseDefaultFiles();
            app.UseStaticFiles();
            
            app.UseHttpsRedirection();
        
            app.UseAuthorization();
        
            app.MapControllers();
            
            // Esto es por si hay problema ejecutando las migraciones en una nueva instancia
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
    }
}