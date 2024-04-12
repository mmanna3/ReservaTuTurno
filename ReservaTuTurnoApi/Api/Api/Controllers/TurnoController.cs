using System.Runtime.InteropServices.JavaScript;
using Api.Core.DTOs;
using Api.Core.Otros;
using Api.Core.Servicios.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Api.Controllers
{
    public class TurnoController : ABMController<TurnoDTO, ITurnoCore>
    {
        public TurnoController(ITurnoCore core) : base(core)
        {
        }

        // [HttpGet, Route("ListarTurnosLibres")]
        // public async Task<ActionResult<IEnumerable<TurnosPorDia>>> ListarTurnosLibres()
        // {
        //
        //     return Ok();
        // }
        
        [HttpGet, Route("ListarTurnosLibres")]
        public async Task<ActionResult<IEnumerable<TurnosPorDia>>> ListarTurnosLibres(int? profesionalId, int? servicioId,
            string? fechaDesde,
            string? fechaHasta)
        {
            DateOnly desdeDate;
            DateOnly hastaDate;
            
            try
            {
                desdeDate = DateOnly.Parse(fechaDesde);
                hastaDate = DateOnly.Parse(fechaHasta);
            }
            catch (Exception)
            {
                throw new ExcepcionControlada("Error en las fechas");
            }
            
            
            var result = await Core.ListarTurnosLibres((int)profesionalId, (int)servicioId, desdeDate, hastaDate);
        
            return Ok(result);
        }
    }
}
