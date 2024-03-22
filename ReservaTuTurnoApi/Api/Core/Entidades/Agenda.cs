using Api.Core.Enums;

namespace Api.Core.Entidades;

public class Agenda : Entidad
{
    public required int ProfesionalId { get; set; }
    public virtual Profesional Profesional { get; set; }
    public required DiaDeLaSemana Dias { get; set; }
    public required TimeOnly Desde { get; set; }
    public required TimeOnly Hasta { get; set; }
    public virtual ICollection<ServiciosDelProfesional> Servicios { get; set; }
}