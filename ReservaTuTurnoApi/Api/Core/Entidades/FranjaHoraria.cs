using Api.Core.Enums;

namespace Api.Core.Entidades;

public class FranjaHoraria : Entidad
{
    public required int AgendaId { get; set; }
    public virtual Agenda Agenda { get; set; }
    public required TimeOnly Desde { get; set; }
    public required TimeOnly Hasta { get; set; }
}