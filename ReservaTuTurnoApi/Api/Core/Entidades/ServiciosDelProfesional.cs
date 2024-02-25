namespace Api.Core.Entidades;

public class ServiciosDelProfesional
{
    public int ServicioId { get; set; }
    public int ProfesionalId { get; set; }
    public int? Precio { get; set; }
    public int? DuracionDelTurnoEnMinutos { get; set; }
}