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
    public class KythisController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public KythisController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Kythis
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Kythi>>> GetKythi()
        {
            return await _context.Kythi.ToListAsync();
        }

        // GET: api/Kythis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Kythi>> GetKythi(string id)
        {
            var kythi = await _context.Kythi.FindAsync(id);

            if (kythi == null)
            {
                return NotFound();
            }

            return kythi;
        }

        // PUT: api/Kythis/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutKythi/{id}")]
        public async Task<IActionResult> PutKythi(Kythi kythi)
        {
            //if (id != kythi.Makythi)
            //{
            //    return BadRequest();
            //}

            _context.Entry(kythi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!KythiExists(id))
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

        // POST: api/Kythis
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostKythi")]
        public async Task<ActionResult<Kythi>> PostKythi([FromBody]Kythi kythi)
        {
            _context.Kythi.Add(kythi);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (KythiExists(kythi.Makythi))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetKythi", new { id = kythi.Makythi }, kythi);
        }

        // DELETE: api/Kythis/5
        [HttpDelete("{id}")]
        [Route("DeleteKythi/{id}")]
        public async Task<ActionResult<Kythi>> DeleteKythi(string id)
        {
            var kythi = await _context.Kythi.FindAsync(id);
            if (kythi == null)
            {
                return NotFound();
            }

            _context.Kythi.Remove(kythi);
            await _context.SaveChangesAsync();

            return kythi;
        }

        private bool KythiExists(string id)
        {
            return _context.Kythi.Any(e => e.Makythi == id);
        }
    }
}
