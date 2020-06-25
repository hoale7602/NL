using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NL.Models
{
    public partial class Khoahoc
    {
        public Khoahoc()
        {
            Monhoc = new HashSet<Monhoc>();
        }
        [Required(AllowEmptyStrings = false)]
        [StringLength(maximumLength: 6, MinimumLength = 1)]
        public string Makhoahoc { get; set; }
        [Required]
        public string Tenkhoahoc { get; set; }
        public DateTime? Ngaybd { get; set; }
        
        public DateTime? Ngaykt { get; set; }

        public virtual ICollection<Monhoc> Monhoc { get; set; }
    }
}
