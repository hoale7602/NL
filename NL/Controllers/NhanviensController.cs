using System.Collections.Generic;
using System.Linq;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NL.Models;
using MimeKit;


namespace NL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanviensController : ControllerBase
    {
        private readonly HeThongDaoTaoContext _context;

        public NhanviensController(HeThongDaoTaoContext context)
        {
            _context = context;
        }

        // GET: api/Nhanviens
        [HttpGet]
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<Nhanvien>>> GetNhanvien()
        {
            return await _context.Nhanvien.ToListAsync();
        }

        // GET: api/Nhanviens/5
        [HttpGet("{id}")]
        [Route("GetNhanvien/{id}")]

        public async Task<ActionResult<Nhanvien>> GetNhanvien(string id)
        {
            var nhanvien = await _context.Nhanvien.FindAsync(id);

            if (nhanvien == null)
            {
                return NotFound();
            }

            return nhanvien;
        }

        // PUT: api/Nhanviens/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Route("PutNhanvien/{id}")]
        public async Task<IActionResult> PutNhanvien(Nhanvien nhanvien)
        {
            //if (id != nhanvien.Manhanvien)
            //{
            //    return BadRequest();
            //}

            _context.Entry(nhanvien).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!NhanvienExists(id))
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

        // POST: api/Nhanviens
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("PostNhanvien")]
        public async Task<ActionResult<Nhanvien>> PostNhanvien(Nhanvien nhanvien)
        {
            _context.Nhanvien.Add(nhanvien);
            try
            {
                await _context.SaveChangesAsync();
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Trung Tâm Đào Tạo Hòa Lê", "hoak42798@gmail.com"));
                //  message.To.Add(new MailboxAddress(nhanvien.Tennv, "hoale7602@gmail.com"));

                message.To.Add(new MailboxAddress(nhanvien.Tennv, nhanvien.Email));

                message.Subject = "Thông Tin Tài Khoản";
                message.Body = new TextPart("plain")
                {
                    Text = "Chào mừng bạn đến với Trung Tâm đào tạo Hòa Lê\nTên tài khoản : " + nhanvien.Taikhoan + "\nMật Khẩu : " + nhanvien.Matkhau
                    
                };
                using (var client = new SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, false);
                    client.Authenticate("hoak42798@gmail.com", "Haduy7602!");
                    client.Send(message);
                    client.Disconnect(true);

                }

            }
            catch (DbUpdateException)
            {
                if (NhanvienExists(nhanvien.Manhanvien))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetNhanvien", new { id = nhanvien.Manhanvien }, nhanvien);
        }

        // DELETE: api/Nhanviens/5
        [HttpDelete("{id}")]
        [Route("DeleteNhanvien/{id}")]
        public async Task<ActionResult<Nhanvien>> DeleteNhanvien(string id)
        {
            var nhanvien = await _context.Nhanvien.FindAsync(id);
            if (nhanvien == null)
            {
                return NotFound();
            }

            _context.Nhanvien.Remove(nhanvien);
            await _context.SaveChangesAsync();

            return nhanvien;
        }

        private bool NhanvienExists(string id)
        {
            
            return _context.Nhanvien.Any(e => e.Manhanvien == id);
        }
        [HttpGet("{id}")]
        [Route("Login/{id}")]
        public async Task<ActionResult<Nhanvien>> Login(string id)
        {
            var e = id.Split(",",2);
            var nhanvien = await _context.Nhanvien.FindAsync(e[0]);
            if (nhanvien == null)
            {
                return NotFound();
            }
            if (nhanvien.Matkhau.Equals(e[1]))
            {
                return nhanvien;
            }

            return null;
        }
        [HttpGet]
        [Route("SendMail/{id}")]
        public async Task<ActionResult<Nhanvien>> SendMail(string id)
        {
            var nhanvien = await _context.Nhanvien.FindAsync(id);
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Trung Tâm Đào Tạo Hòa Lê", "hoak42798@gmail.com"));
          //  message.To.Add(new MailboxAddress(nhanvien.Tennv, "hoale7602@gmail.com"));

            message.To.Add(new MailboxAddress(nhanvien.Tennv,nhanvien.Email));

            message.Subject = "Cấp lại Mật Khẩu mới";
            message.Body = new TextPart("plain")
            {
                Text = "Chào bạn " + nhanvien.Tennv + "\nMật Khẩu mới của bạn là  : " + nhanvien.Matkhau
        };
            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com",587,false);
                client.Authenticate("hoak42798@gmail.com", "Haduy7602!");
                client.Send(message);
                client.Disconnect(true);

            }
            return null;
        }
        [HttpGet]
        [HttpGet("[action]")]
        public IActionResult CountNhanVien()
        {
            var result = (from A in _context.Nhanvien
                          select new
                          {
                              A.Manhanvien
                          }).Count();
            return Ok(result);
        }


    }

}