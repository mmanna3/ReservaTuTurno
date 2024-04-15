namespace Api.Core.Otros;

public class TurnosPorDia
{
    public DateOnly Dia { get; set; }
    public IList<TimeOnly> Horarios { get; set; }
}