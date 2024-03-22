using Api.Core.Entidades;
using Api.Core.Enums;

namespace Api.Core.DTOs;

public class AgendaDTO : DTO
{
    public required int ProfesionalId { get; set; }
    public required DiaDeLaSemana Dias { get; set; }
    public required string Desde { get; set; }
    public required string Hasta { get; set; }
    public List<ServiciosDelProfesionalDTO> Servicios { get; set; }
}