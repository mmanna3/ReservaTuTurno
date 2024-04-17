using Api.Core.Entidades;
using Api.Core.Enums;

namespace Api.Core.DTOs;

public class AgendaDTO : DTO
{
    public required int ProfesionalId { get; set; }
    public required DiaDeLaSemana Dias { get; set; }
    public required List<FranjaHorariaDTO> FranjasHorarias { get; set; }
    public required List<AgendaServicioProfesionalDTO> Servicios { get; set; }
}