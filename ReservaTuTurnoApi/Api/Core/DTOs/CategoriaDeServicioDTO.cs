using System.ComponentModel.DataAnnotations;

namespace Api.Core.DTOs;

public class CategoriaDeServicioDTO : DTO
{
    [Required]
    public string Nombre { get; set; }
    public string? Descripcion { get; set; }
    public List<ServicioDTO>? Servicios { get; set; }
}