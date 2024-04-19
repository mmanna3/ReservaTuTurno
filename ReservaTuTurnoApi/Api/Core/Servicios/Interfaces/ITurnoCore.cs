using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Otros;

namespace Api.Core.Servicios.Interfaces;

public interface ITurnoCore : ICoreABM<TurnoDTO>
{
    public Task<IList<TurnosPorDia>> ListarTurnosLibres(int? profesionalId, int servicioId, DateOnly fechaDesde,
        DateOnly fechaHasta);

    Task<List<ServicioConProfesionalesDTO>> ServiciosConProfesionales();
}