using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Quanlidiem
    {
        public string Mahv { get; set; }
        public string Makythi { get; set; }
        public DateTime? Ngaythi { get; set; }
        public double? Ketqua { get; set; }
        public string Xeploai { get; set; }

        public virtual Hocvien MahvNavigation { get; set; }
        public virtual Kythi MakythiNavigation { get; set; }
    }
}
