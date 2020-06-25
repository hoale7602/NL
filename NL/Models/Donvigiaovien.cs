using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NL.Models
{
    public partial class Donvigiaovien
    {
        public Donvigiaovien()
        {
            Giaovien = new HashSet<Giaovien>();
        }
        [Required(AllowEmptyStrings = false)]
        [StringLength(maximumLength: 6, MinimumLength = 1)]
        public string Madonvigv { get; set; }
        [Required]
        public string Tendvgv { get; set; }
        [Required]
        public string Diachi { get; set; }

        public virtual ICollection<Giaovien> Giaovien { get; set; }
    }
}
