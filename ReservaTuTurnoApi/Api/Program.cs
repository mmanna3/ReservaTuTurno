using System.Net;
using System.Net.Sockets;
using Api._Config;
using Api.Persistencia._Config;
using Microsoft.EntityFrameworkCore;
using NLog;
using NLog.Web;

var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Debug("Inició el servidor");

try
{
    var builder = WebApplication.CreateBuilder(args);
    
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

    builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
    builder.Services.AddProblemDetails();
    
    var app = builder.Build();
    
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseDeveloperExceptionPage();
        app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
        
        var localIp = LocalIpAddress();
        app.Urls.Add($"http://0.0.0.0:5072");
        app.Urls.Add($"http://{localIp}:5072");
        // app.Urls.Add("https://" + localIp + ":7072");
    }

    app.UseOpenApi();
    app.UseExceptionHandler();
        
    // app.UseHttpsRedirection();
    
    app.UseDefaultFiles();
    app.UseStaticFiles();

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

static string LocalIpAddress()
{
    using var socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, 0);
    socket.Connect("8.8.8.8", 65530);
    var endPoint = socket.LocalEndPoint as IPEndPoint;
    return endPoint != null ? endPoint.Address.ToString() : "127.0.0.1";
}

public partial class Program
{
}