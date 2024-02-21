using System.ComponentModel.DataAnnotations;

namespace Api.Core.Entidades;

public class Entidad
{
    [Key]
    public int Id { get; set; }
}