namespace Api.Core.DTOs;

public class ServiciosDelProfesionalDTO : DTO
{
    public string? Servicio { get; set; }
    public int ServicioId { get; set; }
    public int ProfesionalId { get; set; }
    public int? Precio { get; set; }
    public int? DuracionDelTurnoEnMinutos { get; set; }
}