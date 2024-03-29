using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Servicios.Interfaces;
using Api.Persistencia._Config;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicioController : ABMController<ServicioDTO, IServicioCore>
    {
        private readonly AppDbContext _context;

        public ServicioController(AppDbContext context, IServicioCore servicioCore) : base(servicioCore)
        {
            _context = context;
        }

        // GET: api/Servicio/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Servicio>> GetServicio(long id)
        // {
        //     var servicio = await _context.Servicios.FindAsync(id);
        //
        //     if (servicio == null)
        //     {
        //         return NotFound();
        //     }
        //
        //     return servicio;
        // }

        // // PUT: api/Servicio/5
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutServicio(long id, Servicio servicio)
        // {
        //     if (id != servicio.Id)
        //     {
        //         return BadRequest();
        //     }
        //
        //     _context.Entry(servicio).State = EntityState.Modified;
        //
        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!ServicioExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }
        //
        //     return NoContent();
        // }

        // DELETE: api/Servicio/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServicio(long id)
        {
            var servicio = await _context.Servicios.FindAsync(id);
            if (servicio == null)
            {
                return NotFound();
            }

            _context.Servicios.Remove(servicio);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServicioExists(long id)
        {
            return _context.Servicios.Any(e => e.Id == id);
        }
    }
}
