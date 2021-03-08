using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd.Repository.Models;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvidersController : ControllerBase
    {
        private readonly MarceloDozDbContext _context;

        public ProvidersController(MarceloDozDbContext context)
        {
            _context = context;
        }

        // GET: api/Providers
        [HttpGet]
        public IEnumerable<Providers> GetProviders()
        {
            return _context.Providers;
        }

        // GET: api/Providers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProviders([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var providers = await _context.Providers.FindAsync(id);

            if (providers == null)
            {
                return NotFound();
            }

            return Ok(providers);
        }

        // PUT: api/Providers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProviders([FromRoute] int id, [FromBody] Providers providers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != providers.ProviderId)
            {
                return BadRequest();
            }

            _context.Entry(providers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProvidersExists(id))
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

        // POST: api/Providers
        [HttpPost]
        public async Task<IActionResult> PostProviders([FromBody] Providers providers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Providers.Add(providers);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProviders", new { id = providers.ProviderId }, providers);
        }

        // DELETE: api/Providers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProviders([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var providers = await _context.Providers.FindAsync(id);
            if (providers == null)
            {
                return NotFound();
            }

            _context.Providers.Remove(providers);
            await _context.SaveChangesAsync();

            return Ok(providers);
        }

        private bool ProvidersExists(int id)
        {
            return _context.Providers.Any(e => e.ProviderId == id);
        }
    }
}