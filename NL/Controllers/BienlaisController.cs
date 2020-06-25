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
    public class BienlaisController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public BienlaisController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Bienlais
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Bienlai>>> GetBienlai()
        {
            return await _context.Bienlai.ToListAsync();
        }

        // GET: api/Bienlais/5
        [HttpGet("{id}")]
        [Route("GetBienlai/{id}")]
        public async Task<ActionResult<Bienlai>> GetBienlai(string id)
        {
            var bienlai = await _context.Bienlai.FindAsync(id);

            if (bienlai == null)
            {
                return NotFound();
            }

            return bienlai;
        }

        // PUT: api/Bienlais/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutBienlai/{id}")]
        public async Task<IActionResult> PutBienlai(Bienlai bienlai)
        {
            //if (id != bienlai.Mabl)
            //{
            //    return BadRequest();
            //}

            _context.Entry(bienlai).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!BienlaiExists(id))
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

        // POST: api/Bienlais
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostBienlai")]
        public async Task<ActionResult<Bienlai>> PostBienlai([FromBody]Bienlai bienlai)
        {
            _context.Bienlai.Add(bienlai);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BienlaiExists(bienlai.Mabl))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBienlai", new { id = bienlai.Mabl }, bienlai);
        }

        // DELETE: api/Bienlais/5
        [HttpDelete("{id}")]
        [Route("DeleteBienlai/{id}")]
        public async Task<ActionResult<Bienlai>> DeleteBienlai(string id)
        {
            var bienlai = await _context.Bienlai.FindAsync(id);
            if (bienlai == null)
            {
                return NotFound();
            }

            _context.Bienlai.Remove(bienlai);
            await _context.SaveChangesAsync();

            return bienlai;
        }

        private bool BienlaiExists(string id)
        {
            return _context.Bienlai.Any(e => e.Mabl == id);
        }
        [HttpGet]
        [HttpGet("[action]")]
        public IActionResult GetTopBL()
        {
            var result = (from a in _context.Bienlai 
                          orderby a.Mabl descending
                          select a.Mabl);
            int[] arr = new int[result.Count()];
            int i = 0;
            foreach (string a in result)
            {   
                arr[i] = Int32.Parse(a);
                i++;
            }
            int tg;
            for (int x = 0; x < arr.Length - 1; x++)
            {
                for (int j = x + 1; j < arr.Length; j++)
                {
                    if (arr[x] < arr[j])
                    {
                        tg = arr[x];
                        arr[x] = arr[j];
                        arr[j] = tg;
                    }
                }
            }
            return Ok(arr[0]);
        }

        [HttpGet]
        [HttpGet("[action]")]
        public IActionResult CountBienLai()
        {
            var result = (from A in _context.Bienlai
                          group A by A.Ngaybl into g
                          select new
                          {
                              Thang = Convert.ToDateTime(g.Key).ToString("MM/yyyy"),
                              Sotien = g.Sum(t => t.Sotien)
                          });
            return Ok(result);
        }
    }
}
