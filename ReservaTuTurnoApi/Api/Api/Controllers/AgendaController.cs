using Api.Core.DTOs;
using Api.Core.Servicios.Interfaces;

namespace Api.Api.Controllers
{
    public class AgendaController : ABMController<AgendaDTO>
    {
        public AgendaController(IAgendaCore core) : base(core)
        {
        }
    }
}
