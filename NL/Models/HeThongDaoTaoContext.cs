using System;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace NL.Models
{
    public partial class HeThongDaoTaoContext : DbContext
    {

        public HeThongDaoTaoContext()
        {
        }

        public HeThongDaoTaoContext(DbContextOptions<HeThongDaoTaoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bienlai> Bienlai { get; set; }
        public virtual DbSet<Dangkihoc> Dangkihoc { get; set; }
        public virtual DbSet<Diadiem> Diadiem { get; set; }
        public virtual DbSet<Donvigiaovien> Donvigiaovien { get; set; }
        public virtual DbSet<Donvihocvien> Donvihocvien { get; set; }
        public virtual DbSet<Giangday> Giangday { get; set; }
        public virtual DbSet<Giaovien> Giaovien { get; set; }
        public virtual DbSet<Hocvien> Hocvien { get; set; }
        public virtual DbSet<Khoahoc> Khoahoc { get; set; }
        public virtual DbSet<Kythi> Kythi { get; set; }
        public virtual DbSet<Lichhoc> Lichhoc { get; set; }
        public virtual DbSet<Lop> Lop { get; set; }
        public virtual DbSet<Monhoc> Monhoc { get; set; }
        public virtual DbSet<Nhanvien> Nhanvien { get; set; }
        public virtual DbSet<Nhomlop> Nhomlop { get; set; }
        public virtual DbSet<Phancong> Phancong { get; set; }
        public virtual DbSet<Phonghoc> Phonghoc { get; set; }
        public virtual DbSet<Quanlidiem> Quanlidiem { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-U71KR7L\\SQLEXPRESS;Initial Catalog=HeThongDaoTao;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bienlai>(entity =>
            {
                entity.HasKey(e => e.Mabl);

                entity.ToTable("BIENLAI");

                entity.HasIndex(e => e.Manhanvien)
                    .HasName("THUTIEN_FK");

                entity.Property(e => e.Mabl)
                    .HasColumnName("MABL")
                    .HasMaxLength(6);

                entity.Property(e => e.Bangchu)
                    .IsRequired()
                    .HasColumnName("BANGCHU")
                    .HasMaxLength(100);

                entity.Property(e => e.Manhanvien)
                    .IsRequired()
                    .HasColumnName("MANHANVIEN")
                    .HasMaxLength(6);

                entity.Property(e => e.Ngaybl)
                    .HasColumnName("NGAYBL")
                    .HasColumnType("date");

                entity.Property(e => e.Noidung)
                    .IsRequired()
                    .HasColumnName("NOIDUNG")
                    .HasMaxLength(100);

                entity.Property(e => e.Sotien).HasColumnName("SOTIEN");

                entity.HasOne(d => d.ManhanvienNavigation)
                    .WithMany(p => p.Bienlai)
                    .HasForeignKey(d => d.Manhanvien)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BIENLAI_THUTIEN_NHANVIEN");
            });

            modelBuilder.Entity<Dangkihoc>(entity =>
            {
                entity.HasKey(e => new { e.Mahv, e.Mabl, e.Malop });

                entity.ToTable("DANGKIHOC");

                entity.HasIndex(e => e.Mabl)
                    .HasName("DANGKIHOC2_FK");

                entity.HasIndex(e => e.Mahv)
                    .HasName("DANGKIHOC_FK");

                entity.HasIndex(e => e.Malop)
                    .HasName("DANGKIHOC3_FK");

                entity.Property(e => e.Mahv)
                    .HasColumnName("MAHV")
                    .HasMaxLength(6);

                entity.Property(e => e.Mabl)
                    .HasColumnName("MABL")
                    .HasMaxLength(6);

                entity.Property(e => e.Malop)
                    .HasColumnName("MALOP")
                    .HasMaxLength(6);

                entity.HasOne(d => d.MablNavigation)
                    .WithMany(p => p.Dangkihoc)
                    .HasForeignKey(d => d.Mabl)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DANGKIHO_DANGKIHOC_BIENLAI");

                entity.HasOne(d => d.MahvNavigation)
                    .WithMany(p => p.Dangkihoc)
                    .HasForeignKey(d => d.Mahv)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DANGKIHO_DANGKIHOC_HOCVIEN");

                entity.HasOne(d => d.MalopNavigation)
                    .WithMany(p => p.Dangkihoc)
                    .HasForeignKey(d => d.Malop)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DANGKIHO_DANGKIHOC_LOP");
            });

            modelBuilder.Entity<Diadiem>(entity =>
            {
                entity.HasKey(e => e.Madiadiem);

                entity.ToTable("DIADIEM");

                entity.Property(e => e.Madiadiem)
                    .HasColumnName("MADIADIEM")
                    .HasMaxLength(6);

                entity.Property(e => e.Diachidd)
                    .IsRequired()
                    .HasColumnName("DIACHIDD")
                    .HasMaxLength(100);

                entity.Property(e => e.Tendiadiem)
                    .IsRequired()
                    .HasColumnName("TENDIADIEM")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Donvigiaovien>(entity =>
            {
                entity.HasKey(e => e.Madonvigv);

                entity.ToTable("DONVIGIAOVIEN");

                entity.Property(e => e.Madonvigv)
                    .HasColumnName("MADONVIGV")
                    .HasMaxLength(6);

                entity.Property(e => e.Diachi)
                    .IsRequired()
                    .HasColumnName("DIACHI")
                    .HasMaxLength(100);

                entity.Property(e => e.Tendvgv)
                    .IsRequired()
                    .HasColumnName("TENDVGV")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Donvihocvien>(entity =>
            {
                entity.HasKey(e => e.Madonvi);

                entity.ToTable("DONVIHOCVIEN");

                entity.Property(e => e.Madonvi)
                    .HasColumnName("MADONVI")
                    .HasMaxLength(6);

                entity.Property(e => e.Diachi)
                    .IsRequired()
                    .HasColumnName("DIACHI")
                    .HasMaxLength(100);

                entity.Property(e => e.Tendonvi)
                    .IsRequired()
                    .HasColumnName("TENDONVI")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Giangday>(entity =>
            {
                entity.HasKey(e => new { e.Mamonhoc, e.Magiaovien });

                entity.ToTable("GIANGDAY");

                entity.HasIndex(e => e.Magiaovien)
                    .HasName("GIANGDAY2_FK");

                entity.HasIndex(e => e.Mamonhoc)
                    .HasName("GIANGDAY_FK");

                entity.Property(e => e.Mamonhoc)
                    .HasColumnName("MAMONHOC")
                    .HasMaxLength(6);

                entity.Property(e => e.Magiaovien)
                    .HasColumnName("MAGIAOVIEN")
                    .HasMaxLength(6);

                entity.Property(e => e.Thulao).HasColumnName("THULAO");

                entity.HasOne(d => d.MagiaovienNavigation)
                    .WithMany(p => p.Giangday)
                    .HasForeignKey(d => d.Magiaovien)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GIANGDAY_GIANGDAY2_GIAOVIEN");

                entity.HasOne(d => d.MamonhocNavigation)
                    .WithMany(p => p.Giangday)
                    .HasForeignKey(d => d.Mamonhoc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GIANGDAY_GIANGDAY_MONHOC");
            });

            modelBuilder.Entity<Giaovien>(entity =>
            {
                entity.HasKey(e => e.Magiaovien);

                entity.ToTable("GIAOVIEN");

                entity.HasIndex(e => e.Madonvigv)
                    .HasName("BAOGOM_FK");

                entity.Property(e => e.Magiaovien)
                    .HasColumnName("MAGIAOVIEN")
                    .HasMaxLength(6);

                entity.Property(e => e.Diachi)
                    .IsRequired()
                    .HasColumnName("DIACHI")
                    .HasMaxLength(100);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasMaxLength(50);

                entity.Property(e => e.Gioitinh).HasColumnName("GIOITINH");

                entity.Property(e => e.Hesothulao).HasColumnName("HESOTHULAO");

                entity.Property(e => e.Hoten)
                    .IsRequired()
                    .HasColumnName("HOTEN")
                    .HasMaxLength(50);

                entity.Property(e => e.Madonvigv)
                    .IsRequired()
                    .HasColumnName("MADONVIGV")
                    .HasMaxLength(6);

                entity.Property(e => e.Matkhau)
                    .IsRequired()
                    .HasColumnName("MATKHAU")
                    .HasMaxLength(50);

                entity.Property(e => e.Ngaysinh)
                    .HasColumnName("NGAYSINH")
                    .HasColumnType("date");

                entity.Property(e => e.Sodt).HasColumnName("SODT");

                entity.Property(e => e.Taikhoangv)
                    .IsRequired()
                    .HasColumnName("TAIKHOANGV")
                    .HasMaxLength(50);

                entity.HasOne(d => d.MadonvigvNavigation)
                    .WithMany(p => p.Giaovien)
                    .HasForeignKey(d => d.Madonvigv)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_GIAOVIEN_BAOGOM_DONVIGIA");
            });

            modelBuilder.Entity<Hocvien>(entity =>
            {
                entity.HasKey(e => e.Mahv);

                entity.ToTable("HOCVIEN");

                entity.HasIndex(e => e.Madonvi)
                    .HasName("BAO_GOM_FK");

                entity.Property(e => e.Mahv)
                    .HasColumnName("MAHV")
                    .HasMaxLength(6);

                entity.Property(e => e.Diachi)
                    .HasColumnName("DIACHI")
                    .HasMaxLength(100);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("EMAIL")
                    .HasMaxLength(50);

                entity.Property(e => e.Giotinh).HasColumnName("GIOTINH");

                entity.Property(e => e.Hotenhv)
                    .IsRequired()
                    .HasColumnName("HOTENHV")
                    .HasMaxLength(50);

                entity.Property(e => e.Madonvi)
                    .IsRequired()
                    .HasColumnName("MADONVI")
                    .HasMaxLength(6);

                entity.Property(e => e.Matkhau)
                    .IsRequired()
                    .HasColumnName("MATKHAU")
                    .HasMaxLength(50);

                entity.Property(e => e.Ngaysinh)
                    .HasColumnName("NGAYSINH")
                    .HasColumnType("date");

                entity.Property(e => e.Sodt).HasColumnName("SODT");

                entity.Property(e => e.Taikhoanhv)
                    .IsRequired()
                    .HasColumnName("TAIKHOANHV")
                    .HasMaxLength(20);

                entity.HasOne(d => d.MadonviNavigation)
                    .WithMany(p => p.Hocvien)
                    .HasForeignKey(d => d.Madonvi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_HOCVIEN_BAO_GOM_DONVIHOC");
            });

            modelBuilder.Entity<Khoahoc>(entity =>
            {
                entity.HasKey(e => e.Makhoahoc);

                entity.ToTable("KHOAHOC");

                entity.Property(e => e.Makhoahoc)
                    .HasColumnName("MAKHOAHOC")
                    .HasMaxLength(6);

                entity.Property(e => e.Ngaybd)
                    .HasColumnName("NGAYBD")
                    .HasColumnType("date");

                entity.Property(e => e.Ngaykt)
                    .HasColumnName("NGAYKT")
                    .HasColumnType("date");

                entity.Property(e => e.Tenkhoahoc)
                    .IsRequired()
                    .HasColumnName("TENKHOAHOC")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Kythi>(entity =>
            {
                entity.HasKey(e => e.Makythi);

                entity.ToTable("KYTHI");

                entity.Property(e => e.Makythi)
                    .HasColumnName("MAKYTHI")
                    .HasMaxLength(6);

                entity.Property(e => e.Tenkythi)
                    .IsRequired()
                    .HasColumnName("TENKYTHI")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Lichhoc>(entity =>
            {
                entity.HasKey(e => e.Malichhoc);

                entity.ToTable("LICHHOC");

                entity.Property(e => e.Malichhoc)
                    .HasColumnName("MALICHHOC")
                    .HasMaxLength(6);

                entity.Property(e => e.Buoihoc)
                    .IsRequired()
                    .HasColumnName("BUOIHOC")
                    .HasMaxLength(50);

                entity.Property(e => e.Giohoc)
                    .IsRequired()
                    .HasColumnName("GIOHOC")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Lop>(entity =>
            {
                entity.HasKey(e => e.Malop);

                entity.ToTable("LOP");

                entity.HasIndex(e => e.Mamonhoc)
                    .HasName("GOM_CO_FK");

                entity.HasIndex(e => e.Manhom)
                    .HasName("THUOC_FK");

                entity.Property(e => e.Malop)
                    .HasColumnName("MALOP")
                    .HasMaxLength(6);

                entity.Property(e => e.Mamonhoc)
                    .IsRequired()
                    .HasColumnName("MAMONHOC")
                    .HasMaxLength(6);

                entity.Property(e => e.Manhom)
                    .IsRequired()
                    .HasColumnName("MANHOM")
                    .HasMaxLength(6);

                entity.Property(e => e.Ngaybd)
                    .HasColumnName("NGAYBD")
                    .HasColumnType("date");

                entity.Property(e => e.Ngaykt)
                    .HasColumnName("NGAYKT")
                    .HasColumnType("date");

                entity.Property(e => e.Sisodk).HasColumnName("SISODK");

                entity.Property(e => e.Tenlop)
                    .IsRequired()
                    .HasColumnName("TENLOP")
                    .HasMaxLength(50);

                entity.Property(e => e.Trangthai).HasColumnName("TRANGTHAI");

                entity.HasOne(d => d.MamonhocNavigation)
                    .WithMany(p => p.Lop)
                    .HasForeignKey(d => d.Mamonhoc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LOP_GOM_CO_MONHOC");

                entity.HasOne(d => d.ManhomNavigation)
                    .WithMany(p => p.Lop)
                    .HasForeignKey(d => d.Manhom)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_LOP_THUOC_NHOMLOP");
            });

            modelBuilder.Entity<Monhoc>(entity =>
            {
                entity.HasKey(e => e.Mamonhoc);

                entity.ToTable("MONHOC");

                entity.HasIndex(e => e.Makhoahoc)
                    .HasName("CO_FK");

                entity.Property(e => e.Mamonhoc)
                    .HasColumnName("MAMONHOC")
                    .HasMaxLength(6);

                entity.Property(e => e.Hocphi).HasColumnName("HOCPHI");

                entity.Property(e => e.Makhoahoc)
                    .IsRequired()
                    .HasColumnName("MAKHOAHOC")
                    .HasMaxLength(6);

                entity.Property(e => e.Sotiethoc).HasColumnName("SOTIETHOC");

                entity.Property(e => e.Tenmonhoc)
                    .IsRequired()
                    .HasColumnName("TENMONHOC")
                    .HasMaxLength(50);

                entity.HasOne(d => d.MakhoahocNavigation)
                    .WithMany(p => p.Monhoc)
                    .HasForeignKey(d => d.Makhoahoc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MONHOC_CO_KHOAHOC");
            });

            modelBuilder.Entity<Nhanvien>(entity =>
            {
                entity.HasKey(e => e.Manhanvien);

                entity.ToTable("NHANVIEN");

                entity.Property(e => e.Manhanvien)
                    .HasColumnName("MANHANVIEN")
                    .HasMaxLength(6);

                entity.Property(e => e.Diachi)
                    .HasColumnName("DIACHI")
                    .HasMaxLength(100);

                entity.Property(e => e.Email)
                    .HasColumnName("EMAIL")
                    .HasMaxLength(50);

                entity.Property(e => e.Gioitinh).HasColumnName("GIOITINH");

                entity.Property(e => e.Matkhau)
                    .IsRequired()
                    .HasColumnName("MATKHAU")
                    .HasMaxLength(50);

                entity.Property(e => e.Quyen)
                    .IsRequired()
                    .HasColumnName("QUYEN")
                    .HasMaxLength(20);

                entity.Property(e => e.Sodt).HasColumnName("SODT");

                entity.Property(e => e.Taikhoan)
                    .IsRequired()
                    .HasColumnName("TAIKHOAN")
                    .HasMaxLength(50);

                entity.Property(e => e.Tennv)
                    .IsRequired()
                    .HasColumnName("TENNV")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Nhomlop>(entity =>
            {
                entity.HasKey(e => e.Manhom);

                entity.ToTable("NHOMLOP");

                entity.Property(e => e.Manhom)
                    .HasColumnName("MANHOM")
                    .HasMaxLength(6);

                entity.Property(e => e.Tennhom)
                    .IsRequired()
                    .HasColumnName("TENNHOM")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Phancong>(entity =>
            {
                entity.HasKey(e => new { e.Malop, e.Malichhoc, e.Magiaovien, e.Maphong });

                entity.ToTable("PHANCONG");

                entity.HasIndex(e => e.Magiaovien)
                    .HasName("PHANCONG3_FK");

                entity.HasIndex(e => e.Malichhoc)
                    .HasName("PHANCONG2_FK");

                entity.HasIndex(e => e.Malop)
                    .HasName("PHANCONG_FK");

                entity.HasIndex(e => e.Maphong)
                    .HasName("PHANCONG4_FK");

                entity.Property(e => e.Malop)
                    .HasColumnName("MALOP")
                    .HasMaxLength(6);

                entity.Property(e => e.Malichhoc)
                    .HasColumnName("MALICHHOC")
                    .HasMaxLength(6);

                entity.Property(e => e.Magiaovien)
                    .HasColumnName("MAGIAOVIEN")
                    .HasMaxLength(6);

                entity.Property(e => e.Maphong)
                    .HasColumnName("MAPHONG")
                    .HasMaxLength(6);

                entity.HasOne(d => d.MagiaovienNavigation)
                    .WithMany(p => p.Phancong)
                    .HasForeignKey(d => d.Magiaovien)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PHANCONG_PHANCONG3_GIAOVIEN");

                entity.HasOne(d => d.MalichhocNavigation)
                    .WithMany(p => p.Phancong)
                    .HasForeignKey(d => d.Malichhoc)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PHANCONG_PHANCONG2_LICHHOC");

                entity.HasOne(d => d.MalopNavigation)
                    .WithMany(p => p.Phancong)
                    .HasForeignKey(d => d.Malop)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PHANCONG_PHANCONG_LOP");

                entity.HasOne(d => d.MaphongNavigation)
                    .WithMany(p => p.Phancong)
                    .HasForeignKey(d => d.Maphong)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PHANCONG_PHANCONG4_PHONGHOC");
            });

            modelBuilder.Entity<Phonghoc>(entity =>
            {
                entity.HasKey(e => e.Maphong);

                entity.ToTable("PHONGHOC");

                entity.HasIndex(e => e.Madiadiem)
                    .HasName("NAM_FK");

                entity.Property(e => e.Maphong)
                    .HasColumnName("MAPHONG")
                    .HasMaxLength(6);

                entity.Property(e => e.Madiadiem)
                    .IsRequired()
                    .HasColumnName("MADIADIEM")
                    .HasMaxLength(6);

                entity.Property(e => e.Tenphong)
                    .IsRequired()
                    .HasColumnName("TENPHONG")
                    .HasMaxLength(50);

                entity.HasOne(d => d.MadiadiemNavigation)
                    .WithMany(p => p.Phonghoc)
                    .HasForeignKey(d => d.Madiadiem)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PHONGHOC_NAM_DIADIEM");
            });

            modelBuilder.Entity<Quanlidiem>(entity =>
            {
                entity.HasKey(e => new { e.Mahv, e.Makythi });

                entity.ToTable("QUANLIDIEM");

                entity.HasIndex(e => e.Mahv)
                    .HasName("QUANLIDIEM_FK");

                entity.HasIndex(e => e.Makythi)
                    .HasName("QUANLIDIEM2_FK");

                entity.Property(e => e.Mahv)
                    .HasColumnName("MAHV")
                    .HasMaxLength(6);

                entity.Property(e => e.Makythi)
                    .HasColumnName("MAKYTHI")
                    .HasMaxLength(6);

                entity.Property(e => e.Ketqua).HasColumnName("KETQUA");

                entity.Property(e => e.Ngaythi)
                    .HasColumnName("NGAYTHI")
                    .HasColumnType("date");

                entity.Property(e => e.Xeploai)
                    .HasColumnName("XEPLOAI")
                    .HasMaxLength(20);

                entity.HasOne(d => d.MahvNavigation)
                    .WithMany(p => p.Quanlidiem)
                    .HasForeignKey(d => d.Mahv)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_QUANLIDI_QUANLIDIE_HOCVIEN");

                entity.HasOne(d => d.MakythiNavigation)
                    .WithMany(p => p.Quanlidiem)
                    .HasForeignKey(d => d.Makythi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_QUANLIDI_QUANLIDIE_KYTHI");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
