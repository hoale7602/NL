import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { CarService } from '../service/CarService';
import { Growl } from 'primereact/growl';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';


export class Dangkihoc extends Component {
    static displayName = Dangkihoc.name;

    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],//danh sách học viên trên state
            dataTableSelection: null,//giá trị khi select
            malop1:[],
            malop: '',  //mã lớp đăng kí học
            mahv: '',   //mã học viên
            email:'',   //email học viên
            mabl: '',   //biên lai của học viên đăng kí học
            manhanvien: '', //nhân viên lập biên lai
            ngaybl: '', //ngày lập biên lai
            noidung: '',    //nội dung biên lai
            sotien: '',     //số tiền thanh toán
            bangchu: '',    //số tiền viết bằng chữ
            dslop: [],      //danh sách các lớp đang giảng dạy
            dshocvien: [],  //danh sách học viên trong trung tâm
            display: false,//trạng thái dialog form
            value2: '',
            trangthailop: '',
            selectLop : [],
            ktra: false,
            globalFilter: null,//giá trị lọc
            showAddEdit: true,//trạng thái form edit và add
            sttThem: false,
            editInfo: {}//đối tượng cần chỉnh sửa hoặc xóa
        };
        this.service = new CarService();
        this.service.getLopTheoTrangThai().then(data => this.setState({ dslop: data }));
        this.service.getHocVien().then(data => this.setState({ dshocvien: data }));
    }
    componentDidMount() {
        this.loadData();
        this.service.getLopTheoTrangThai().then(data => console.log(data));
    }

    loadData = () => {
        this.service.getDangkiHocFull().then(data => this.setState({ dataTableValue: data }));
        
    }
    docso = (so) => {

        var mangso = ['Không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
        function dochangchuc(so, daydu) {
            var chuoi = "";
            var chuc = Math.floor(so / 10);
            var donvi = so % 10;
            if (chuc > 1) {
                chuoi = " " + mangso[chuc] + " mươi";
                if (donvi === 1) {
                    chuoi += " mốt";
                }
            } else if (chuc === 1) {
                chuoi = " mười";
                if (donvi === 1) {
                    chuoi += " một";
                }
            } else if (daydu && donvi > 0) {
                chuoi = " lẻ";
            }
            if (donvi === 5 && chuc > 1) {
                chuoi += " lăm";
            } else if (donvi > 1 || (donvi === 1 && chuc === 0)) {
                chuoi += " " + mangso[donvi];
            }
            return chuoi;
        }
        function docblock(so, daydu) {
            var chuoi = "";
            var tram = Math.floor(so / 100);
            var so = so % 100;
            if (daydu || tram > 0) {
                chuoi = " " + mangso[tram] + " trăm";
                chuoi += dochangchuc(so, true);
            } else {
                chuoi = dochangchuc(so, false);
            }
            return chuoi;
        }
        function dochangtrieu(so, daydu) {
            var chuoi = "";
            var trieu = Math.floor(so / 1000000);
            var so = so % 1000000;
            if (trieu > 0) {
                chuoi = docblock(trieu, daydu) + " triệu";
                daydu = true;
            }
            var nghin = Math.floor(so / 1000);
            so = so % 1000;
            if (nghin > 0) {
                chuoi += docblock(nghin, daydu) + " nghìn";
                daydu = true;
            }
            if (so > 0) {
                chuoi += docblock(so, daydu);
            }
            return chuoi;
        }

        if (so == 0) return mangso[0];
        var chuoi = "", hauto = "";
        do {
            var ty = so % 1000000000;
            so = Math.floor(so / 1000000000);
            if (so > 0) {
                chuoi = dochangtrieu(ty, true) + hauto + chuoi;
            } else {
                chuoi = dochangtrieu(ty, false) + hauto + chuoi;
            }
            hauto = " tỷ";
        } while (so > 0);
        return chuoi;

    }
   // hàm cập nhật giá trị khi thay đổi
    onChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        console.log(value);
        this.setState({
            [name]: value
        }
        );
    }
    onChangeLop = (event) => {
        var value = event.target.value;
        console.log(value);
        this.setState({
            selectLop: value,
        });
        var malop = [];
        if (value !== null) {
            value.forEach((val, key) => {
                malop[key] = val.malop;
            });
            console.log(malop.length);
            this.setState({ malop1: malop });
        }
        var dslop = this.state.dslop;
        console.log(dslop);
        if (value.length !== 0) {
            var sum = parseFloat(0);
            for (var i = 0; i < malop.length; i++) {
                for (var a = 0; a < dslop.length; a++) {
                    console.log(dslop[a].malop);
                    if (dslop[a].malop === malop[i]) {
                        console.log(malop[i]);
                        this.service.getMonHocID(dslop[a].mamonhoc).then(data => {          
                            sum += parseFloat(data.hocphi);
                            var str = this.docso(parseFloat(sum));
                            console.log(sum);
                                this.setState({
                                    sotien: sum,
                                    bangchu: str.charAt(1).toUpperCase() + str.slice(2) + " đồng."
                                })
                        });
                    }
                }
            }         
            var date = new Date();
            date.setHours(8);
            this.setState({
                ngaybl: date.toLocaleDateString()
            });
            console.log(value);
        } else if (value.length === 0) {
            this.setState({
                malop: '',
                sotien: '',
                bangchu:''
            });
        }
    }
    onChangeHocVien = (event) => {
        var value = event.target.value;
        if (value !== null) {
            this.state.dshocvien.forEach((val, key) => {
                if (val.mahv === value.mahv) {
                    this.setState({
                        mahv: val,
                        email: val.email
                    });
                    return;
                }
            });
            console.log(value);
        } else if (value === null) {
            this.setState({
                mahv: '',
                email:''
            });
        }
    }
    onChangeEditLop = (event) => {
        var value = event.target.value;
        console.log(value);
        if (value !== null) {
            this.state.dslop.forEach((val, key) => {
                if (val.malop === value.malop) {
                    this.setState({
                        malop: val,
                    });
                    this.service.getMonHocID(val.mamonhoc).then(data => {
                        var str = this.docso(parseFloat(data.hocphi));
                        this.setState({
                            sotien: data.hocphi,
                            bangchu: str.charAt(1).toUpperCase() + str.slice(2) + " đồng."
                        })
                    });
                    return;
                }
            });
            var date = new Date();
            date.setHours(8);
            this.setState({
                ngaybl: date.toLocaleDateString()
            });
            console.log(value);
        } else if (value === null) {
            this.setState({
                malop: ''
            });
        }
    }
    onSubmit = (event) => {
        event.preventDefault();
        var dslopdki = this.state.malop1;
        console.log(dslopdki);
        var check = true;
        this.state.dataTableValue.forEach((value, key) => {
            for (var i = 0; i < dslopdki.length; i++) {
                if (value.mahv === this.state.mahv.mahv && value.malop === dslopdki[i]) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Sinh viên đã tồn tại trong lớp ' + value.tenlop });
                    check = false;
                    return;
                }
            }
            });
            if (check === true) {
                this.service.getBienLaiTop().then(data => {
                    // var id = parseInt(data[0]) + 1;
                    var id = data + 1;
                    var item1 = {};
                    item1.mabl = "" + id;
                    item1.manhanvien = sessionStorage.getItem('manhanvien');//mã nhân viên
                    item1.sotien = this.state.sotien;
                    item1.noidung = this.state.noidung;
                    item1.bangchu = this.state.bangchu;
                    item1.ngaybl = new Date();
                    item1.ngaybl.setHours(8);
                    console.log(item1);
                    this.service.themBienLai(item1).then((response) => {
                        if (response.ok) {
                            this.setState({ mabl: item1.mabl });
                            var item = {};
                            // var check = true;
                            item.malop = this.state.malop.malop;
                            item.mahv = this.state.mahv.mahv;
                            item.mabl = item1.mabl;
                            for (var i = 0; i < dslopdki.length; i++) {
                                item.malop = dslopdki[i];
                                this.service.themDangKiHoc(item).then((response) => {
                                    if (response.ok) {
                                        console.log("ok");
                                        this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Thêm Thành Công' });
                                        this.setState({ display: false });
                                        this.loadData();
                                        return response.json();
                                    }
                                    else {
                                        this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Thêm Thất Bại' });
                                    }
                                });
                            }
                        } else console.log("lỗi thêm bl");
                    });
                });
            }
    }
    addHocVien = () => {
        var dialogFooter = (
            <div>
                <Button icon="pi pi-check" onClick={(event) => this.onSubmit(event)} label="Thêm" disabled={this.state.sttThem} />
                <Button icon="pi pi-times" onClick={() => this.setState({ display: false })} label="Hủy" className="p-button-secondary" />
            </div>
        );
        var header = "THÊM HỌC VIÊN VÀO LỚP";

        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="mahv" value={this.state.mahv} options={this.state.dshocvien} ariaLabel="Test" onChange={this.onChangeHocVien} placeholder="Chọn Học Viên"
                            optionLabel="hotenhv" optionValue="mahv" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <MultiSelect id="multiselect" placeholder="Chọn Lớp" value={this.state.selectLop} options={this.state.dslop} optionLabel="tenlop" optionValue="malop" onChange={event => this.onChangeLop(event)} showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="email" size="70" value={this.state.email} disabled />
                        <label htmlFor="email">Email</label>
                    </span>
                </div>

                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="ngaydk" size="70" value={this.state.ngaybl} disabled />
                        <label htmlFor="ngaydk">Ngày Đăng Kí</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="sotien" size="70" value={this.state.sotien} disabled />
                        <label htmlFor="sotien">Số Tiền</label>
                    </span>
                </div>

                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="bangchu" size="70" value={this.state.bangchu} disabled />
                        <label htmlFor="bangchu">Bằng Chữ</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputTextarea tooltip="Nội Dung" rows={2} cols={30} id="noidung" name="noidung" value={this.state.noidung} onChange={(e) => this.onChange(e)} autoResize={true} />
                    </span>
                </div>

            </Dialog>

        </div>;
    }
    EditMember = () => {

        var dialogFooter = (
            <div>
                <Button icon="pi pi-check" label="Save" onClick={event => this.saveEdit(event)} />
                <Button icon="pi pi-times" onClick={() => this.setState({ display: false })} label="Hủy" className="p-button-secondary" />
            </div>
        );
        var header = "SỬA ĐĂNG KÍ";


        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown disabled filter={true} name="mahv" value={this.state.mahv} options={this.state.dshocvien} ariaLabel="Test" onChange={this.onChangeHocVien} placeholder="Chọn Học Viên"
                            optionLabel="hotenhv" optionValue="mahv" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="malop" value={this.state.malop} options={this.state.dslop} ariaLabel="Test" onChange={this.onChangeEditLop} placeholder="Chọn Lớp"
                            optionLabel="tenlop" optionValue="malop" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="email" size="70" value={this.state.email} disabled />
                        <label htmlFor="email">Email</label>
                    </span>
                </div>

                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="ngaydk" size="70" value={this.state.ngaybl} disabled />
                        <label htmlFor="ngaydk">Ngày Đăng Kí</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="sotien" size="70" value={this.state.sotien} disabled />
                        <label htmlFor="sotien">Số Tiền</label>
                    </span>
                </div>

                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="bangchu" size="70" value={this.state.bangchu} disabled />
                        <label htmlFor="bangchu">Bằng Chữ</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputTextarea tooltip="Nội Dung" rows={2} cols={30} id="noidung" name="noidung" value={this.state.noidung} onChange={(e) => this.onChange(e)} autoResize={true} />
                    </span>
                </div>

            </Dialog>

        </div>;
    }
    renderHeader() {
        return (
            <div>
                ĐĂNG KÍ LỚP HỌC
                <div className="p-col-12 p-md-4" style={{ textAlign: 'left' }}>
                    <div className="p-datatable-globalfilter-container">
                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Search" />
                    </div>
                </div>
            </div>
        );
    }
    //hàm lấy thông tin chỉnh sửa của 1 đối tượng

    Edit = (event) => {
        this.state.dslop.forEach((val, i) => {
            if (val.malop === event.value.malop) {
                this.setState({
                    malop: val
                });
                return;
            }
        });
        this.state.dshocvien.forEach((val, i) => {
            if (val.mahv === event.value.mahv) {
                this.setState({
                    mahv: val,
                    email: event.value.email
                });
                return;
            }
        });
        this.service.getBienLaiID(event.value.mabl).then(data => {
            var date = new Date(data.ngaybl);
            var ngay = date.toLocaleDateString();
            this.setState({
                sotien: data.sotien,
                noidung: data.noidung,
                ngaybl: ngay,
                bangchu: data.bangchu,
                mabl: data.mabl
            });
        });
        this.setState({
            dataTableSelection: event.value,
            editInfo: event.value         
        });
    }
    //hàm hiển thị form thêm
    showThem = () => {
        this.setState({
            display: true,
            showAddEdit: true,  //hiển thị form thêm
            malop: '',
            mahv: '',
            mabl: '',
            mahv: '',
            email: '',
            ngaybl: '',
            noidung: '',
            sotien: '',
            bangchu: '',
            malop1: [],
            selectLop: []
        });
    }
    //hiểm thị form edit
    showEdit = () => {
        this.setState({
            display: true,
            showAddEdit: false,   //hiển thị form edit
            maloptxt: this.state.editInfo.malop,
            mabltxt: this.state.editInfo.mabl,
            magiaovientxt: this.state.editInfo.magiaovien,
            mahvtxt: this.state.editInfo.mahv
        });
    }
    //hiển thị form add or edit khi render
    showAddandEdit = () => {
        if (this.state.showAddEdit === true) {
            return this.addHocVien();
        }
        else if (this.state.showAddEdit === false) {
            return this.EditMember();
        }

    }
    //lưu đối tượng được chỉnh sửa
    saveEdit = (event) => {
        event.preventDefault();
        var item = {};
        item.malop = this.state.malop.malop;
        item.mahv = this.state.mahv.mahv;
        item.mabl = this.state.mabl;
        console.log(item);
        var check = true;
            this.state.dataTableValue.forEach((value, key) => {
                if (value.mahv === item.mahv && value.malop === item.malop) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Sinh viên đã tồn tại trong lớp' });
                    check = false;
                    return;
                }
            });
            if (check) {
                this.service.deleteDangKiHoc(this.state.editInfo.mahv, this.state.editInfo.mabl, this.state.editInfo.malop).then((response) => {
                    if (response.ok) {
                        console.log("xóa ok");
                        this.service.themDangKiHoc(item).then((response) => {
                            if (response.ok) {
                                console.log("ok");
                                this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Sửa Thành Công' });
                                this.setState({ display: false });
                                this.loadData();
                                return response.json();
                            }
                            else {
                                this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Sửa Thất Bại' });
                            }
                        });
                    }
                });
            }
        
    }
    // xóa đối tượng được chọn
    onClickDelete = () => {
        this.service.deleteDangKiHoc(this.state.editInfo.mahv, this.state.editInfo.mabl, this.state.editInfo.malop).then((response) => {
            if (response.ok) {
                this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Xóa Thành Công' });
                this.loadData();
                return response.json();
            }
            else {
                this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Xóa Thất Bại' });

            }
        });

    }
    render() {
        let cols = [
            { field: 'malop', header: 'Mã Lớp' },
            { field: 'tenlop', header: 'Tên Lớp' },
            { field: 'mabl', header: 'Mã Biên Lai' },
            { field: 'mahv', header: 'Mã Học Viên' },
            { field: 'hotenhv', header: 'Tên Học Viên' },
            { field: 'email', header: 'Email' }
        ];

        let dynamicColumns = cols.map((col, i) => {

            return <Column key={col.field} field={col.field} header={col.header} sortable={true} />;
        });
        const header = this.renderHeader();


        return (
            <div className="p-fluid">
                <div className="p-grid p-fluid dashboard">
                    <div className="p-col-12 p-lg-3">
                        <Button icon="pi pi-plus" label="Thêm" onClick={this.showThem} />
                    </div>
                    <div className="p-col-12 p-lg-3">
                        <Button label="Sửa" icon="pi pi-pencil" className="p-button-info" onClick={this.showEdit} />
                    </div>
                    <div className="p-col-12 p-lg-3">
                        <Button label="Xóa" icon="pi pi-times" className="p-button-danger" onClick={this.onClickDelete} />
                    </div>

                </div>
                <Growl ref={(el) => this.growl = el} />
                {this.showAddandEdit()}
                <div className="p-grid">

                    <div className="p-col-12">
                        <div className="card card-w-title">
                            <div className="content-section implementation">
                                <DataTable className="p-datatable-customers" rowHover globalFilter={this.state.globalFilter} emptyMessage="Không tìm thấy thông tin phù hợp" paginator={true}
                                    rows={10} responsive={true} value={this.state.dataTableValue} header={header} rowsPerPageOptions={[5, 10, 15, 30]} selectionMode="single" selection={this.state.dataTableSelection}
                                    onSelectionChange={event => this.Edit(event)} paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                                    {dynamicColumns}
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}