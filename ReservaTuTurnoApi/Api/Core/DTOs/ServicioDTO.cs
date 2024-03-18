using System.ComponentModel.DataAnnotations;

namespace Api.Core.DTOs;

public class ServicioDTO : DTO
{
    [Required]
    public string Nombre { get; set; }
    public string? Descripcion { get; set; }
    public int? PrecioPorDefecto { get; set; }
    public int? DuracionDelTurnoPorDefectoEnMinutos { get; set; }
    public int CategoriaDeServicioId { get; set; }
    public List<ServiciosDelProfesionalDTO> ProfesionalesQueLoBrindan { get; set; }
}