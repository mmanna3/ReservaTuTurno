namespace Api.Core.Enums;

[Flags]
public enum DiaDeLaSemana
{
    Lunes     = 1 << 0, // 0b_00000001 // 1
    Marte     = 1 << 1, // 0b_00000010 // 2
    Miercoles = 1 << 2, // 0b_00000100 // 4
    Jueves    = 1 << 3, // 0b_00001000 // 8
    Viernes   = 1 << 4, // 0b_00010000 // 16
    Sabado    = 1 << 5, // 0b_00100000 // 32
    Domingo   = 1 << 6, // 0b_01000000 // 64
}