namespace Api.Core.DTOs;

public class ServicioDTO : DTO
{
    public required string Nombre { get; set; }
    public string? Descripcion { get; set; }
}