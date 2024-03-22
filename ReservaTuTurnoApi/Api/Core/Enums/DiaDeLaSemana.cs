namespace Api.Core.Enums;

[Flags]
public enum DiaDeLaSemana
{
    Domingo   = 1 << 0, // 0b_00000001 // 1
    Lunes     = 1 << 1, // 0b_00000010 // 2
    Martes    = 1 << 2, // 0b_00000100 // 4
    Miercoles = 1 << 3, // 0b_00001000 // 8
    Jueves    = 1 << 4, // 0b_00010000 // 16
    Viernes   = 1 << 5, // 0b_00100000 // 32
    Sabado    = 1 << 6, // 0b_01000000 // 64
}