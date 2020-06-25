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
    public class DonvigiaoviensController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public DonvigiaoviensController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Donvigiaoviens
        [HttpGet]
        [HttpGet("[action]")]

        public async Task<ActionResult<IEnumerable<Donvigiaovien>>> GetDonvigiaovien()
        {
            return await _context.Donvigiaovien.ToListAsync();
        }

        // GET: api/Donvigiaoviens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Donvigiaovien>> GetDonvigiaovien(string id)
        {
            var donvigiaovien = await _context.Donvigiaovien.FindAsync(id);

            if (donvigiaovien == null)
            {
                return NotFound();
            }

            return donvigiaovien;
        }

        // PUT: api/Donvigiaoviens/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutDonvigiaovien/{id}")]

        public async Task<IActionResult> PutDonvigiaovien(Donvigiaovien donvigiaovien)
        {
            //if (id != donvigiaovien.Madonvigv)
            //{
            //    return BadRequest();
            //}

            _context.Entry(donvigiaovien).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!DonvigiaovienExists(id))
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

        // POST: api/Donvigiaoviens
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostDonvigiaovien")]

        public async Task<ActionResult<Donvigiaovien>> PostDonvigiaovien([FromBody] Donvigiaovien donvigiaovien)
        {
            _context.Donvigiaovien.Add(donvigiaovien);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DonvigiaovienExists(donvigiaovien.Madonvigv))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDonvigiaovien", new { id = donvigiaovien.Madonvigv }, donvigiaovien);
        }

        // DELETE: api/Donvigiaoviens/5
        [HttpDelete("{id}")]
        [Route("DeleteDonvigiaovien/{id}")]

        public async Task<ActionResult<Donvigiaovien>> DeleteDonvigiaovien(string id)
        {
            var donvigiaovien = await _context.Donvigiaovien.FindAsync(id);
            if (donvigiaovien == null)
            {
                return NotFound();
            }

            _context.Donvigiaovien.Remove(donvigiaovien);
            await _context.SaveChangesAsync();

            return donvigiaovien;
        }

        private bool DonvigiaovienExists(string id)
        {
            return _context.Donvigiaovien.Any(e => e.Madonvigv == id);
        }
    }
}
