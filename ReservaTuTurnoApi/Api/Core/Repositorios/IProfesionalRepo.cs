using Api.Core.Entidades;

namespace Api.Core.Repositorios;

public interface IProfesionalRepo : IRepositorioABM<Profesional>
{
    Task<List<ServiciosDelProfesional>> ListarServicios(int id);
}