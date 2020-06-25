using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NL.Models
{
    public partial class Hocvien
    {
        public Hocvien()
        {
            Dangkihoc = new HashSet<Dangkihoc>();
            Quanlidiem = new HashSet<Quanlidiem>();
        }
        [Required(AllowEmptyStrings = false)]
        [StringLength(maximumLength: 6, MinimumLength = 1)]
        public string Mahv { get; set; }
        [Required]
        public string Madonvi { get; set; }
        [Required]
        public string Hotenhv { get; set; }
        [Required]
        public DateTime? Ngaysinh { get; set; }
        public string Diachi { get; set; }
        [Range(minimum: 100000000, maximum: 999999999)]
        [JsonConverter(typeof(IntToStringConverter))]
        public int Sodt { get; set; }
        public bool Giotinh { get; set; }
        [EmailAddress(ErrorMessage = "Please enter a valid email")]
        public string Email { get; set; }
        public string Taikhoanhv { get; set; }
        public string Matkhau { get; set; }

        public virtual Donvihocvien MadonviNavigation { get; set; }
        public virtual ICollection<Dangkihoc> Dangkihoc { get; set; }
        public virtual ICollection<Quanlidiem> Quanlidiem { get; set; }
    }
}
