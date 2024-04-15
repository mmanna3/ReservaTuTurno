using Api.Core.Entidades;

namespace Api.Core.Repositorios;

public interface ITurnoRepo : IRepositorioABM<Turno>
{
    Task<List<Turno>> Listar(Profesional? profesional, DateOnly fechaDesde, DateOnly fechaHasta);
}