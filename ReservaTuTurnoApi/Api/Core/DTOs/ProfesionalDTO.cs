namespace Api.Core.DTOs;

public class ProfesionalDTO : ProfesionalBaseDTO
{
    public string? Email { get; set; }
    public int Telefono { get; set; }
    public List<AgendaDTO>? Agendas { get; set; }
}