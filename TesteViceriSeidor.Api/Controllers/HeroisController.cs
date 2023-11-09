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
    public class HeroisController : ControllerBase
    {
        private readonly HeroisDbContext _context;

        public HeroisController(HeroisDbContext context)
        {
            _context = context;
        }

        // GET: /api/herois
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Heroi>>> Get()
        {
            if (_context.Herois == null)
            {
                return NotFound();
            }

            return await _context.Herois.ToListAsync();
        }

        // GET: /api/herois/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Heroi>> Get(int id)
        {
            if (_context.Herois == null)
            {
                return NotFound();
            }

            var heroi = await _context.Herois.FindAsync(id);

            if (heroi == null)
            {
                return NotFound();
            }

            return heroi;
        }

        // POST: /api/herois
        [HttpPost]
        public async Task<ActionResult<Heroi>> Create(Heroi heroi)
        {
            if (_context.Herois == null)
            {
                return Problem("Entity set 'HeroisDbContext.Herois'  is null.");
            }

            _context.Herois.Add(heroi);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = heroi.Id }, heroi);
        }

        // PUT: /api/herois/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Heroi heroi)
        {
            if (id != heroi.Id)
            {
                return BadRequest();
            }

            _context.Entry(heroi).State = EntityState.Modified;

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

        // DELETE: /api/herois/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_context.Herois == null)
            {
                return NotFound();
            }

            var heroi = await _context.Herois.FindAsync(id);
            if (heroi == null)
            {
                return NotFound();
            }

            _context.Herois.Remove(heroi);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Exists(int id)
        {
            return (_context.Herois?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
