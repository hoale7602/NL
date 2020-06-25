using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NL.Models;

namespace NL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LichhocsController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public LichhocsController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Lichhocs
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Lichhoc>>> GetLichhoc()
        {
            return await _context.Lichhoc.ToListAsync();
        }

        // GET: api/Lichhocs/5
        [HttpGet("{id}")]
        [Route("GetLichhoc/{id}")]
        public async Task<ActionResult<Lichhoc>> GetLichhoc(string id)
        {
            var lichhoc = await _context.Lichhoc.FindAsync(id);

            if (lichhoc == null)
            {
                return NotFound();
            }

            return lichhoc;
        }

        // PUT: api/Lichhocs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutLichhoc/{id}")]
        public async Task<IActionResult> PutLichhoc(Lichhoc lichhoc)
        {
            //if (id != lichhoc.Malichhoc)
            //{
            //    return BadRequest();
            //}

            _context.Entry(lichhoc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!LichhocExists(id))
                //{
                //    return NotFound();
                //}
                //else
                //{
                //    throw;
                //}
            }

            return NoContent();
        }

        // POST: api/Lichhocs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostLichhoc")]
        public async Task<ActionResult<Lichhoc>> PostLichhoc([FromBody] Lichhoc lichhoc)
        {
            _context.Lichhoc.Add(lichhoc);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LichhocExists(lichhoc.Malichhoc))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLichhoc", new { id = lichhoc.Malichhoc }, lichhoc);
        }

        // DELETE: api/Lichhocs/5
        [HttpDelete("{id}")]
        [Route("DeleteLichhoc/{id}")]
        public async Task<ActionResult<Lichhoc>> DeleteLichhoc(string id)
        {
            var lichhoc = await _context.Lichhoc.FindAsync(id);
            if (lichhoc == null)
            {
                return NotFound();
            }

            _context.Lichhoc.Remove(lichhoc);
            await _context.SaveChangesAsync();

            return lichhoc;
        }

        private bool LichhocExists(string id)
        {
            return _context.Lichhoc.Any(e => e.Malichhoc == id);
        }
    }
}
