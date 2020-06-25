using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Phonghoc
    {
        public Phonghoc()
        {
            Phancong = new HashSet<Phancong>();
        }

        public string Maphong { get; set; }
        public string Madiadiem { get; set; }
        public string Tenphong { get; set; }

        public virtual Diadiem MadiadiemNavigation { get; set; }
        public virtual ICollection<Phancong> Phancong { get; set; }
    }
}
