using Api.Core.DTOs;
using Api.Core.Entidades;

namespace Api.Core.Servicios.Interfaces;

public interface IAgendaCore : ICoreABM<AgendaDTO>
{
    IList<Agenda> Obtener(Profesional? profesional, Servicio? servicio);
}