using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Diadiem
    {
        public Diadiem()
        {
            Phonghoc = new HashSet<Phonghoc>();
        }

        public string Madiadiem { get; set; }
        public string Tendiadiem { get; set; }
        public string Diachidd { get; set; }

        public virtual ICollection<Phonghoc> Phonghoc { get; set; }
    }
}
