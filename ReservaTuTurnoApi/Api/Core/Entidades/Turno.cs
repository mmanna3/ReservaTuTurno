namespace Api.Core.Entidades;

public class Turno : Entidad
{
    public required DateOnly Fecha { get; set; }
    public required TimeOnly Hora { get; set; }
    public required int ServicioProfesionalId { get; set; }
    public ServicioProfesional ServicioProfesional { get; set; } = null!;
}