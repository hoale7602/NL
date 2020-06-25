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
    public class GiaoviensController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public GiaoviensController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Giaoviens
        [HttpGet]
        [HttpGet("[action]")]

        public async Task<ActionResult<IEnumerable<Giaovien>>> GetGiaovien()
        {
            return await _context.Giaovien.ToListAsync();
        }

        // GET: api/Giaoviens/5
        [HttpGet("{id}")]
        [Route("GetGiaovien/{id}")]
        public async Task<ActionResult<Giaovien>> GetGiaovien(string id)
        {
            var giaovien = await _context.Giaovien.FindAsync(id);

            if (giaovien == null)
            {
                return NotFound();
            }

            return giaovien;
        }

        // PUT: api/Giaoviens/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutGiaovien/{id}")]

        public async Task<IActionResult> PutGiaovien(Giaovien giaovien)
        {
            //if (id != giaovien.Magiaovien)
            //{
            //    return BadRequest();
            //}

            _context.Entry(giaovien).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!GiaovienExists(id))
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

        // POST: api/Giaoviens
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostGiaovien")]

        public async Task<ActionResult<Giaovien>> PostGiaovien([FromBody] Giaovien giaovien)
        {
            _context.Giaovien.Add(giaovien);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GiaovienExists(giaovien.Magiaovien))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGiaovien", new { id = giaovien.Magiaovien }, giaovien);
        }

        // DELETE: api/Giaoviens/5
        [HttpDelete("{id}")]
        [Route("DeleteGiaovien/{id}")]

        public async Task<ActionResult<Giaovien>> DeleteGiaovien(string id)
        {
            var giaovien = await _context.Giaovien.FindAsync(id);
            if (giaovien == null)
            {
                return NotFound();
            }

            _context.Giaovien.Remove(giaovien);
            await _context.SaveChangesAsync();

            return giaovien;
        }

        private bool GiaovienExists(string id)
        {
            return _context.Giaovien.Any(e => e.Magiaovien == id);
        }

        [HttpGet]
        [HttpGet("[action]")]
        public IActionResult CountGiaoVien()
        {
            var result = (from A in _context.Giaovien
                          select new
                          {
                              A.Magiaovien
                          }).Count();
            return Ok(result);
        }
    }
}
