namespace Api.Core.Entidades;

public class Turno : Entidad
{
    public DateOnly Fecha { get; set; }
    public TimeOnly Hora { get; set; }
    public int ServicioProfesionalId { get; set; }
    public required ServiciosDelProfesional ServicioProfesional { get; set; } 
}