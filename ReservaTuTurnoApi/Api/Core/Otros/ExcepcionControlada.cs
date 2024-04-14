namespace Api.Core.Otros;

public class ExcepcionControlada : Exception
{
    public ExcepcionControlada(string message) : base(message) { }
}