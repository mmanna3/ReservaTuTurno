using System.ComponentModel.DataAnnotations;

namespace Api.Core.Entidades;

public class Entidad
{
    [Key]
    public required int Id { get; set; }
}