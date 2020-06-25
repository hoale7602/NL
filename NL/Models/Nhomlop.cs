using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Nhomlop
    {
        public Nhomlop()
        {
            Lop = new HashSet<Lop>();
        }

        public string Manhom { get; set; }
        public string Tennhom { get; set; }

        public virtual ICollection<Lop> Lop { get; set; }
    }
}
