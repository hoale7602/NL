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
    public class PhonghocsController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public PhonghocsController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Phonghocs
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Phonghoc>>> GetPhonghoc()
        {
            return await _context.Phonghoc.ToListAsync();
        }

        // GET: api/Phonghocs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Phonghoc>> GetPhonghoc(string id)
        {
            var phonghoc = await _context.Phonghoc.FindAsync(id);

            if (phonghoc == null)
            {
                return NotFound();
            }

            return phonghoc;
        }

        // PUT: api/Phonghocs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutPhonghoc/{id}")]
        public async Task<IActionResult> PutPhonghoc(Phonghoc phonghoc)
        {
            //if (id != phonghoc.Maphong)
            //{
            //    return BadRequest();
            //}

            _context.Entry(phonghoc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!PhonghocExists(id))
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

        // POST: api/Phonghocs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostPhonghoc")]
        public async Task<ActionResult<Phonghoc>> PostPhonghoc([FromBody]Phonghoc phonghoc)
        {
            _context.Phonghoc.Add(phonghoc);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PhonghocExists(phonghoc.Maphong))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPhonghoc", new { id = phonghoc.Maphong }, phonghoc);
        }

        // DELETE: api/Phonghocs/5
        [HttpDelete("{id}")]
        [Route("DeletePhonghoc/{id}")]
        public async Task<ActionResult<Phonghoc>> DeletePhonghoc(string id)
        {
            var phonghoc = await _context.Phonghoc.FindAsync(id);
            if (phonghoc == null)
            {
                return NotFound();
            }

            _context.Phonghoc.Remove(phonghoc);
            await _context.SaveChangesAsync();

            return phonghoc;
        }

        private bool PhonghocExists(string id)
        {
            return _context.Phonghoc.Any(e => e.Maphong == id);
        }
    }
}
