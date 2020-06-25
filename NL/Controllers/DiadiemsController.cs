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
    public class DiadiemsController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public DiadiemsController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Diadiems
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Diadiem>>> GetDiadiem()
        {
            return await _context.Diadiem.ToListAsync();
        }

        // GET: api/Diadiems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Diadiem>> GetDiadiem(string id)
        {
            var diadiem = await _context.Diadiem.FindAsync(id);

            if (diadiem == null)
            {
                return NotFound();
            }

            return diadiem;
        }

        // PUT: api/Diadiems/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutDiadiem/{id}")]
        public async Task<IActionResult> PutDiadiem(Diadiem diadiem)
        {
            //if (id != diadiem.Madiadiem)
            //{
            //    return BadRequest();
            //}

            _context.Entry(diadiem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!DiadiemExists(id))
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

        // POST: api/Diadiems
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostDiadiem")]
        public async Task<ActionResult<Diadiem>> PostDiadiem([FromBody]Diadiem diadiem)
        {
            _context.Diadiem.Add(diadiem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DiadiemExists(diadiem.Madiadiem))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDiadiem", new { id = diadiem.Madiadiem }, diadiem);
        }

        // DELETE: api/Diadiems/5
        [HttpDelete("{id}")]
        [Route("DeleteDiadiem/{id}")]
        public async Task<ActionResult<Diadiem>> DeleteDiadiem(string id)
        {
            var diadiem = await _context.Diadiem.FindAsync(id);
            if (diadiem == null)
            {
                return NotFound();
            }

            _context.Diadiem.Remove(diadiem);
            await _context.SaveChangesAsync();

            return diadiem;
        }

        private bool DiadiemExists(string id)
        {
            return _context.Diadiem.Any(e => e.Madiadiem == id);
        }
    }
}
