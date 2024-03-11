namespace Api.Core.Entidades;

public class CategoriaDeServicio : Entidad
{
    public required string Nombre { get; set; }
    public string? Descripcion { get; set; }
    public virtual ICollection<Servicio> Servicios { get; set; }
}