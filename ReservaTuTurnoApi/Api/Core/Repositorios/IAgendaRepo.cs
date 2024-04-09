using Api.Core.Entidades;

namespace Api.Core.Repositorios;

public interface IAgendaRepo : IRepositorioABM<Agenda>
{
    Task<List<Agenda>> Obtener(Profesional? profesional, Servicio? servicio);
}