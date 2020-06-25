using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Dangkihoc
    {
        public string Mahv { get; set; }
        public string Mabl { get; set; }
        public string Malop { get; set; }

        public virtual Bienlai MablNavigation { get; set; }
        public virtual Hocvien MahvNavigation { get; set; }
        public virtual Lop MalopNavigation { get; set; }
    }
}
