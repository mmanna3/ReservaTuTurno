namespace Api.Core.DTOs;

public class TurnoDTO : DTO
{
    public string Fecha { get; set; }
    public string Hora { get; set; }
    public ServiciosDelProfesionalDTO? ServicioProfesional { get; set; }
    public int ServicioProfesionalId { get; set; }
}