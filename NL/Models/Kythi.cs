using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Kythi
    {
        public Kythi()
        {
            Quanlidiem = new HashSet<Quanlidiem>();
        }

        public string Makythi { get; set; }
        public string Tenkythi { get; set; }

        public virtual ICollection<Quanlidiem> Quanlidiem { get; set; }
    }
}
