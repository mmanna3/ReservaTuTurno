namespace Api.Core.DTOs;

public class TurnoDTO : DTO
{
    public required string Fecha { get; set; }
    public required string Hora { get; set; }
    public string? Servicio { get; set; }
    public required int ServicioId { get; set; }
    public string? Profesional { get; set; }
    public required int ProfesionalId { get; set; }
}