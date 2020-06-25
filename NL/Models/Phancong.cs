using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Phancong
    {
        public string Malop { get; set; }
        public string Malichhoc { get; set; }
        public string Magiaovien { get; set; }
        public string Maphong { get; set; }

        public virtual Giaovien MagiaovienNavigation { get; set; }
        public virtual Lichhoc MalichhocNavigation { get; set; }
        public virtual Lop MalopNavigation { get; set; }
        public virtual Phonghoc MaphongNavigation { get; set; }
    }
}
