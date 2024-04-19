namespace Api.Core.DTOs;

public class ServicioConProfesionalesDTO
{
    public required string Servicio { get; set; }
    public int ServicioId { get; set; }
    public List<ProfesionalBaseDTO>? Profesionales { get; set; }
}