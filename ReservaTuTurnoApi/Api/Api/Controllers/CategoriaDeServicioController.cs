using Api.Core.DTOs;
using Api.Core.Entidades;
using Api.Core.Servicios.Interfaces;
using Api.Persistencia._Config;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Api.Controllers
{
    public class CategoriaDeServicioController : ABMController<CategoriaDeServicioDTO>
    {
        public CategoriaDeServicioController(ICategoriaDeServicioCore core) : base(core)
        {
        }
    }
}
