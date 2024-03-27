namespace Api.Core.Entidades;

public class AgendaServiciosDelProfesional : Entidad
{
    public ServiciosDelProfesional ServicioDelProfesional { get; set; }
    public int ServicioDelProfesionalId { get; set; }
    
    public Agenda Agenda { get; set; } 
    public int AgendaId { get; set; }
}