using Api.Core.DTOs;
using Api.Core.Servicios.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public abstract class ABMController<TDTO> : ControllerBase
    where TDTO : DTO
{
    private readonly ICoreABM<TDTO> _core;
    
    protected ABMController()
    {
    }
    
    protected ABMController(ICoreABM<TDTO> core)
    {
        _core = core;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TDTO>>> Get()
    {
        var dto = await _core.Listar();
        return Ok(dto);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<TDTO>> Get(int id)
    {
        var dto = await _core.ObtenerPorId(id);

        return dto;
    }
    
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<TDTO>> Crear(TDTO dto)
    {
        var id = await _core.Crear(dto); //Podría devolver el objeto creado en vez de el Id
        dto.Id = id;

        return CreatedAtAction("Get", new { id }, dto);
    }
    
    // PUT: api/Servicio/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, TDTO dto)
    {
        if (id != dto.Id)
            return BadRequest();

        try
        {
            await _core.Modificar(id, dto);
        }
        catch (Exception e) 
        {
            if (e.GetType() == typeof(KeyNotFoundException))
                return NotFound();

            return StatusCode(500, e.Message);
        }

        return Ok(id);
    }

}