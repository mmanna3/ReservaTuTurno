namespace Api.Core.DTOs;

public class AgendaServicioProfesionalDTO : DTO
{
    public ServiciosDelProfesionalDTO? ServicioProfesional { get; set; }
    public int ServicioProfesionalId { get; set; }
    public int AgendaId { get; set; }
}