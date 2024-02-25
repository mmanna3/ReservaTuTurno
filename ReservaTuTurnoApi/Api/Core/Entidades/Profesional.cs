namespace Api.Core.Entidades;

public class Profesional : Entidad
{
    public required string Nombre { get; set; }
    public required string Apellido { get; set; }
    public string? Email { get; set; }
    public int Telefono { get; set; }
    public virtual ICollection<ServiciosDelProfesional> ServiciosDelProfesional { get; set; }
}