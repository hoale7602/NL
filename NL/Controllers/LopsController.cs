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
    public class LopsController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public LopsController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Lops
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Lop>>> GetLop()
        {
            return await _context.Lop.ToListAsync();
        }

        // GET: api/Lops/5
        [HttpGet("{id}")]
        [Route("GetLop/{id}")]
        public async Task<ActionResult<Lop>> GetLop(string id)
        {
            var lop = await _context.Lop.FindAsync(id);

            if (lop == null)
            {
                return NotFound();
            }

            return lop;
        }

        // PUT: api/Lops/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutLop/{id}")]
        public async Task<IActionResult> PutLop(Lop lop)
        {
            //if (id != lop.Malop)
            //{
            //    return BadRequest();
            //}

            _context.Entry(lop).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!LopExists(id))
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

        // POST: api/Lops
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostLop")]
        public async Task<ActionResult<Lop>> PostLop([FromBody] Lop lop)
        {
            _context.Lop.Add(lop);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LopExists(lop.Malop))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLop", new { id = lop.Malop }, lop);
        }

        // DELETE: api/Lops/5
        [HttpDelete("{id}")]
        [Route("DeleteLop/{id}")]
        public async Task<ActionResult<Lop>> DeleteLop(string id)
        {
            var lop = await _context.Lop.FindAsync(id);
            if (lop == null)
            {
                return NotFound();
            }

            _context.Lop.Remove(lop);
            await _context.SaveChangesAsync();

            return lop;
        }

        private bool LopExists(string id)
        {
            return _context.Lop.Any(e => e.Malop == id);
        }
        [HttpGet]
        [HttpGet("[action]")]
        public IActionResult ThongTinCacLop()
        {
            var result = (from A in _context.Dangkihoc
                          select new
                          {
                              A.Malop
                          }).Count();

            return Ok(result);
        }
        [HttpGet]
        [HttpGet("[action]")]
        public IActionResult CountSinhVien()
        {
            var result = (from A in _context.Dangkihoc
                          join B in _context.Hocvien on A.Mahv equals B.Mahv
                          join C in _context.Lop on A.Malop equals C.Malop
                          group A by A.Malop into playerGroup
                          select new
                          {
                              Malop = playerGroup.Key,
                              Count = playerGroup.Count(),
                          });
            return Ok(result);
        }

        [HttpGet]
        [HttpGet("[action]")]
        public IActionResult GetLopChoDKi()
        {
            var result = (from A in _context.Lop
                          where A.Trangthai == true
                          select A
                          );
                          
            return Ok(result);
        }

    }
}
