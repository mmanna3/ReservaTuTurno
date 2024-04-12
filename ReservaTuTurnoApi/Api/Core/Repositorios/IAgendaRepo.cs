using Api.Core.Entidades;

namespace Api.Core.Repositorios;

public interface IAgendaRepo : IRepositorioABM<Agenda>
{
    Task<List<Agenda>> Listar(Profesional? profesional, Servicio? servicio);
}