using Api.Core.Entidades;
using Api.Core.Repositorios;
using Api.Core.Servicios;
using Api.Core.Servicios.Interfaces;
using AutoMapper;
using Moq;

namespace TestsUnitarios;

public class TurnoCoreTests
{
    private ITurnoCore _core = null!;
    private Mock<IBDVirtual> _bdVirtual = null!;
    private Mock<ITurnoRepo> _repo = null!;
    private Mock<IMapper> _mapper = null!;
    private Mock<IAgendaCore> _agendaCore = null!;
    
    [SetUp]
    public void Setup()
    {
        _bdVirtual = new Mock<IBDVirtual>();
        _repo = new Mock<ITurnoRepo>();
        _mapper = new Mock<IMapper>();
        _agendaCore = new Mock<IAgendaCore>();

        _core = new TurnoCore(_bdVirtual.Object, _repo.Object, _mapper.Object, _agendaCore.Object);
    }

    [Test]
    public void Test1()
    {
        var prof = new Profesional { Nombre = "", Apellido = "" };
        var servicio = new Servicio { Nombre = "" };
        var desde = new DateOnly();
        var hasta = new DateOnly().AddDays(15);

        var result = _core.ObtenerTurnosLibres(prof, servicio, desde, hasta);
        
        // Assert.That(result, Has.Exactly(1).EqualTo(3));
        Assert.That(result.Count, Is.EqualTo(0));
    }
}