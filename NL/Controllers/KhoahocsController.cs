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
    public class KhoahocsController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public KhoahocsController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Khoahocs
        [HttpGet]
        [HttpGet("[action]")]

        public async Task<ActionResult<IEnumerable<Khoahoc>>> GetKhoahoc()
        {
            return await _context.Khoahoc.ToListAsync();
        }

        // GET: api/Khoahocs/5
        [HttpGet("{id}")]
        [Route("GetKhoahoc/{id}")]
        public async Task<ActionResult<Khoahoc>> GetKhoahoc(string id)
        {
            var khoahoc = await _context.Khoahoc.FindAsync(id);

            if (khoahoc == null)
            {
                return NotFound();
            }

            return khoahoc;
        }

        // PUT: api/Khoahocs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutKhoahoc/{id}")]

        public async Task<IActionResult> PutKhoahoc(Khoahoc khoahoc)
        {
            //if (id != khoahoc.Makhoahoc)
            //{
            //    return BadRequest();
            //}

            _context.Entry(khoahoc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!KhoahocExists(id))
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

        // POST: api/Khoahocs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostKhoahoc")]

        public async Task<ActionResult<Khoahoc>> PostKhoahoc([FromBody] Khoahoc khoahoc)
        {
            _context.Khoahoc.Add(khoahoc);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (KhoahocExists(khoahoc.Makhoahoc))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetKhoahoc", new { id = khoahoc.Makhoahoc }, khoahoc);
        }

        // DELETE: api/Khoahocs/5
        [HttpDelete("{id}")]
        [Route("DeleteKhoahoc/{id}")]

        public async Task<ActionResult<Khoahoc>> DeleteKhoahoc(string id)
        {
            var khoahoc = await _context.Khoahoc.FindAsync(id);
            if (khoahoc == null)
            {
                return NotFound();
            }

            _context.Khoahoc.Remove(khoahoc);
            await _context.SaveChangesAsync();

            return khoahoc;
        }

        private bool KhoahocExists(string id)
        {
            return _context.Khoahoc.Any(e => e.Makhoahoc == id);
        }
    }
}
