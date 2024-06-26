using System.Globalization;
using Api._Config;
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
        
        [HttpGet, Route("ServiciosConProfesionales")]
        public async Task<ActionResult<List<ServicioConProfesionalesDTO>>> ServiciosConProfesionales()
        {
            var result = await Core.ServiciosConProfesionales();
            return Ok(result);
        }
        
        [HttpGet, Route("ListarTurnosLibres")]
        public async Task<ActionResult<IEnumerable<TurnosPorDia>>> ListarTurnosLibres(int? profesionalId, int servicioId,
            string fechaDesde,
            string fechaHasta)
        {
            DateOnly desdeDate;
            DateOnly hastaDate;
            
            try
            {
                desdeDate = DateOnly.Parse(fechaDesde, Utilidades.CultureInfoAr);
                hastaDate = DateOnly.Parse(fechaHasta, Utilidades.CultureInfoAr);
            }
            catch (Exception)
            {
                throw new ExcepcionControlada("Error en las fechas");
            }
            
            var result = await Core.ListarTurnosLibres(profesionalId, servicioId, desdeDate, hastaDate);
        
            return Ok(result);
        }
    }
}
