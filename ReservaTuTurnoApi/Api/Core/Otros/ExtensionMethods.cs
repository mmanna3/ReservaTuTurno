using Api.Core.Enums;

namespace Api.Core.Otros;

public static class ExtensionMethods
{
    public static DiaDeLaSemana ToDiaDeLaSemana(this DayOfWeek dayOfWeek)
    {
        return (DiaDeLaSemana)(1 << (int)dayOfWeek-1);
    }
}