using Api.Core.DTOs;
using Api.Core.Entidades;

namespace Api.Core.Servicios.Interfaces;

public interface IProfesionalCore : ICoreABM<ProfesionalDTO>
{
    Task<IEnumerable<ServiciosDelProfesionalDTO>> Servicios(int id);
}