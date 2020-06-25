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
import { Spinner } from 'primereact/spinner';

export class GiaoVien extends Component {
    static displayName = GiaoVien.name;

    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],//danh sách học viên trên state
            dataTableSelection: null,//giá trị khi select
            magiaovien: '',
            madonvigv: '',
            hoten: '',
            ngaysinh: '',
            diachi: '',
            sodt: '',
            gioitinh: '',
            email: '',
            taikhoangv: '',
            matkhau: '',
            hesothulao: '',
            display: false,//trạng thái dialog form
            value2: '',
            donvigv: [],//danh sách các đơn vị của học viên
            tendonvi: '',
            globalFilter: null,//giá trị lọc
            showAddEdit: true,//trạng thái form edit và add
            sttThem: true,
            editInfo: {}//đối tượng cần chỉnh sửa hoặc xóa
        };
        this.service = new CarService();
        this.service.getDonViGiaoVien().then(data => this.setState({ donvigv: data }));

    }
    componentDidMount() {
        this.loadData();

    }

    loadData = () => {
        this.service.getGiaoVien().then(data => {

            var obj = JSON.parse(JSON.stringify(data));
            console.log(obj);
            obj.map((value, i) => {
                var date = new Date(obj[i].ngaysinh);
                //             console.log(date.toLocaleDateString());
                value.ngaysinh = date.toLocaleDateString();
                //         console.log(value.gioitinh);
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
        if (this.state.magiaovien !== '' && this.state.madonvigv !== '' && this.state.hoten !== '' && this.state.ngaysinh !== '' &&
            this.state.sodt !== '' && this.state.gioitinh !== '' && this.state.email !== '' && this.state.diachi !== '') {
            this.setState({ sttThem: false });
        } else if (this.state.magiaovien === '' || this.state.madonvigv === '' || this.state.hoten === '' || this.state.ngaysinh === '' ||
            this.state.sodt === '' || this.state.gioitinh === '' || this.state.email === '' || this.state.diachi === '') {
            this.setState({ sttThem: true });
        }
    }
    onChangeDonVi = (event) => {
        console.log(event.value.madonvigv);
        var value = event.target.value;
        this.setState({
            madonvigv: value

        }
        );
        console.log(value);
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
        item.magiaovien = this.state.magiaovien;
        item.madonvigv = this.state.madonvigv.madonvigv;
        item.hoten = this.state.hoten;
        item.ngaysinh = this.state.ngaysinh;
        item.diachi = this.state.diachi;
        item.sodt = this.state.sodt;
        item.gioitinh = Boolean(this.state.gioitinh);
        item.email = this.state.email;
        item.taikhoangv = this.state.magiaovien;
        item.matkhau = r;
        item.hesothulao = this.state.hesothulao;
        console.log(item);
        this.setState({ display: false })
        if (item.magiaovien.length < 7) {
            this.state.dataTableValue.forEach((value, key) => {
                if (value.magiaovien === item.magiaovien) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                    check = false;
                    return;
                }
            });
            console.log(check);
            if (check === true) {
                this.service.themGiaoVien(item).then((response) => {
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
        var header = "THÊM GIÁO VIÊN";

        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="magiaovien" size="70" type="text" name="magiaovien" value={this.state.magiaovien} onChange={event => this.onChange(event)} />
                        <label htmlFor="magiaovien">Mã Giáo Viên</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown value={this.state.madonvigv} options={this.state.donvigv} ariaLabel="Test" onChange={this.onChangeDonVi} placeholder="Select đơn vị" optionLabel="tendvgv" optionValue="madonvigv" />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="hoten" size="70" type="text" name="hoten" value={this.state.hoten} onChange={event => this.onChange(event)} />
                        <label htmlFor="hoten">  Họ Tên Giáo Viên</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <Calendar dateFormat="dd/mm/yy" id="ngaysinh" name="ngaysinh" value={this.state.ngaysinh} onChange={event => this.onChangeNgaySinh(event)} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
                        <label htmlFor="ngaysinh">  Ngày Sinh</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="diachi" size="70" type="text" name="diachi" value={this.state.diachi} onChange={event => this.onChange(event)} />
                        <label htmlFor="diachi">Địa Chỉ</label>
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
                        <InputText onBlur={event => this.emailIsValid(this.state.email)} id="email" size="70" type="text" name="email" value={this.state.email} onChange={event => this.onChange(event)} />
                        <label htmlFor="email">Email</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <Spinner readonly value={this.state.hesothulao} id="hesothulao" name="hesothulao" onChange={event => this.onChange(event)} min={0} max={20} />
                        <label htmlFor="hesothulao">Hệ Số Thù Lao</label>
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
        var header = "SỬA GIÁO VIÊN";


        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText disabled id="magiaovien" size="70" type="text" name="magiaovien" value={this.state.magiaovien} onChange={event => this.onChange(event)} />
                        <label htmlFor="magiaovien">Mã Giáo Viên</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown value={this.state.madonvigv} options={this.state.donvigv} ariaLabel="Test" onChange={this.onChangeDonVi} placeholder="Select đơn vị" optionLabel="tendvgv" optionValue="madonvigv" />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="hoten" size="70" type="text" name="hoten" value={this.state.hoten} onChange={event => this.onChange(event)} />
                        <label htmlFor="hoten">  Họ Tên Giáo Viên</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <Calendar dateFormat="dd/mm/yy" id="ngaysinh" name="ngaysinh" value={this.state.ngaysinh} onChange={event => this.onChangeNgaySinh(event)} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
                        <label htmlFor="ngaysinh">  Ngày Sinh</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="diachi" size="70" type="text" name="diachi" value={this.state.diachi} onChange={event => this.onChange(event)} />
                        <label htmlFor="diachi">Địa Chỉ</label>
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
                        <InputText onBlur={event => this.emailIsValid(this.state.email)} id="email" size="70" type="text" name="email" value={this.state.email} onChange={event => this.onChange(event)} />
                        <label htmlFor="email">Email</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <Spinner readonly value={this.state.hesothulao} id="hesothulao" name="hesothulao" onChange={event => this.onChange(event)} min={0} max={20} />
                        <label htmlFor="hesothulao">Hệ Số Thù Lao</label>
                    </span>
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
    //hàm lấy thông tin chỉnh sửa của 1 đối tượng
    Edit = (event) => {
        console.log(event);
        console.log(event.value);
        this.state.donvigv.forEach((val, i) => {
            if (val.madonvigv === event.value.madonvigv) {
                this.setState({ madonvigv: val });
                return;
            }
        });

        if (event.value.gioitinh === "Nam") {
            this.setState({ gioitinh: true });
        }
        if (event.value.gioitinh === "Nữ") {
            this.setState({ gioitinh: false });
        }

        this.setState({
            magiaovien: event.value.magiaovien,
            hoten: event.value.hoten,
            ngaysinh: event.value.ngaysinh,
            diachi: event.value.diachi,
            sodt: event.value.sodt,
            email: event.value.email,
            taikhoangv: event.value.taikhoangv,
            matkhau: event.value.matkhau,
            hesothulao: event.value.hesothulao,
            dataTableSelection: event.value,
            editInfo: event.value
        });
    }
    //hàm hiển thị form thêm
    showThem = () => {
        this.setState({
            display: true,
            showAddEdit: true,  //hiển thị form thêm
            magiaovien: '',
            madonvigv: '',
            hoten: '',
            ngaysinh: '',
            diachi: '',
            sodt: '',
            gioitinh: '',
            email: '',
            taikhoangv: '',
            matkhau: '',
            hesothulao: ''
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
        item.magiaovien = this.state.magiaovien;
        item.madonvigv = this.state.madonvigv.madonvigv;
        item.hoten = this.state.hoten;
        //item.ngaysinh = new Date(this.state.ngaysinh);
        // item.ngaysinh = this.state.ngaysinh;
        var ngaysinh = this.state.ngaysinh.toString();
        var e = ngaysinh.split("/", 3);
        console.log(e);
        if (e.length === 3) {
            item.ngaysinh = new Date(e[2], e[1] - 1, e[0], 8);
        }
        else {
            item.ngaysinh = this.state.ngaysinh;
        }
        item.diachi = this.state.diachi;
        item.sodt = this.state.sodt;
        item.gioitinh = Boolean(this.state.gioitinh);
        item.email = this.state.email;
        item.taikhoangv = this.state.taikhoangv;
        item.matkhau = this.state.matkhau;
        item.hesothulao = this.state.hesothulao;
        console.log(item);
        this.service.suaGiaoVien(item).then((response) => {
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
        var items = this.state.dataTableValue.filter(temp => temp.magiaovien !== this.state.editInfo.magiaovien);
        console.log(items);
        this.service.deleteGiaoVien(this.state.editInfo.magiaovien).then((response) => {
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
        alert("Tên tài khoản: " + this.state.editInfo.taikhoangv + "\n Mật Khẩu:" + this.state.editInfo.matkhau);
    }
    render() {
        let cols = [
            { field: 'magiaovien', header: 'Mã HV' },
            { field: 'madonvigv', header: 'Mã DV' },
            { field: 'hoten', header: 'Họ Tên' },
            { field: 'ngaysinh', header: 'Ngày Sinh' },
            { field: 'gioitinh', header: 'G.Tính' },
            { field: 'diachi', header: 'Địa Chỉ' },
            { field: 'sodt', header: 'Số DT' },
            { field: 'email', header: 'EMAIL' },
            { field: 'hesothulao', header: 'Hệ Số Thù Lao' }
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