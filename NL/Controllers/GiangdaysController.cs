using System;
using System.Collections;
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
    public class GiangdaysController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public GiangdaysController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Giangdays
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Giangday>>> GetGiangday()
        {
            return await _context.Giangday.ToListAsync();
        }

        // GET: api/Giangdays/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Giangday>> GetGiangday(string id)
        {
            var giangday = await _context.Giangday.FindAsync(id);

            if (giangday == null)
            {
                return NotFound();
            }

            return giangday;
        }

        // PUT: api/Giangdays/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutGiangday/{id}")]
        public async Task<IActionResult> PutGiangday(Giangday giangday)
        {
            //if (id != giangday.Mamonhoc)
            //{
            //    return BadRequest();
            //}

            _context.Entry(giangday).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!GiangdayExists(id))
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

        // POST: api/Giangdays
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostGiangday")]
        public async Task<ActionResult<Giangday>> PostGiangday([FromBody]Giangday giangday)
        {
            _context.Giangday.Add(giangday);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GiangdayExists(giangday.Mamonhoc))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGiangday", new { id = giangday.Mamonhoc }, giangday);
        }

        // DELETE: api/Giangdays/5
        [HttpDelete("{id}")]
        [Route("DeleteGiangday/{id}")]
        public async Task<ActionResult<Giangday>> DeleteGiangday(string id)
        {
            var e = id.Split(",",2);
            var giangday = await _context.Giangday.FindAsync(e[0], e[1]);
            Console.WriteLine("okok");
            if (giangday == null)
                {
                    return NotFound();
                }
                _context.Giangday.Remove(giangday);
                await _context.SaveChangesAsync();

                return giangday;
            
                //var giangday = await _context.Giangday.FindAsync(id);
            
        }

        private bool GiangdayExists(string id)
        {
            return _context.Giangday.Any(e => e.Mamonhoc == id);
        }
        [HttpGet]
        [HttpGet("[action]")]
        public IActionResult GetGiangdayFull()
        {
                var result = (from A in _context.Giangday
                              join B in _context.Monhoc on A.Mamonhoc equals B.Mamonhoc
                              join C in _context.Giaovien on A.Magiaovien equals C.Magiaovien
                              select new
                              {
                                  A.Mamonhoc,
                                  B.Tenmonhoc,
                                  A.Magiaovien,
                                  C.Hoten,
                                  A.Thulao
                              });
          
            return Ok(result);
        }
    }
}
