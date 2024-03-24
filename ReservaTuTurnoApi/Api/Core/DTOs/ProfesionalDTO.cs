namespace Api.Core.DTOs;

public class ProfesionalDTO : DTO
{
    public required string Nombre { get; set; }
    public required string Apellido { get; set; }
    public string? Email { get; set; }
    public int Telefono { get; set; }
    public List<AgendaDTO> Agendas { get; set; }
}