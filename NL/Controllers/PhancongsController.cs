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
    public class PhancongsController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public PhancongsController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Phancongs
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Phancong>>> GetPhancong()
        {
            return await _context.Phancong.ToListAsync();
        }

        // GET: api/Phancongs/5
        [HttpGet("{id}")]
        [Route("GetPhancong/{id}")]
        public async Task<ActionResult<Phancong>> GetPhancong(string id)
        {
            var e = id.Split(",", 4);
            var phancong = await _context.Phancong.FindAsync(e[0], e[1], e[2], e[3]);

            if (phancong == null)
            {
                return NotFound();
            }

            return phancong;
        }

        // PUT: api/Phancongs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutPhancong/{id}")]
        public async Task<IActionResult> PutPhancong(Phancong phancong)
        {
            //if (id != phancong.Malop)
            //{
            //    return BadRequest();
            //}

            _context.Entry(phancong).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!PhancongExists(id))
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

        // POST: api/Phancongs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostPhancong")]
        public async Task<ActionResult<Phancong>> PostPhancong([FromBody]Phancong phancong)
        {
            _context.Phancong.Add(phancong);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PhancongExists(phancong.Malop))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPhancong", new { id = phancong.Malop }, phancong);
        }

        // DELETE: api/Phancongs/5
        [HttpDelete("{id}")]
        [Route("DeletePhancong/{id}")]
        public async Task<ActionResult<Phancong>> DeletePhancong(string id)
        {
            var e = id.Split(",", 4);
            var phancong = await _context.Phancong.FindAsync(e[0], e[1], e[2], e[3]);
            if (phancong == null)
            {
                return NotFound();
            }

            _context.Phancong.Remove(phancong);
            await _context.SaveChangesAsync();

            return phancong;
        }

        private bool PhancongExists(string id)
        {
            return _context.Phancong.Any(e => e.Malop == id);
        }

        [HttpGet]
        [HttpGet("[action]")]
        public IActionResult GetPhanCongFull()
        {
            var result = (from A in _context.Phancong
                          join B in _context.Lop on A.Malop equals B.Malop
                          join C in _context.Lichhoc on A.Malichhoc equals C.Malichhoc
                          join D in _context.Giaovien on A.Magiaovien equals D.Magiaovien
                          join E in _context.Phonghoc on A.Maphong equals E.Maphong
                          select new
                          {
                              A.Malop,
                              B.Tenlop,
                              A.Maphong,
                              E.Tenphong,
                              A.Magiaovien,
                              D.Hoten,
                              A.Malichhoc,
                              C.Buoihoc,
                              C.Giohoc
                          });

            return Ok(result);
        }

    }
}
