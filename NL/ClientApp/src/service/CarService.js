import axios from 'axios';

export class CarService {
    //Don Vi Hoc Vien
    getDonViHocVien() {
        return axios.get('api/Donvihocviens/GetDonvihocvien')
            .then(res => res.data);
    }
    themdonvihocvien(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Donvihocviens/PostDonvihocvien', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaDocViHocVien(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Donvihocviens/PutDonvihocvien', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })   
    }
    deleteDVHV(items) {
        console.log(items);
        return fetch('api/Donvihocviens/DeleteDonvihocvien/' + items, {
           method: 'delete'
        })
    }

    //Hoc Vien
    getHocVien() {
        return axios.get('api/Hocviens/GetHocvien')
            .then(res => res.data);
    }
    themHocVien(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Hocviens/PostHocvien', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaHocVien(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Hocviens/PutHocvien', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })
    }

    deleteHocVien(items) {
        console.log(items);
        return fetch('api/Hocviens/DeleteHocvien/' + items, {
            method: 'delete'
        })
    }

    //Đơn vị giáo viên
    getDonViGiaoVien() {
        return axios.get('api/Donvigiaoviens/GetDonvigiaovien')
            .then(res => res.data);
    }
    themDonViGiaoVien(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Donvigiaoviens/PostDonvigiaovien', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaDonViGiaoVien(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Donvigiaoviens/PutDonvigiaovien', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })
    }
    deleteDonViGiaoVien(items) {
        console.log(items);
        return fetch('api/Donvigiaoviens/DeleteDonvigiaovien/' + items, {
            method: 'delete'
        })
    }

    //Giáo viên
    getGiaoVien() {
        return axios.get('api/Giaoviens/GetGiaovien')
            .then(res => res.data);
    }
    getGiaoVienID(items) {
        return axios.get('api/Giaoviens/GetGiaovien/' + items).then(res => res.data);
    }
    themGiaoVien(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Giaoviens/PostGiaovien', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaGiaoVien(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Giaoviens/PutGiaovien', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })
    }

    deleteGiaoVien(items) {
        console.log(items);
        return fetch('api/Giaoviens/DeleteGiaovien/' + items, {
            method: 'delete'
        })
    }
    //Khóa Học
    getKhoaHoc() {
        return axios.get('api/Khoahocs/GetKhoahoc')
            .then(res => res.data);
    }
    getKhoaHocID(items) {
        return axios.get('api/Khoahocs/GetKhoahoc/' + items).then(res => res.data);
    }

    themKhoaHoc(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Khoahocs/PostKhoahoc', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaKhoaHoc(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Khoahocs/PutKhoahoc', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })

    }
    deleteKhoaHoc(items) {
        console.log(items);
        return fetch('api/Khoahocs/DeleteKhoahoc/' + items, {
            method: 'delete'
        })
    }
    //Môn Học
    getMonHoc() {
        return axios.get('api/Monhocs/GetMonhoc')
            .then(res => res.data);
    }
    getMonHocID(items) {
        return axios.get('api/Monhocs/GetMonhoc/' + items)
            .then(res => res.data);
    }
    themMonHoc(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Monhocs/PostMonhoc', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaMonHoc(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Monhocs/PutMonhoc', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })

    }
    deleteMonHoc(items) {
        console.log(items);
        return fetch('api/Monhocs/DeleteMonhoc/' + items, {
            method: 'delete'
        })
    }
    //Nhóm lớp
    getNhomLop() {
        return axios.get('api/Nhomlops/GetNhomlop')
            .then(res => res.data);
    }
    themNhomLop(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Nhomlops/PostNhomlop', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaNhomLop(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Nhomlops/PutNhomlop', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })

    }
    deleteNhomLop(items) {
        console.log(items);
        return fetch('api/Nhomlops/DeleteNhomlop/' + items, {
            method: 'delete'
        })
    }
    //Lớp học
    getLop() {
        return axios.get('api/Lops/GetLop')
            .then(res => res.data);
    }
    getLopID(items) {
        return axios.get('api/Lops/GetLop/' + items).then(res => res.data);
    }

    getLopTheoTrangThai() {
        return axios.get('api/Lops/GetLopChoDKi').then(res => res.data);
    }

    themLop(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Lops/PostLop', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }

    suaLop(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Lops/PutLop', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })

    }
    deleteLop(items) {
        console.log(items);
        return fetch('api/Lops/DeleteLop/' + items, {
            method: 'delete'
        })
    }
    //Lịch Học
    getLichHoc() {
        return axios.get('api/Lichhocs/GetLichhoc')
            .then(res => res.data);
    }
    themLichHoc(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Lichhocs/PostLichhoc', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaLichHoc(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Lichhocs/PutLichhoc', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })

    }
    deleteLichHoc(items) {
        console.log(items);
        return fetch('api/Lichhocs/DeleteLichhoc/' + items, {
            method: 'delete'
        })
    }

    //Nhân Viên
    getNhanVien() {
        return axios.get('api/Nhanviens/GetNhanvien')
            .then(res => res.data);
    }
    getNhanVienID(event) {
        return axios.get('api/Nhanviens/GetNhanvien/' + event)
            .then(res => res.data);
    }
    Login(event) {
        return axios.get('api/Nhanviens/Login/' + event);
    }
    sendMail(event) {
        return axios.get('api/Nhanviens/SendMail/' + event);
    }
    themNhanVien(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Nhanviens/PostNhanvien', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaNhanVien(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Nhanviens/PutNhanvien', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })
    }

    deleteNhanVien(items) {
        console.log(items);
        return fetch('api/Nhanviens/DeleteNhanvien/' + items, {
            method: 'delete'
        })
    }
    //Biên Lai
    getBienLai() {
        return axios.get('api/Bienlais/GetBienlai')
            .then(res => res.data);
    }
    getBienLaiTop() {
        return axios.get('api/Bienlais/GetTopBL')
            .then(res => res.data);
    }
    getBienLaiID(items) {
        return axios.get('api/Bienlais/GetBienlai/' + items).then(res => res.data);
    }
    themBienLai(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Bienlais/PostBienlai', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaBienLai(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Bienlais/PutBienlai', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })
    }

    deleteBienLai(items) {
        console.log(items);
        return fetch('api/Bienlais/DeleteBienlai/' + items, {
            method: 'delete'
        })
    }

    //Địa Điểm
    getDiaDiem() {
        return axios.get('api/Diadiems/GetDiadiem')
            .then(res => res.data);
    }
    themDiaDiem(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Diadiems/PostDiadiem', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaDiaDiem(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Diadiems/PutDiadiem', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })
    }
    deleteDiaDiem(items) {
        console.log(items);
        return fetch('api/Diadiems/DeleteDiadiem/' + items, {
            method: 'delete'
        })
    }

    //Phòng Học
    getPhongHoc() {
        return axios.get('api/Phonghocs/GetPhonghoc')
            .then(res => res.data);
    }
    themPhongHoc(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Phonghocs/PostPhonghoc', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaPhongHoc(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Phonghocs/PutPhonghoc', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })
    }
    deletePhongHoc(items) {
        console.log(items);
        return fetch('api/Phonghocs/DeletePhonghoc/' + items, {
            method: 'delete'
        })
    }
    //kỳ thi
    getKyThi() {
        return axios.get('api/Kythis/GetKythi')
            .then(res => res.data);
    }
    themKyThi(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Kythis/PostKythi', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaKyThi(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Kythis/PutKythi', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })
    }
    deleteKyThi(items) {
        console.log(items);
        return fetch('api/Kythis/DeleteKythi/' + items, {
            method: 'delete'
        })
    }

    //Quản lí điểm học sinh
    getQuanLiDiem() {
        return axios.get('api/Quanlidiems/GetQuanlidiem')
            .then(res => res.data);
    }
    themQuanLiDiem(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Quanlidiems/PostQuanlidiem', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaQuanLiDiem(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Quanlidiems/PutQuanlidiem', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })

    }
    deleteQuanLiDiem(items) {
        console.log(items);
        return fetch('api/Quanlidiems/DeleteQuanlidiem/' + items, {
            method: 'delete'
        })
    }

    //Giảng Dạy
    getGiangDay() {
        return axios.get('api/Giangdays/GetGiangday')
            .then(res => res.data);
    }
    getGiangDayFull() {
        return axios.get('api/Giangdays/GetGiangdayFull')
            .then(res => res.data);
    }
    themGiangDay(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Giangdays/PostGiangday', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaGiangDay(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Giangdays/PutGiangday', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })
    }
    deleteGiangDay(items,id) {
        console.log(items);
        return fetch('api/Giangdays/DeleteGiangday/' + items +','+ id , {
            method: 'delete'
        })
    }

    //Phân Công dạy học
    getPhanCong() {
        return axios.get('api/Phancongs/GetPhancong')
            .then(res => res.data);
    }
    getPhanCongID(items, items1, items2, items3) {
        return axios.get('api/Phancongs/GetPhancong/' + items + ',' + items1 + ',' + items2 + ',' + items3).then(res => res.data);
    }
    getPhanCongFull() {
        return axios.get('api/Phancongs/GetPhanCongFull')
            .then(res => res.data);
    }
    themPhanCong(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Phancongs/PostPhancong', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }
    suaPhanCong(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Phancongs/PutPhancong', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })
    }
    deletePhanCong(malop, malichhoc, magiaovien, maphong) {
        return fetch('api/Phancongs/DeletePhancong/' + malop + ',' + malichhoc + ',' + magiaovien + ',' + maphong, {
            method: 'delete'
        })
    }

    //Đăng kí học
    getDangKiHoc() {
        return axios.get('api/Dangkihocs/GetDangkihoc')
            .then(res => res.data);
    }

    getDangKiHocID(items, items1, items2, items3) {
        return axios.get('api/Dangkihocs/GetDangkihoc/' + items + ',' + items1 + ',' + items2 + ',' + items3).then(res => res.data);
    }

    getDangkiHocFull() {
        return axios.get('api/Dangkihocs/GetDangKiHocFull')
            .then(res => res.data);
    }

    themDangKiHoc(event) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Dangkihocs/PostDangkihoc', {
            method: 'POST',
            headers,
            body: JSON.stringify(event)
        })
    }

    suaDangKiHoc(items) {
        console.log(items);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/Dangkihocs/PutDangkihoc', {
            method: 'PUT',
            headers,
            body: JSON.stringify(items)
        })

    }
    deleteDangKiHoc(mahv, mabl, malop) {
        return fetch('api/Dangkihocs/DeleteDangkihoc/' + mahv + ',' + mabl + ',' + malop, {
            method: 'delete'
        })
    }

    //lọc danh sách lớp
    getDanhSachLopFilter(items) {
        return axios.get('api/Dangkihocs/DanhSachLop/' + items).then(res => res.data);
    }
    //lấy thông tin các lớp
    getThongTinCacLop() {
        return axios.get('api/Lops/ThongTinCacLop')
            .then(res => res.data);
    }

    getCountHocVien() {
        return axios.get('api/Lops/CountSinhVien').then(res => res.data);
    }
    getCountBienLai() {
        return axios.get('api/Bienlais/CountBienLai')
            .then(res => res.data);
    }

    //tổng số học viên của trung tâm
    getCountTongHocVien() {
        return axios.get('api/Hocviens/CountHocVien')
            .then(res => res.data);
    }
    //tổng số giáo viên của trung tâm
    getCountGiaoVien() {
        return axios.get('api/Giaoviens/CountGiaoVien')
            .then(res => res.data);
    }
    //tổng số nhân viên của trung tâm
    getCountNhanVien() {
        return axios.get('api/Nhanviens/CountNhanVien')
            .then(res => res.data);
    }
}