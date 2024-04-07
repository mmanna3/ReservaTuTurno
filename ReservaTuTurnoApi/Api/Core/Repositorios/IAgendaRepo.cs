using Api.Core.Entidades;

namespace Api.Core.Repositorios;

public interface IAgendaRepo : IRepositorioABM<Agenda>
{
    IList<Agenda> Obtener(Profesional? profesional, Servicio? servicio);
}