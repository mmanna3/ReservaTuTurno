using Api.Core.DTOs;
using Api.Core.Servicios.Interfaces;

namespace Api.Api.Controllers
{
    public class ProfesionalController : ABMController<ProfesionalDTO>
    {
        public ProfesionalController(IProfesionalCore core) : base(core)
        {
        }
    }
}
