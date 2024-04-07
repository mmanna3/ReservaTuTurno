using Api.Core.DTOs;
using Api.Core.Entidades;

namespace Api.Core.Servicios.Interfaces;

public interface ITurnoCore : ICoreABM<TurnoDTO>
{
    IList<TurnosPorDia> ObtenerTurnosLibres(Profesional profesional, Servicio servicio, DateOnly fechaDesde,
        DateOnly fechaHasta);

}