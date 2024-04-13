using Api.Core.Entidades;
using Api.Core.Enums;
using Api.Persistencia._Config;
using Api.TestsDeIntegracion._Config;
using Api.TestsUtilidades;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
// ReSharper disable InconsistentNaming

namespace Api.TestsDeIntegracion;
public class TurnoApiTests : TestBase
{
    private readonly Utilidades _utilidades;
    
    private readonly DateOnly DIA_DEL_TURNO_1 = new(2024, 01, 02);
    private readonly TimeOnly HORA_DEL_TURNO_1 = new(9, 0);
    private const int DURACION_DEL_TURNO = 30;

    public TurnoApiTests(CustomWebApplicationFactory<Program> factory) : base(factory)
    {
        using var scope = Factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        
        _utilidades = new Utilidades(context);
        var categoria = _utilidades.DadoQueExisteUnaCategoriaDeServicio();
        var profesional = _utilidades.DadoQueExisteUnProfesional();
        var servicio = _utilidades.DadoQueExisteElServicio(categoria, profesional, DURACION_DEL_TURNO);
        context.SaveChanges();
        
        _utilidades.DadoQueExisteLaAgenda(profesional, servicio, DiaDeLaSemana.Lunes | DiaDeLaSemana.Miercoles, "09:00", "13:00");
        _utilidades.DadoQueExisteLaAgenda(profesional, servicio, DiaDeLaSemana.Lunes | DiaDeLaSemana.Jueves, "15:00", "20:00");
        
        _utilidades.DadoQueExisteUnTurno(profesional.Id, servicio.Id, DIA_DEL_TURNO_1, HORA_DEL_TURNO_1);
        
        context.SaveChanges();
    }

    [Fact]
    public async Task ListarTurnosLibres_Funciona()
    {
        var client = Factory.CreateClient();
        
        var response = await client.GetAsync($"/api/turno/ListarTurnosLibres?profesionalId=1&servicioId=1&fechaDesde=2024-01-01&fechaHasta=2024-01-15");
        
        var content = JsonConvert.DeserializeObject<List<TurnosPorDia>>(await response.Content.ReadAsStringAsync());
        
        response.EnsureSuccessStatusCode();
        
        Assert.Equal(15, content!.Count);
        var diaDelTurno = content.Single(x => x.Dia.Equals(DIA_DEL_TURNO_1));
        Assert.DoesNotContain(HORA_DEL_TURNO_1, diaDelTurno.Horarios);
        Assert.Contains(HORA_DEL_TURNO_1.AddMinutes(DURACION_DEL_TURNO), diaDelTurno.Horarios);
    }
}