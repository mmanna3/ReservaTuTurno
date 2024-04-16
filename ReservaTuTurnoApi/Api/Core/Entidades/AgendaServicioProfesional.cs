namespace Api.Core.Entidades;

public class AgendaServicioProfesional : Entidad
{
    public ServicioProfesional ServicioProfesional { get; set; } = null!;
    public required int ServicioDelProfesionalId { get; set; }
    
    public virtual Agenda Agenda { get; set; } = null!;
    public required int AgendaId { get; set; }
}