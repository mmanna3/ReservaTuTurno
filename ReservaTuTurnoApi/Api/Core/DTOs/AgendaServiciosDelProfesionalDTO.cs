namespace Api.Core.DTOs;

public class AgendaServiciosDelProfesionalDTO : DTO
{
    public ServiciosDelProfesionalDTO? ServicioDelProfesional { get; set; }
    public int ServicioDelProfesionalId { get; set; }
    public int AgendaId { get; set; }
}