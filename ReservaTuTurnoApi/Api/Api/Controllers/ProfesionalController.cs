using Api.Core.DTOs;
using Api.Core.Servicios.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesionalController : ABMController<ProfesionalDTO>
    {
        public ProfesionalController(IProfesionalCore core) : base(core)
        {
        }
    }
}
