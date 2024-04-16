namespace Api.Core.DTOs;

public class TurnoDTO : DTO
{
    public required string Fecha { get; set; }
    public required  string Hora { get; set; }
    public ServiciosDelProfesionalDTO? ServicioProfesional { get; set; }
    public required int ServicioProfesionalId { get; set; }
}