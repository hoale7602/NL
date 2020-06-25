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
    public class QuanlidiemsController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public QuanlidiemsController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Quanlidiems
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Quanlidiem>>> GetQuanlidiem()
        {
            return await _context.Quanlidiem.ToListAsync();
        }

        // GET: api/Quanlidiems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quanlidiem>> GetQuanlidiem(string id)
        {
            var quanlidiem = await _context.Quanlidiem.FindAsync(id);

            if (quanlidiem == null)
            {
                return NotFound();
            }

            return quanlidiem;
        }

        // PUT: api/Quanlidiems/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutQuanlidiem/{id}")]
        public async Task<IActionResult> PutQuanlidiem(Quanlidiem quanlidiem)
        {
            //if (id != quanlidiem.Mahv)
            //{
            //    return BadRequest();
            //}

            _context.Entry(quanlidiem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!QuanlidiemExists(id))
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

        // POST: api/Quanlidiems
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostQuanlidiem")]
        public async Task<ActionResult<Quanlidiem>> PostQuanlidiem([FromBody]Quanlidiem quanlidiem)
        {
            _context.Quanlidiem.Add(quanlidiem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (QuanlidiemExists(quanlidiem.Mahv))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetQuanlidiem", new { id = quanlidiem.Mahv }, quanlidiem);
        }

        // DELETE: api/Quanlidiems/5
        [HttpDelete("{id}")]
        [Route("DeleteQuanlidiem/{id}")]
        public async Task<ActionResult<Quanlidiem>> DeleteQuanlidiem(string id)
        {
            var quanlidiem = await _context.Quanlidiem.FindAsync(id);
            if (quanlidiem == null)
            {
                return NotFound();
            }

            _context.Quanlidiem.Remove(quanlidiem);
            await _context.SaveChangesAsync();

            return quanlidiem;
        }

        private bool QuanlidiemExists(string id)
        {
            return _context.Quanlidiem.Any(e => e.Mahv == id);
        }
    }
}
