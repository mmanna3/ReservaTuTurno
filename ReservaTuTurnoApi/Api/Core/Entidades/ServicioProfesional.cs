namespace Api.Core.Entidades;

public class ServicioProfesional : Entidad
{
    public Servicio Servicio { get; set; } = null!;
    public required int ServicioId { get; set; }
    
    public Profesional Profesional { get; set; } = null!;
    public required int ProfesionalId { get; set; }
    
    public int? Precio { get; set; }
    public int? DuracionDelTurnoEnMinutos { get; set; }
    public virtual ICollection<AgendaServicioProfesional> Agendas { get; set; } = null!;
}