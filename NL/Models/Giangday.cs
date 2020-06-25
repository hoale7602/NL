using System;
using System.Collections.Generic;

namespace NL.Models
{
    public partial class Giangday
    {
        public string Mamonhoc { get; set; }
        public string Magiaovien { get; set; }
        public double? Thulao { get; set; }

        public virtual Giaovien MagiaovienNavigation { get; set; }
        public virtual Monhoc MamonhocNavigation { get; set; }
    }
}
