using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Lop
    {
        public Lop()
        {
            Dangkihoc = new HashSet<Dangkihoc>();
            Phancong = new HashSet<Phancong>();
        }

        public string Malop { get; set; }
        public string Manhom { get; set; }
        public string Mamonhoc { get; set; }
        public string Tenlop { get; set; }
        public int Sisodk { get; set; }
        public DateTime? Ngaybd { get; set; }
        public DateTime? Ngaykt { get; set; }
        public bool Trangthai { get; set; }

        public virtual Monhoc MamonhocNavigation { get; set; }
        public virtual Nhomlop ManhomNavigation { get; set; }
        public virtual ICollection<Dangkihoc> Dangkihoc { get; set; }
        public virtual ICollection<Phancong> Phancong { get; set; }
    }
}
