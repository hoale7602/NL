using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NL.Models
{
    public partial class GDFull
    {
        private object g;

        public GDFull(object g)
        {
            this.g = g;
        }

        public string Mamonhoc { get; set; }
        public string Magiaovien { get; set; }
        public double? Thulao { get; set; }

        public string Tenmonhoc { get; set; }
        public string Hoten { get; set; }
    }
}
