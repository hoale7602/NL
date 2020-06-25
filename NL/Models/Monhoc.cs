using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Monhoc
    {
        public Monhoc()
        {
            Giangday = new HashSet<Giangday>();
            Lop = new HashSet<Lop>();
        }

        public string Mamonhoc { get; set; }
        public string Makhoahoc { get; set; }
        public string Tenmonhoc { get; set; }
        public double Hocphi { get; set; }
        public int? Sotiethoc { get; set; }

        public virtual Khoahoc MakhoahocNavigation { get; set; }
        public virtual ICollection<Giangday> Giangday { get; set; }
        public virtual ICollection<Lop> Lop { get; set; }
    }
}
