namespace Api.Core.Entidades;

public class AgendaServiciosDelProfesional : Entidad
{
    public ServiciosDelProfesional ServicioDelProfesional { get; set; } = null!;
    public required int ServicioDelProfesionalId { get; set; }
    
    public virtual Agenda Agenda { get; set; } = null!;
    public required int AgendaId { get; set; }
}