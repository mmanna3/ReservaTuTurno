using Api.Core.Entidades;

namespace Api.Core.Repositorios;

public interface IProfesionalRepo : IRepositorioABM<Profesional>
{
    Task<List<ServicioProfesional>> ListarServicios(int id);
}