using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Lichhoc
    {
        public Lichhoc()
        {
            Phancong = new HashSet<Phancong>();
        }

        public string Malichhoc { get; set; }
        public string Buoihoc { get; set; }
        public string Giohoc { get; set; }

        public virtual ICollection<Phancong> Phancong { get; set; }
    }
}
