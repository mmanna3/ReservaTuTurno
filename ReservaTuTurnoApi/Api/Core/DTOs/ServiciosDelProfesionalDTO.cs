namespace Api.Core.DTOs;

public class ServiciosDelProfesionalDTO
{
    public int ServicioId { get; set; }
    public int ProfesionalId { get; set; }
    public int? Precio { get; set; }
    public int? DuracionDelTurnoEnMinutos { get; set; }
}