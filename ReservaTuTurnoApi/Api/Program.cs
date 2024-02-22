using System.Configuration;
using Api._Config;
using Api.Core.Repositorios;
using Api.Core.Servicios;
using Api.Core.Servicios.Interfaces;
using Api.Persistencia;
using Api.Persistencia._Config;
using Api.Persistencia.Repositorios;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<IBDVirtual, BDVirtual>();
builder.Services.AddScoped<IServicioRepo, ServicioRepo>();
builder.Services.AddScoped<IServicioCore, ServicioCore>();

builder.Services.AddControllers();
var connectionString = builder.Configuration.GetConnectionString("Default");

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddAutoMapper(typeof(MapperConfig));

// builder = DependencyInjectionConfig.Configurar(builder);



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

app.UseDefaultFiles();
app.UseStaticFiles();
    
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
