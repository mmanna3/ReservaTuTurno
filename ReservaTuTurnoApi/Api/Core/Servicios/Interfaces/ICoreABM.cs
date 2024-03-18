using Api.Core.DTOs;
using Api.Core.Entidades;

namespace Api.Core.Servicios.Interfaces;

public interface ICoreABM<TDTO>
    where TDTO : DTO
{
    Task<IEnumerable<TDTO>> Listar();
    Task<int> Crear(TDTO dto);
    Task<TDTO> ObtenerPorId(int id);
    Task<int> Modificar(int id, TDTO nuevo);

    //Task<string> IntentarBorrar(TDTO dto);
}