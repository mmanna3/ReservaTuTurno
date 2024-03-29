namespace Api.Core.Entidades;

public class Servicio : Entidad
{
    public required string Nombre { get; set; }
    public string? Descripcion { get; set; }
    public int? PrecioPorDefecto { get; set; }
    public int? DuracionDelTurnoPorDefectoEnMinutos { get; set; }
    public virtual ICollection<ServiciosDelProfesional> ProfesionalesQueLoBrindan { get; set; }
    public virtual CategoriaDeServicio CategoriaDeServicio { get; set; }
    public int CategoriaDeServicioId { get; set; }
}