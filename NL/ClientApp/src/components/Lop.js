import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { CarService } from '../service/CarService';
import { Growl } from 'primereact/growl';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export class Lop extends Component {
    static displayName = Lop.name;

    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],//danh sách học viên trên state
            dataTableSelection: null,//giá trị khi select
            malop: '',
            manhom: '',
            mamonhoc: '',
            tenlop: '',
            sisodk:'',
            ngaybd: '',
            ngaykt: '',
            trangthai: '',
            display: false,//trạng thái dialog form
            value2: '',
            dsnhom: [],//danh sách các nhóm lớp
            dsmonhoc:[],//danh sách môn học
            tendonvi: '',
            globalFilter: null,//giá trị lọc
            showAddEdit: true,//trạng thái form edit và add
            sttThem: false,
            minDate: '',
            maxDate:'',
            editInfo: {}//đối tượng cần chỉnh sửa hoặc xóa
        };
        this.service = new CarService();
        this.service.getNhomLop().then(data => this.setState({ dsnhom: data }));
        this.service.getMonHoc().then(data => this.setState({ dsmonhoc: data }));

    }
    componentDidMount() {
        this.loadData();

    }

    loadData = () => {
        this.service.getLop().then(data => {
            var obj = JSON.parse(JSON.stringify(data));
            console.log(obj);
            obj.map((value, i) => {
                var date = new Date(obj[i].ngaybd);
                var date1 = new Date(obj[i].ngaykt);
                value.ngaybd = date.toLocaleDateString();
                value.ngaykt = date1.toLocaleDateString();
                if (value.trangthai === true) {
                    value.trangthai = "Mở đăng kí";
                }
                if (value.trangthai === false) {
                    value.trangthai = "Đóng đăng kí";
                }
                return null;
            });
            //      console.log(obj);
            this.setState({ dataTableValue: obj })
        });
    }
    onChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        console.log(value);
        this.setState({
            [name]: value
        }
        );
    }
    onChangeNhom = (event) => {
        console.log(event.value.manhom);
        var value = event.target.value;
        this.setState({
            manhom: value
        }
        );
        console.log(value);
    }
    onChangeMonHoc = (event) => {
        console.log(event.value.mamonhoc);
        var value = event.target.value;
        this.service.getMonHocID(event.value.mamonhoc).then(data => {
            this.getNgay(data);
        });
        this.setState({
            mamonhoc: value
        }
        );
        console.log(value);
    }

    onchangeNgay = (event) => {
        var value = event.target.value;
        var ngay = new Date(value);
        const name = event.target.name;
        ngay.setHours(8);
        console.log(ngay);
        this.setState({
            [name]: ngay
        });
 
    }
    onSubmit = (event) => {
        event.preventDefault();
        var item = {};
        var check = true;
        item.malop = this.state.malop;
        item.manhom = this.state.manhom.manhom;
        item.mamonhoc = this.state.mamonhoc.mamonhoc;
        item.tenlop = this.state.tenlop;
        item.sisodk = parseInt(this.state.sisodk);
        var ngaybd = this.state.ngaybd.toString();
        var ngaykt = this.state.ngaykt.toString();
        var e = ngaybd.split("/", 3);
        var e1 = ngaykt.split("/", 3);
        console.log(e);
        if (e.length === 3) {
            item.ngaybd = new Date(e[2], e[1], e[0], 8);
        }
        else {
            item.ngaybd = this.state.ngaybd;
        }
        if (e1.length === 3) {
            item.ngaykt = new Date(e1[2], e1[1], e1[0], 8);
        }
        else {
            item.ngaykt = this.state.ngaykt;
        }
        //item.ngaybd = this.state.ngaybd;
        //item.ngaykt = this.state.ngaykt;
        item.trangthai = Boolean(this.state.trangthai);
        console.log(item);
        this.setState({ display: false })
        if (item.malop.length < 7) {
            this.state.dataTableValue.forEach((value, key) => {
                if (value.malop === item.malop) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                    check = false;
                    return;
                }
            });
            console.log(check);
            if (check === true) {
                this.service.themLop(item).then((response) => {
                    if (response.ok) {
                        console.log("ok");
                        this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Thêm Thành Công' });
                        this.loadData();
                        return response.json();
                    }
                    else {

                        this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Thêm Thất Bại' });
                    }
                }).catch(err => console.log(err));
            }
        }
    }
    ////Hàm kiểm tra số điện thoại
    //IsMobileNumber = (txtMobId) => {
    //    var vnf_regex = /((086|096|097|098|032|033|034|035|036|037|038|039|089|090|093|070|079|077|076|078|088|091|094|083|084|085|081|082)+([0-9]{7})\b)/g;
    //    console.log(txtMobId);
    //    if (vnf_regex.test(txtMobId) === false) {
    //        this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Số Điện Thoại Sai Định Dạng!!!' });
    //        return false;
    //    }
    //    return true;
    //}
    ////Hàm kiểm tra địa chỉ email
    //emailIsValid = (email) => {
    //    var eml = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //    if (eml.test(email) === false) {
    //        this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'EMAIL Sai Định Dạng!!!' });
    //        return false;
    //    }
    //    return true;
    //}

    addGiaoVien = () => {
        var dialogFooter = (
            <div>
                <Button icon="pi pi-check" onClick={(event) => this.onSubmit(event)} label="Thêm" disabled={this.state.sttThem} />
                <Button icon="pi pi-times" onClick={() => this.setState({ display: false })} label="Hủy" className="p-button-secondary" />
            </div>
        );
        var header = "THÊM GIÁO VIÊN";

        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="malop" size="70" type="text" name="malop" value={this.state.malop} onChange={event => this.onChange(event)} />
                        <label htmlFor="malop">Mã Lớp</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown tooltip="Chọn Nhóm" value={this.state.manhom} options={this.state.dsnhom} ariaLabel="Test" onChange={this.onChangeNhom} placeholder="Select Nhóm Lớp" optionLabel="tennhom" optionValue="manhom" />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown tooltip="Chọn Môn Học" value={this.state.mamonhoc} options={this.state.dsmonhoc} ariaLabel="Test" onChange={this.onChangeMonHoc} placeholder="Select Môn Học" optionLabel="tenmonhoc" optionValue="mamonhoc" />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="tenlop" size="70" type="text" name="tenlop" value={this.state.tenlop} onChange={event => this.onChange(event)} />
                        <label htmlFor="tenlop">Tên Lớp</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <Calendar readOnlyInput minDate={this.state.minDate} maxDate={this.state.maxDate} dateFormat="dd/mm/yy" id="ngaybd" name="ngaybd" value={this.state.ngaybd} onChange={event => this.onchangeNgay(event)} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
                        <label htmlFor="ngaybd">Ngày BĐ</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <Calendar readOnlyInput minDate={this.state.minDate} maxDate={this.state.maxDate} dateFormat="dd/mm/yy" id="ngaykt" name="ngaykt" value={this.state.ngaykt} onChange={event => this.onchangeNgay(event)} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
                        <label htmlFor="ngaykt">Ngày KT</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText keyfilter="int" id="sisodk" name="sisodk" value={this.state.sisodk} onChange={event => this.onChange(event)} />
                        <label htmlFor="sisodk">Sỉ Số</label>
                    </span>
                </div>
                <div className="p-grid">
                    <div className="p-col-12 p-md-3">
                        <label>Trạng Thái</label>
                    </div>
                    <div className="p-col-12 p-md-3">
                        <RadioButton name="trangthai" value={true} inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.trangthai === true} />
                        <label htmlFor="rb1" className="p-radiobutton-label">Mở Đăng Kí</label>
                    </div>
                    <div className="p-col-12 p-md-3">
                        <RadioButton name="trangthai" value={false} inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.trangthai === false} />
                        <label htmlFor="rb1" className="p-radiobutton-label">Đóng Đăng Kí</label>
                    </div>
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
        var header = "SỬA GIÁO VIÊN";


        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="malop" size="70" type="text" name="malop" value={this.state.malop} onChange={event => this.onChange(event)} />
                        <label htmlFor="malop">Mã Lớp</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown tooltip="Chọn Nhóm" value={this.state.manhom} options={this.state.dsnhom} ariaLabel="Test" onChange={this.onChangeNhom} placeholder="Select Nhóm Lớp" optionLabel="tennhom" optionValue="manhom" />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown tooltip="Chọn Môn Học" value={this.state.mamonhoc} options={this.state.dsmonhoc} ariaLabel="Test" onChange={this.onChangeMonHoc} placeholder="Select Môn Học" optionLabel="tenmonhoc" optionValue="mamonhoc" />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="tenlop" size="70" type="text" name="tenlop" value={this.state.tenlop} onChange={event => this.onChange(event)} />
                        <label htmlFor="tenlop">Tên Lớp</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <Calendar readOnlyInput minDate={this.state.minDate} maxDate={this.state.maxDate} dateFormat="dd/mm/yy" id="ngaybd" name="ngaybd" value={this.state.ngaybd} onChange={event => this.onchangeNgay(event)} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
                        <label htmlFor="ngaybd">Ngày BĐ</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <Calendar readOnlyInput minDate={this.state.minDate} maxDate={this.state.maxDate} dateFormat="dd/mm/yy" id="ngaykt" name="ngaykt" value={this.state.ngaykt} onChange={event => this.onchangeNgay(event)} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
                        <label htmlFor="ngaykt">Ngày KT</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText keyfilter="int" id="sisodk" name="sisodk" value={this.state.sisodk} onChange={event => this.onChange(event)} />
                        <label htmlFor="sisodk">Sỉ Số</label>
                    </span>
                </div>
                <div className="p-grid">
                    <div className="p-col-12 p-md-3">
                        <label>Trạng Thái</label>
                    </div>
                    <div className="p-col-12 p-md-3">
                        <RadioButton name="trangthai" value={true} inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.trangthai === true} />
                        <label htmlFor="rb1" className="p-radiobutton-label">Mở Đăng Kí</label>
                    </div>
                    <div className="p-col-12 p-md-3">
                        <RadioButton name="trangthai" value={false} inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.trangthai === false} />
                        <label htmlFor="rb1" className="p-radiobutton-label">Đóng Đăng Kí</label>
                    </div>
                </div>
            </Dialog>

        </div>;
    }
    renderHeader() {
        return (
            <div>
                DANH SÁCH GIÁO VIÊN
                <div className="p-col-12 p-md-4" style={{ textAlign: 'left' }}>
                    <div className="p-datatable-globalfilter-container">
                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Giáo Viên Search" />
                    </div>
                </div>
            </div>
        );
    }

    getNgay = (e) => {
        console.log(e);
        this.service.getKhoaHocID(e.makhoahoc).then(data => {
            var date = new Date(data.ngaybd);           
            var date1 = new Date(data.ngaykt);
            this.setState({
                ngaybd: date.toLocaleDateString(),
                ngaykt: date1.toLocaleDateString(),
                minDate: date,
                maxDate: date1
            });
        });
    }

    //hàm lấy thông tin chỉnh sửa của 1 đối tượng
    Edit = (event) => {
        console.log(event);
        console.log(event.value);
        //this.service.getMonHocID(event.value.mamonhoc).then(data => {
        //    this.getNgay(data);
        //});

        this.state.dsnhom.forEach((val, i) => {
            if (val.manhom === event.value.manhom) {
                this.setState({ manhom: val });
                return;
            }
        });
        this.state.dsmonhoc.forEach((val, i) => {
            if (val.mamonhoc === event.value.mamonhoc) {
                this.setState({ mamonhoc: val });
                return;
            }
        });

        if (event.value.trangthai === "Mở đăng kí") {
            this.setState({ trangthai: true });
        }
        if (event.value.trangthai === "Đóng đăng kí") {
            this.setState({ trangthai: false });
        }

        this.setState({
            malop: event.value.malop,
          //  mamonhoc: event.value.mamonhoc,
            tenlop: event.value.tenlop,
            sisodk: event.value.sisodk,
            ngaybd: event.value.ngaybd,
            ngaykt: event.value.ngaykt,
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
            manhom: '',
            mamonhoc: '',
            tenlop: '',
            sisodk:'',
            ngaybd: '',
            ngaykt: '',
            trangthai: ''
        });
    }
    //hiểm thị form edit
    showEdit = () => {
        this.setState({
            display: true,
            showAddEdit: false   //hiển thị form edit
        });
    }
    //hiển thị form add or edit khi render
    showAddandEdit = () => {
        if (this.state.showAddEdit === true) {
            return this.addGiaoVien();
        }
        else if (this.state.showAddEdit === false) {
            return this.EditMember();
        }

    }
    //lưu đối tượng được chihr sửa
    saveEdit = (event) => {
        event.preventDefault();
        var item = {};
        item.malop = this.state.malop;
        item.manhom = this.state.manhom.manhom;
        item.mamonhoc = this.state.mamonhoc.mamonhoc;
        item.tenlop = this.state.tenlop;
        item.sisodk = parseInt(this.state.sisodk);
        var ngaybd = this.state.ngaybd.toString();
        var ngaykt = this.state.ngaykt.toString();
        var e = ngaybd.split("/", 3);
        var e1 = ngaykt.split("/", 3);
        console.log(e); console.log(e1);
        if (e.length === 3) {
            item.ngaybd = new Date(e[2], e[1] - 1, e[0], 8);
            console.log(item.ngaybd);
        }
        else {
            item.ngaybd = this.state.ngaybd;
        }
        if (e1.length === 3) {
            item.ngaykt = new Date(e1[2], e1[1] - 1, e1[0], 8);
            console.log(item.ngaykt);
        }
        else {
            item.ngaykt = this.state.ngaykt;
        }
        item.trangthai = Boolean(this.state.trangthai);
       
        console.log(item);
        this.service.suaLop(item).then((response) => {
            if (response.ok) {
                console.log("ok");
                this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Sửa Thành Công' });
                this.setState({ display: false });
                this.loadData();
            }
            else {
                console.log(response.errors);
                this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Sửa Thất Bại' });

            }
        });


    }
    // xóa đối tượng được chọn
    onClickDelete = () => {
        var items = this.state.dataTableValue.filter(temp => temp.malop !== this.state.editInfo.malop);
        console.log(items);
        this.service.deleteLop(this.state.editInfo.malop).then((response) => {
            if (response.ok) {
                this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Xóa Thành Công' });
                this.setState({ dataTableValue: items });
                return response.json();
            }
            else {
                this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Xóa Thất Bại' });

            }
        });

    }
    //hàm lấy lại mật khẩu
    layMatKhau = () => {
        console.log(this.state.editInfo);
        alert("Tên tài khoản: " + this.state.editInfo.taikhoangv + "\n Mật Khẩu:" + this.state.editInfo.matkhau);
    }
    render() {
        let cols = [
            { field: 'malop', header: 'Mã Lớp' },
            { field: 'manhom', header: 'Mã Nhóm' },
            { field: 'mamonhoc', header: 'Mã Môn Học' },
            { field: 'tenlop', header: 'Tên Lớp' },
            { field: 'sisodk', header: 'Sỉ Số' },
            { field: 'ngaybd', header: 'Ngày BĐ' },
            { field: 'ngaykt', header: 'Ngày KT' },
            { field: 'trangthai', header: 'Trạng Thái' }
            //   { field: 'taikhoangv', header: 'taikhoangv' },
            //  { field: 'matkhau', header: 'MATKHAU' }
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
