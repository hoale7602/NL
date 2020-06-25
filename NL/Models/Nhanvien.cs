using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Nhanvien
    {
        public Nhanvien()
        {
            Bienlai = new HashSet<Bienlai>();
        }

        public string Manhanvien { get; set; }
        public string Tennv { get; set; }
        public bool? Gioitinh { get; set; }
        public string Diachi { get; set; }
        public string Email { get; set; }
        public int? Sodt { get; set; }
        public string Taikhoan { get; set; }
        public string Matkhau { get; set; }
        public string Quyen { get; set; }

        public virtual ICollection<Bienlai> Bienlai { get; set; }
    }
}
