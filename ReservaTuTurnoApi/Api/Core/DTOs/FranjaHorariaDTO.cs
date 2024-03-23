namespace Api.Core.DTOs;

public class FranjaHorariaDTO : DTO
{
    public required string Desde { get; set; }
    public required string Hasta { get; set; }
    public required int AgendaId { get; set; }
}