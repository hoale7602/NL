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
    public class HocviensController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public HocviensController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Hocviens
        [HttpGet]
        [HttpGet("[action]")]

        public async Task<ActionResult<IEnumerable<Hocvien>>> GetHocvien()
        {
            return await _context.Hocvien.ToListAsync();
        }

        // GET: api/Hocviens/5
        [HttpGet("{id}")]
        [Route("GetHocvien/{id}")]
        public async Task<ActionResult<Hocvien>> GetHocvien(string id)
        {
            var hocvien = await _context.Hocvien.FindAsync(id);

            if (hocvien == null)
            {
                return NotFound();
            }

            return hocvien;
        }

        // PUT: api/Hocviens/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutHocvien/{id}")]

        public async Task<IActionResult> PutHocvien(Hocvien hocvien)
        {
            //if (id != hocvien.Mahv)
            //{
            //    return BadRequest();
            //}

            _context.Entry(hocvien).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!HocvienExists(id))
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

        // POST: api/Hocviens
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostHocvien")]
        public async Task<ActionResult<Hocvien>> PostHocvien([FromBody] Hocvien hocvien)
        {
            if (ModelState.IsValid)
            {
                _context.Hocvien.Add(hocvien);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    if (HocvienExists(hocvien.Mahv))
                    {
                        return Conflict();
                    }
                    else
                    {
                        throw;
                    }
                }

                return CreatedAtAction("GetHocvien", new { id = hocvien.Mahv }, hocvien);
            }
            return BadRequest(new { message = "Product not found" });
        }

        // DELETE: api/Hocviens/5
        [HttpDelete("{id}")]
        [Route("DeleteHocvien/{id}")]

        public async Task<ActionResult<Hocvien>> DeleteHocvien(string id)
        {
            var hocvien = await _context.Hocvien.FindAsync(id);
            if (hocvien == null)
            {
                return NotFound();
            }

            _context.Hocvien.Remove(hocvien);
            await _context.SaveChangesAsync();

            return hocvien;
        }

        private bool HocvienExists(string id)
        {
            return _context.Hocvien.Any(e => e.Mahv == id);
        }

        [HttpGet]
        [HttpGet("[action]")]
        public IActionResult CountHocVien()
        {
            var result = (from A in _context.Hocvien
                          select new
                          {
                              A.Mahv
                          }).Count();
            return Ok(result);
        }
    }
}
