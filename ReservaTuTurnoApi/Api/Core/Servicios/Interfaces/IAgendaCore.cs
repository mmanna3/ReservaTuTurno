using Api.Core.DTOs;
using Api.Core.Entidades;

namespace Api.Core.Servicios.Interfaces;

public interface IAgendaCore : ICoreABM<AgendaDTO>
{
    Task<IList<Agenda>> Obtener(Profesional? profesional, Servicio? servicio);
}