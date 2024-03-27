using Api.Core.DTOs;
using Api.Core.Servicios.Interfaces;

namespace Api.Api.Controllers
{
    public class TurnoController : ABMController<TurnoDTO, ITurnoCore>
    {
        public TurnoController(ITurnoCore core) : base(core)
        {
        }
    }
}
