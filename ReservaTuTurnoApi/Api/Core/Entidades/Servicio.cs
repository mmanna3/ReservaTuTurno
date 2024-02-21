namespace Api.Core.Entidades;

public class Servicio : Entidad
{
    public required string Nombre { get; set; }
    public string? Descripcion { get; set; }
}