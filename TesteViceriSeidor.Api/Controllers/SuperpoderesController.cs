using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TesteViceriSeidor.Api.Database;
using TesteViceriSeidor.Api.Models;

namespace TesteViceriSeidor.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuperpoderesController : ControllerBase
    {
        private readonly HeroisDbContext _context;

        public SuperpoderesController(HeroisDbContext context)
        {
            _context = context;
        }

        // GET: /api/superpoderes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Superpoder>>> Get()
        {
            if (_context.Superpoderes == null)
            {
                return NotFound();
            }

            return await _context.Superpoderes.ToListAsync();
        }

        // GET: /api/superpoderes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Superpoder>> Get(int id)
        {
            if (_context.Superpoderes == null)
            {
                return NotFound();
            }

            var superpoder = await _context.Superpoderes.FindAsync(id);

            if (superpoder == null)
            {
                return NotFound();
            }

            return superpoder;
        }

        // POST: /api/superpoderes
        [HttpPost]
        public async Task<ActionResult<Superpoder>> Create(Superpoder superpoder)
        {
            if (_context.Superpoderes == null)
            {
                return Problem("Entity set 'HeroisDbContext.Superpoderes'  is null.");
            }

            _context.Superpoderes.Add(superpoder);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = superpoder.Id }, superpoder);
        }

        // PUT: /api/superpoderes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Superpoder superpoder)
        {
            if (id != superpoder.Id)
            {
                return BadRequest();
            }

            _context.Entry(superpoder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: /api/superpoderes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_context.Superpoderes == null)
            {
                return NotFound();
            }
            var superpoder = await _context.Superpoderes.FindAsync(id);
            if (superpoder == null)
            {
                return NotFound();
            }

            _context.Superpoderes.Remove(superpoder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Exists(int id)
        {
            return (_context.Superpoderes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
