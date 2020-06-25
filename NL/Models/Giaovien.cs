using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NL.Models
{
    public partial class Giaovien
    {
        public Giaovien()
        {
            Giangday = new HashSet<Giangday>();
            Phancong = new HashSet<Phancong>();
        }

        public string Magiaovien { get; set; }
        public string Madonvigv { get; set; }
        public string Hoten { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public bool Gioitinh { get; set; }
        public string Diachi { get; set; }
        [Range(minimum: 100000000, maximum: 999999999)]
        [JsonConverter(typeof(IntToStringConverter))]
        public int Sodt { get; set; }
        public string Email { get; set; }
        public string Taikhoangv { get; set; }
        public string Matkhau { get; set; }
        [JsonConverter(typeof(IntToStringConverter))]
        public int Hesothulao { get; set; }

        public virtual Donvigiaovien MadonvigvNavigation { get; set; }
        public virtual ICollection<Giangday> Giangday { get; set; }
        public virtual ICollection<Phancong> Phancong { get; set; }
    }
}
