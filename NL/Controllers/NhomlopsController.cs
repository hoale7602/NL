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
    public class NhomlopsController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public NhomlopsController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Nhomlops
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Nhomlop>>> GetNhomlop()
        {
            return await _context.Nhomlop.ToListAsync();
        }

        // GET: api/Nhomlops/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Nhomlop>> GetNhomlop(string id)
        {
            var nhomlop = await _context.Nhomlop.FindAsync(id);

            if (nhomlop == null)
            {
                return NotFound();
            }

            return nhomlop;
        }

        // PUT: api/Nhomlops/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutNhomlop/{id}")]
        public async Task<IActionResult> PutNhomlop(Nhomlop nhomlop)
        {
            //if (id != nhomlop.Manhom)
            //{
            //    return BadRequest();
            //}

            _context.Entry(nhomlop).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!NhomlopExists(id))
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

        // POST: api/Nhomlops
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostNhomlop")]
        public async Task<ActionResult<Nhomlop>> PostNhomlop([FromBody] Nhomlop nhomlop)
        {
            _context.Nhomlop.Add(nhomlop);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (NhomlopExists(nhomlop.Manhom))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetNhomlop", new { id = nhomlop.Manhom }, nhomlop);
        }

        // DELETE: api/Nhomlops/5
        [HttpDelete("{id}")]
        [Route("DeleteNhomlop/{id}")]
        public async Task<ActionResult<Nhomlop>> DeleteNhomlop(string id)
        {
            var nhomlop = await _context.Nhomlop.FindAsync(id);
            if (nhomlop == null)
            {
                return NotFound();
            }

            _context.Nhomlop.Remove(nhomlop);
            await _context.SaveChangesAsync();

            return nhomlop;
        }

        private bool NhomlopExists(string id)
        {
            return _context.Nhomlop.Any(e => e.Manhom == id);
        }
    }
}
