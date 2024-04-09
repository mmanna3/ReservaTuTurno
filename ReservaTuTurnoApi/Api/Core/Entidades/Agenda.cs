using Api.Core.Enums;

namespace Api.Core.Entidades;

public class Agenda : Entidad
{
    public required int ProfesionalId { get; set; }
    public virtual Profesional Profesional { get; set; }
    public required DiaDeLaSemana Dias { get; set; }
    public virtual required ICollection<FranjaHoraria> FranjasHorarias { get; set; }
    public virtual required ICollection<AgendaServiciosDelProfesional> Servicios { get; set; }
}