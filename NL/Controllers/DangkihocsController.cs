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
    public class DangkihocsController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public DangkihocsController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Dangkihocs
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Dangkihoc>>> GetDangkihoc()
        {
            return await _context.Dangkihoc.ToListAsync();
        }

        // GET: api/Dangkihocs/5
        [HttpGet("{id}")]
        [Route("GetDangkihoc/{id}")]
        public async Task<ActionResult<Dangkihoc>> GetDangkihoc(string id)
        {
            var dangkihoc = await _context.Dangkihoc.FindAsync(id);

            if (dangkihoc == null)
            {
                return NotFound();
            }

            return dangkihoc;
        }

        // PUT: api/Dangkihocs/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutDangkihoc/{id}")]
        public async Task<IActionResult> PutDangkihoc(Dangkihoc dangkihoc)
        {
            //if (id != dangkihoc.Mahv)
            //{
            //    return BadRequest();
            //}

            _context.Entry(dangkihoc).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!DangkihocExists(id))
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

        // POST: api/Dangkihocs
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostDangkihoc")]
        public async Task<ActionResult<Dangkihoc>> PostDangkihoc([FromBody]Dangkihoc dangkihoc)
        {
            _context.Dangkihoc.Add(dangkihoc);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DangkihocExists(dangkihoc.Mahv))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDangkihoc", new { id = dangkihoc.Mahv }, dangkihoc);
        }

        // DELETE: api/Dangkihocs/5
        [HttpDelete("{id}")]
        [Route("DeleteDangkihoc/{id}")]
        public async Task<ActionResult<Dangkihoc>> DeleteDangkihoc(string id)
        {
            var e = id.Split(",", 3);
            var dangkihoc = await _context.Dangkihoc.FindAsync(e[0], e[1], e[2]);
            if (dangkihoc == null)
            {
                return NotFound();
            }

            _context.Dangkihoc.Remove(dangkihoc);
            await _context.SaveChangesAsync();

            return dangkihoc;
        }

        private bool DangkihocExists(string id)
        {
            return _context.Dangkihoc.Any(e => e.Mahv == id);
        }

        [HttpGet]
        [HttpGet("[action]")]
        public IActionResult GetDangKiHocFull()
        {
            var result = (from A in _context.Dangkihoc
                          join B in _context.Lop on A.Malop equals B.Malop
                          join C in _context.Hocvien on A.Mahv equals C.Mahv
                          join D in _context.Bienlai on A.Mabl equals D.Mabl
                          select new
                          {
                              A.Malop,
                              B.Tenlop,
                              A.Mabl,
                              A.Mahv,
                              C.Hotenhv,
                              C.Email
                          });

            return Ok(result);
        }
        [HttpGet("{id}")]
        [Route("DanhSachLop/{id}")]
        public IActionResult DanhSachLop(string id)
        {
            if (id == "null")
            {
               var result1 = (from A in _context.Dangkihoc
                              join B in _context.Hocvien on A.Mahv equals B.Mahv
                              join C in _context.Lop on A.Malop equals C.Malop
                              join D in _context.Donvihocvien on B.Madonvi equals D.Madonvi
                              select new
                              {
                                  A.Mahv,
                                  B.Hotenhv,
                                  B.Ngaysinh,
                                  B.Email,
                                  D.Tendonvi
                              });
                return Ok(result1);
            }
               var result = (from A in _context.Dangkihoc
                              join B in _context.Hocvien on A.Mahv equals B.Mahv
                              join C in _context.Lop on A.Malop equals C.Malop
                              join D in _context.Donvihocvien on B.Madonvi equals D.Madonvi
                              where A.Malop == id
                              select new
                              {
                                  A.Mahv,
                                  B.Hotenhv,
                                  B.Ngaysinh,
                                  B.Email,
                                  D.Tendonvi
                              });
            
            return Ok(result);
        }


    }
}
