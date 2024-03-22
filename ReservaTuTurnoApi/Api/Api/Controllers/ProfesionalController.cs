using Api.Core.DTOs;
using Api.Core.Servicios.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Api.Controllers
{
    public class ProfesionalController : ABMController<ProfesionalDTO, IProfesionalCore>
    {
        public ProfesionalController(IProfesionalCore core) : base(core)
        {
        }
        
        [HttpGet("Servicios")]
        public async Task<ActionResult<IEnumerable<ServiciosDelProfesionalDTO>>> Servicios(int id)
        {
            var dto = await Core.Servicios(id);
            return Ok(dto);
        }
    }
}
