using System.ComponentModel.DataAnnotations;
namespace Api.Core.Otros;

public class TurnosPorDia
{
    public DateOnly Dia { get; set; }
    
    [Required]
    public int Anio { get; set; }
    [Required]
    public int MesIndex { get; set; }
    [Required]
    public int DiaDelMes { get; set; }
    
    public IList<TimeOnly> Horarios { get; set; }

    public TurnosPorDia(DateOnly dia)
    {
        Dia = dia;
        Horarios = new List<TimeOnly>();
        Anio = dia.Year;
        MesIndex = dia.Month - 1;
        DiaDelMes = dia.Day;
    }
}