using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NL.Models
{
    public partial class Donvihocvien
    {
        public Donvihocvien()
        {
            Hocvien = new HashSet<Hocvien>();
        }
        [Required(AllowEmptyStrings = false)]
        [StringLength(maximumLength: 6, MinimumLength = 1)]
        public string Madonvi { get; set; }
        [Required]
        public string Tendonvi { get; set; }
        [Required]
        public string Diachi { get; set; }

        public virtual ICollection<Hocvien> Hocvien { get; set; }
    }
}
