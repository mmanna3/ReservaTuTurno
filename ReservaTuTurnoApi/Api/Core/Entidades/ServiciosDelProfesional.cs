namespace Api.Core.Entidades;

public class ServiciosDelProfesional : Entidad
{
    public Servicio Servicio { get; set; }
    public int ServicioId { get; set; }
    
    public Profesional Profesional { get; set; } 
    public int ProfesionalId { get; set; }
    
    public int? Precio { get; set; }
    public int? DuracionDelTurnoEnMinutos { get; set; }
    public virtual ICollection<AgendaServiciosDelProfesional> Agendas { get; set; }
}