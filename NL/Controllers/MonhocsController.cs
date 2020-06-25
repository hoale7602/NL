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
    public class MonhocsController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public MonhocsController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Monhocs
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Monhoc>>> GetMonhoc()
        {
            return await _context.Monhoc.ToListAsync();
        }

        // GET: api/Monhocs/5
        [HttpGet("{id}")]
        [Route("GetMonhoc/{id}")]
        public async Task<ActionResult<Monhoc>> GetMonhoc(string id)
        {
            var monhoc = await _context.Monhoc.FindAsync(id);

            if (monhoc == null)
            {
                return NotFound();
            }

            return monhoc;
        }

        // PUT: api/Monhocs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutMonhoc/{id}")]

        public async Task<IActionResult> PutMonhoc(Monhoc monhoc)
        {
            //if (id != monhoc.Mamonhoc)
            //{
            //    return BadRequest();
            //}

            _context.Entry(monhoc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!MonhocExists(id))
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

        // POST: api/Monhocs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostMonhoc")]

        public async Task<ActionResult<Monhoc>> PostMonhoc([FromBody] Monhoc monhoc)
        {
            _context.Monhoc.Add(monhoc);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MonhocExists(monhoc.Mamonhoc))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMonhoc", new { id = monhoc.Mamonhoc }, monhoc);
        }

        // DELETE: api/Monhocs/5
        [HttpDelete("{id}")]
        [Route("DeleteMonhoc/{id}")]

        public async Task<ActionResult<Monhoc>> DeleteMonhoc(string id)
        {
            var monhoc = await _context.Monhoc.FindAsync(id);
            if (monhoc == null)
            {
                return NotFound();
            }

            _context.Monhoc.Remove(monhoc);
            await _context.SaveChangesAsync();

            return monhoc;
        }

        private bool MonhocExists(string id)
        {
            return _context.Monhoc.Any(e => e.Mamonhoc == id);
        }
    }
}
