import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { CarService } from '../service/CarService';
import { Growl } from 'primereact/growl';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export class NhanVien extends Component {
    static displayName = NhanVien.name;

    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],//danh sách học viên trên state
            dataTableSelection: null,//giá trị khi select
            manhanvien: '',
            tennv: '',
            diachi: '',
            sodt: '',
            gioitinh: '',
            email: '',
            taikhoan: '',
            matkhau: '',
            quyen: '',
            display: false,//trạng thái dialog form
            value2: '',
            globalFilter: null,//giá trị lọc
            showAddEdit: true,//trạng thái form edit và add
            sttThem: false,
            editInfo: {}//đối tượng cần chỉnh sửa hoặc xóa
        };
        this.service = new CarService();
        

    }
    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        
        this.service.getNhanVien().then(data => {
            var obj = JSON.parse(JSON.stringify(data));
            console.log(obj);
            obj.map((value, i) => {
                if (value.gioitinh === true) {
                    value.gioitinh = "Nam";
                }
                if (value.gioitinh === false) {
                    value.gioitinh = "Nữ";
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
    onChangeNgaySinh = (event) => {
        var value = event.target.value;
        var ngay = new Date(value);
        ngay.setHours(8);
        console.log(ngay);
        this.setState({
            ngaysinh: ngay
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        var item = {};
        var check = true;
        let r = Math.random().toString(36).substring(7);
        console.log("random", r);
        item.manhanvien = this.state.manhanvien;
        item.tennv = this.state.tennv;
        item.gioitinh = Boolean(this.state.gioitinh);
        item.diachi = this.state.diachi;
        item.email = this.state.email;
        item.sodt = parseInt(this.state.sodt);
        item.taikhoan = this.state.manhanvien;
        item.matkhau = r;
        item.quyen = this.state.quyen;
        console.log(item);
        this.setState({ display: false })
        if (item.manhanvien.length < 7) {
            this.state.dataTableValue.forEach((value, key) => {
                if (value.manhanvien === item.manhanvien) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                    check = false;
                    return;
                }
            });
            console.log(check);
            if (check === true) {
                this.service.themNhanVien(item).then((response) => {
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
    //Hàm kiểm tra số điện thoại
    IsMobileNumber = (txtMobId) => {
        var vnf_regex = /((086|096|097|098|032|033|034|035|036|037|038|039|089|090|093|070|079|077|076|078|088|091|094|083|084|085|081|082)+([0-9]{7})\b)/g;
        console.log(txtMobId);
        if (vnf_regex.test(txtMobId) === false) {
            this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Số Điện Thoại Sai Định Dạng!!!' });
            return false;
        }
        return true;
    }
    //Hàm kiểm tra địa chỉ email
    emailIsValid = (email) => {
        var eml = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (eml.test(email) === false) {
            this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'EMAIL Sai Định Dạng!!!' });
            return false;
        }
        return true;
    }

    addGiaoVien = () => {
        var dialogFooter = (
            <div>
                <Button icon="pi pi-check" onClick={(event) => this.onSubmit(event)} label="Thêm" disabled={this.state.sttThem} />
                <Button icon="pi pi-times" onClick={() => this.setState({ display: false })} label="Hủy" className="p-button-secondary" />
            </div>
        );
        var header = "THÊM NHÂN VIÊN";

        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="manhanvien" size="70" type="text" name="manhanvien" value={this.state.manhanvien} onChange={event => this.onChange(event)} />
                        <label htmlFor="manhanvien">Mã Nhân Viên</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="tennv" size="70" type="text" name="tennv" value={this.state.tennv} onChange={event => this.onChange(event)} />
                        <label htmlFor="tennv">Tên Nhân Viên</label>
                    </span>
                </div>
                <div className="p-grid">
                    <div className="p-col-12 p-md-3">
                        <label>Giới Tính</label>
                    </div>
                    <div className="p-col-12 p-md-3">
                        <RadioButton name="gioitinh" value={true} inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.gioitinh === true} />
                        <label htmlFor="rb1" className="p-radiobutton-label">Nam</label>
                    </div>
                    <div className="p-col-12 p-md-3">
                        <RadioButton name="gioitinh" value={false} inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.gioitinh === false} />
                        <label htmlFor="rb1" className="p-radiobutton-label">Nữ</label>
                    </div>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="diachi" size="70" type="text" name="diachi" value={this.state.diachi} onChange={event => this.onChange(event)} />
                        <label htmlFor="diachi">Địa Chỉ</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText onBlur={event => this.emailIsValid(this.state.email)} id="email" size="70" type="text" name="email" value={this.state.email} onChange={event => this.onChange(event)} />
                        <label htmlFor="email">Email</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText onBlur={event => this.IsMobileNumber(this.state.sodt)} keyfilter="int" id="sodt" name="sodt" value={this.state.sodt} onChange={event => this.onChange(event)} />
                        <label htmlFor="sodt">Số Điện Thoại</label>
                    </span>
                </div>

                <div className="p-grid">
                    <div className="p-col-12 p-md-3">
                        <label>Quyền</label>
                    </div>
                    <div className="p-col-12 p-md-3">
                        <RadioButton name="quyen" value="Admin" inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.quyen === "Admin"} />
                        <label htmlFor="rb1" className="p-radiobutton-label">Admin</label>
                    </div>
                    <div className="p-col-12 p-md-3">
                        <RadioButton name="quyen" value="Nhân Viên" inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.quyen === "Nhân Viên"} />
                        <label htmlFor="rb1" className="p-radiobutton-label">Nhân Viên</label>
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
        var header = "SỬA NHÂN VIÊN";


        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText disabled id="manhanvien" size="70" type="text" name="manhanvien" value={this.state.manhanvien} onChange={event => this.onChange(event)} />
                        <label htmlFor="manhanvien">Mã Nhân Viên</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="tennv" size="70" type="text" name="tennv" value={this.state.tennv} onChange={event => this.onChange(event)} />
                        <label htmlFor="tennv">Tên Nhân Viên</label>
                    </span>
                </div>
                <div className="p-grid">
                    <div className="p-col-12 p-md-3">
                        <label>Giới Tính</label>
                    </div>
                    <div className="p-col-12 p-md-3">
                        <RadioButton name="gioitinh" value={true} inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.gioitinh === true} />
                        <label htmlFor="rb1" className="p-radiobutton-label">Nam</label>
                    </div>
                    <div className="p-col-12 p-md-3">
                        <RadioButton name="gioitinh" value={false} inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.gioitinh === false} />
                        <label htmlFor="rb1" className="p-radiobutton-label">Nữ</label>
                    </div>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="diachi" size="70" type="text" name="diachi" value={this.state.diachi} onChange={event => this.onChange(event)} />
                        <label htmlFor="diachi">Địa Chỉ</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText onBlur={event => this.emailIsValid(this.state.email)} id="email" size="70" type="text" name="email" value={this.state.email} onChange={event => this.onChange(event)} />
                        <label htmlFor="email">Email</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText onBlur={event => this.IsMobileNumber(this.state.sodt)} keyfilter="int" id="sodt" name="sodt" value={this.state.sodt} onChange={event => this.onChange(event)} />
                        <label htmlFor="sodt">Số Điện Thoại</label>
                    </span>
                </div>

                <div className="p-grid">
                    <div className="p-col-12 p-md-3">
                        <label>Quyền</label>
                    </div>
                    <div className="p-col-12 p-md-3">
                        <RadioButton name="quyen" value="Admin" inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.quyen === "Admin"} />
                        <label htmlFor="rb1" className="p-radiobutton-label">Admin</label>
                    </div>
                    <div className="p-col-12 p-md-3">
                        <RadioButton name="quyen" value="Nhân Viên" inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.quyen === "Nhân Viên"} />
                        <label htmlFor="rb1" className="p-radiobutton-label">Nhân Viên</label>
                    </div>
                </div>
            </Dialog>

        </div>;
    }
    renderHeader() {
        return (
            <div>
                DANH SÁCH NHÂN VIÊN
                <div className="p-col-12 p-md-4" style={{ textAlign: 'left' }}>
                    <div className="p-datatable-globalfilter-container">
                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Giáo Viên Search" />
                    </div>
                </div>
            </div>
        );
    }
    //hàm lấy thông tin chỉnh sửa của 1 đối tượng
    Edit = (event) => {
        console.log(event);
        console.log(event.value);

        if (event.value.gioitinh === "Nam") {
            this.setState({ gioitinh: true });
        }
        if (event.value.gioitinh === "Nữ") {
            this.setState({ gioitinh: false });
        }

        this.setState({
            manhanvien: event.value.manhanvien,
            tennv: event.value.tennv,
            ngaysinh: event.value.ngaysinh,
            diachi: event.value.diachi,
            sodt: event.value.sodt,
            email: event.value.email,
            taikhoan: event.value.taikhoan,
            matkhau: event.value.matkhau,
            quyen: event.value.quyen,
            dataTableSelection: event.value,
            editInfo: event.value
        });
    }
    //hàm hiển thị form thêm
    showThem = () => {
        this.setState({
            display: true,
            showAddEdit: true,  //hiển thị form thêm
            manhanvien: '',
            madonvigv: '',
            tennv: '',
            ngaysinh: '',
            diachi: '',
            sodt: '',
            gioitinh: '',
            email: '',
            taikhoan: '',
            matkhau: '',
            quyen: ''
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
        item.manhanvien = this.state.manhanvien;
        item.tennv = this.state.tennv;
        item.diachi = this.state.diachi;
        item.sodt = parseInt(this.state.sodt);
        item.gioitinh = Boolean(this.state.gioitinh);
        item.email = this.state.email;
        item.taikhoan = this.state.taikhoan;
        item.matkhau = this.state.matkhau;
        item.quyen = this.state.quyen;
        console.log(item);
        this.service.suaNhanVien(item).then((response) => {
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
        var items = this.state.dataTableValue.filter(temp => temp.manhanvien !== this.state.editInfo.manhanvien);
        console.log(items);
        this.service.deleteNhanVien(this.state.editInfo.manhanvien).then((response) => {
            if (response.ok) {
                this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Xóa Thành Công' });
                this.setState({ dataTableValue: items });
                return response.json();
            }
            else {
                this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Xóa Thất Bại' });

            }
        });;

    }
    //hàm lấy lại mật khẩu
    layMatKhau = () => {
        console.log(this.state.editInfo);
        var item = {};
        let r = Math.random().toString(36).substring(7);

        item.manhanvien = this.state.editInfo.manhanvien;
        item.tennv = this.state.editInfo.tennv;
        item.diachi = this.state.editInfo.diachi;
        item.sodt = parseInt(this.state.editInfo.sodt);
        item.gioitinh = Boolean(this.state.editInfo.gioitinh);
        item.email = this.state.editInfo.email;
        item.taikhoan = this.state.editInfo.taikhoan;
        item.matkhau = r;
        item.quyen = this.state.editInfo.quyen;
        this.service.suaNhanVien(item).then((response) => {
            if (response.ok) {
                this.service.sendMail(item.manhanvien);
                console.log("ok");
                this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Cấp lại Mật Khẩu Thành Công' });
                this.loadData();
            }
            else {
                console.log(response.errors);
                this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Cấp Mật Khẩu Thất Bại' });

            }
        });
      //  this.service.sendMail(this.state.editInfo.manhanvien);
       // alert("Tên tài khoản: " + this.state.editInfo.taikhoan + "\n Mật Khẩu:" + this.state.editInfo.matkhau);
    }
    render() {
        let cols = [
            { field: 'manhanvien', header: 'Mã NV' },
            { field: 'tennv', header: 'Họ Tên' },
            { field: 'gioitinh', header: 'G.Tính' },
            { field: 'diachi', header: 'Địa Chỉ' },
            { field: 'sodt', header: 'Số DT' },
            { field: 'email', header: 'EMAIL' },
            { field: 'quyen', header: 'Quyền' }
            //   { field: 'taikhoan', header: 'taikhoan' },
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
                    <div className="p-col-12 p-lg-3">
                        <Button label="Lấy Mật Khẩu" icon="pi pi-key" className="p-button-info" onClick={this.layMatKhau} />
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