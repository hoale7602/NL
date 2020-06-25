using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Bienlai
    {
        public Bienlai()
        {
            Dangkihoc = new HashSet<Dangkihoc>();
        }

        public string Mabl { get; set; }
        public string Manhanvien { get; set; }
        public DateTime? Ngaybl { get; set; }
        public string Noidung { get; set; }
        public double Sotien { get; set; }
        public string Bangchu { get; set; }

        public virtual Nhanvien ManhanvienNavigation { get; set; }
        public virtual ICollection<Dangkihoc> Dangkihoc { get; set; }
    }
}
