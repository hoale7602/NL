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
    public class DonvihocviensController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public DonvihocviensController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Donvihocviens
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Donvihocvien>>> GetDonvihocvien()
        {
          
            return await _context.Donvihocvien.ToListAsync();
        }

        // GET: api/Donvihocviens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Donvihocvien>> GetDonvihocvien(string id)
        {
            var donvihocvien = await _context.Donvihocvien.FindAsync(id);

            if (donvihocvien == null)
            {
                return NotFound();
            }

            return donvihocvien;
        }

        // PUT: api/Donvihocviens/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutDonvihocvien/{id}")]
        public async Task<IActionResult> PutDonvihocvien(Donvihocvien donvihocvien)
        {
            //if (id != donvihocvien.Madonvi)
            //{
            //    return BadRequest(new { message = "Product not found" });
            //}

            _context.Entry(donvihocvien).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!DonvihocvienExists(id))
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

        // POST: api/Donvihocviens
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostDonvihocvien")]
        public async Task<ActionResult<Donvihocvien>> PostDonvihocvien([FromBody] Donvihocvien donvihocvien)
        {
            _context.Donvihocvien.Add(donvihocvien);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DonvihocvienExists(donvihocvien.Madonvi))
                {
                    return Conflict(new { message = "Product not found" });
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDonvihocvien", new { id = donvihocvien.Madonvi }, donvihocvien);
        }

        // DELETE: api/Donvihocviens/5
        [HttpDelete("{id}")]
        [Route("DeleteDonvihocvien/{id}")]
        public async Task<ActionResult<Donvihocvien>> DeleteDonvihocvien(string id)
        {
            var donvihocvien = await _context.Donvihocvien.FindAsync(id);
            _context.Donvihocvien.Remove(donvihocvien);

            return Ok(await _context.SaveChangesAsync());
        }

        private bool DonvihocvienExists(string id)
        {
            return _context.Donvihocvien.Any(e => e.Madonvi == id);
        }

        
    }
}
