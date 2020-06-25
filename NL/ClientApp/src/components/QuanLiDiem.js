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

export class QuanLiDiem extends Component {
    static displayName = QuanLiDiem.name;
    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],//danh sách học viên trên state
            dataTableSelection: null,//giá trị khi select
            mahv: '',
            makythi: '',
            hotenhv: '',
            email: '',
            ngaythi: '',
            ketqua: '',
            xeploai: '',
            display: false,//trạng thái dialog form
            display1: false,
            value2: '',
            dshocvien: [],//danh sách các đơn vị của học viên
            dskythi:[],
            globalFilter: null,//giá trị lọc
            showAddEdit: true,//trạng thái form edit và add
            sttThem: false,
            editInfo: {}//đối tượng cần chỉnh sửa hoặc xóa
        };
        this.service = new CarService();
        this.service.getHocVien().then(data => this.setState({ dshocvien: data }));
        this.service.getKyThi().then(data => this.setState({ dskythi: data }));
    }
    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.service.getQuanLiDiem().then(data => {

            var obj = JSON.parse(JSON.stringify(data));
            obj.map((value, i) => {
                var date = new Date(obj[i].ngaythi);
                value.ngaythi = date.toLocaleDateString();
                return null;
            });
            this.setState({ dataTableValue: obj })
        });
    }
    onChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        console.log(value);
        if (name === "ngaythi") {
            var ngay = new Date(value);
            ngay.setHours(8);
            this.setState({
                [name]: ngay
            });
        } else {
            this.setState({
                [name]: value
            });
        }
    }
    onChangeKetQua = (event) => {
        var value = event.target.value;
        var str = '';
        console.log(value);
        if (value !== '') {
            if (parseFloat(value) >= 9) {
                str = "Xuất Sắc";
            } else if (parseFloat(value) >= 8) {
                str = "Giỏi";
            }
            else if (parseFloat(value) >= 6) {
                str = "Khá";
            }
            else if (parseFloat(value) >= 5) {
                str = "Trung Bình";
            }
            else {
                str = "Yếu";
            }
        }
        console.log(str);
        this.setState({ ketqua: value, xeploai: str });
        
    }
    onChangeHV = (event) => {
        var value = event.target.value;
        this.state.dshocvien.forEach((val, key) => {
            if (val.mahv === value.mahv) {
                    this.setState({
                        hotenhv: val.hotenhv,
                        email: val.email
                    });
                    return;
                }
            });
        this.setState({
            mahv: value
        });
        console.log(value);
    }
    onChangeKyThi = (event) => {
        var value = event.target.value;
        this.setState({
            makythi: value

        }
        );
        console.log(value);
    }
    onSubmit = (event) => {
        event.preventDefault();
        var item = {};
        var check = true;
        item.mahv = this.state.mahv.mahv;
        item.makythi = this.state.makythi.makythi;
        item.ngaythi = this.state.ngaythi;
        item.ketqua = parseFloat(this.state.ketqua);
        item.xeploai = this.state.xeploai;
        console.log(item);
        this.setState({ display: false })
        if (item.mahv.length < 7) {
            this.state.dataTableValue.forEach((value, key) => {
                if (value.mahv === item.mahv) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                    check = false;
                    return;
                }
            });
            console.log(check);
            if (check === true) {
                this.service.themQuanLiDiem(item).then((response) => {
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

    addHocVien = () => {
        var dialogFooter = (
            <div>
                <Button icon="pi pi-check" onClick={(event) => this.onSubmit(event)} label="Thêm" disabled={this.state.sttThem} />
                <Button icon="pi pi-times" onClick={() => this.setState({ display: false })} label="Hủy" className="p-button-secondary" />
            </div>
        );
        var header = "THÊM ĐIỂM";

        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="mahv" value={this.state.mahv} options={this.state.dshocvien} ariaLabel="Test" onChange={this.onChangeHV} placeholder="Chọn Học Viên"
                            optionLabel="hotenhv" optionValue="mahv" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="makythi" value={this.state.makythi} options={this.state.dskythi} ariaLabel="Test" onChange={this.onChangeKyThi} placeholder="Chọn Kỳ Thi" optionLabel="tenkythi" optionValue="makythi" />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText disabled id="hotenhv" size="70" type="text" name="hotenhv" value={this.state.hotenhv} />
                        <label htmlFor="hotenhv">  Họ Tên Học Viên</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText disabled id="email" size="70" type="text" name="email" value={this.state.email} />
                        <label htmlFor="email">Email</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <Calendar dateFormat="mm/dd/yy" id="ngaythi" name="ngaythi" value={this.state.ngaythi} onChange={event => this.onChange(event)} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
                        <label htmlFor="ngaythi">Ngày Thi</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText keyfilter="pnum" id="ketqua" size="70" type="text" name="ketqua" value={this.state.ketqua} onChange={event => this.onChangeKetQua(event)} />
                        <label htmlFor="ketqua">Kết Quả</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText disabled id="xeploai" name="xeploai" value={this.state.xeploai} onChange={event => this.onChange(event)} />
                        <label htmlFor="xeploai">Xếp Loại</label>
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
        var header = "SỬA ĐIỂM";


        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown disabled filter={true} name="mahv" value={this.state.mahv} options={this.state.dshocvien} ariaLabel="Test" onChange={this.onChangeHV} placeholder="Chọn Học Viên"
                            optionLabel="hotenhv" optionValue="mahv" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="makythi" value={this.state.makythi} options={this.state.dskythi} ariaLabel="Test" onChange={this.onChangeKyThi} placeholder="Chọn Kỳ Thi" optionLabel="tenkythi" optionValue="makythi" />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText disabled id="hotenhv" size="70" type="text" name="hotenhv" value={this.state.hotenhv} />
                        <label htmlFor="hotenhv">  Họ Tên Học Viên</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText disabled id="email" size="70" type="text" name="email" value={this.state.email} />
                        <label htmlFor="email">Email</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <Calendar dateFormat="mm/dd/yy" id="ngaythi" name="ngaythi" value={this.state.ngaythi} onChange={event => this.onChange(event)} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
                        <label htmlFor="ngaythi">Ngày Thi</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText keyfilter="pnum" id="ketqua" size="70" type="text" name="ketqua" value={this.state.ketqua} onChange={event => this.onChangeKetQua(event)} />
                        <label htmlFor="ketqua">Kết Quả</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText disabled id="xeploai" name="xeploai" value={this.state.xeploai} onChange={event => this.onChange(event)} />
                        <label htmlFor="xeploai">Xếp Loại</label>
                    </span>
                </div>
            </Dialog>

        </div>;
    }
    renderHeader() {
        return (
            <div>
                BẢNG ĐIỂM HỌC VIÊN
                <div className="p-col-12 p-md-4" style={{ textAlign: 'left' }}>
                    <div className="p-datatable-globalfilter-container">
                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Học Viên Search" />
                    </div>
                </div>
            </div>
        );
    }
    //hàm lấy thông tin chỉnh sửa của 1 đối tượng
    Edit = (event) => {
        console.log(event);
        console.log(event.value);
        this.state.dshocvien.forEach((val, i) => {
            if (val.mahv === event.value.mahv) {
                this.setState({
                    mahv: val,
                    hotenhv: val.hotenhv,
                    email: val.email
                });
                return;
            }
        });
        this.state.dskythi.forEach((val, i) => {
            if (val.makythi === event.value.makythi) {
                this.setState({ makythi: val });
                return;
            }
        });
        this.setState({
            ngaythi: event.value.ngaythi,
            ketqua: event.value.ketqua,
            xeploai: event.value.xeploai,
            dataTableSelection: event.value,
            editInfo: event.value
        });
    }
    //hàm hiển thị form thêm
    showThem = () => {
        this.setState({
            display: true,
            showAddEdit: true,  //hiển thị form thêm
            mahv: '',
            makythi: '',
            hotenhv: '',
            email: '',
            ngaythi: '',
            xeploai: '',
            ketqua:''
        });
    }
    //hiểm thị form edit
    showEdit = () => {
        this.setState({
            display: true,
            showAddEdit: false   //hiển thị form edit
        });
    }
    showChiTiet = () => {
        this.setState({
            display1: true
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
    //lưu đối tượng được chihr sửa
    saveEdit = (event) => {
        event.preventDefault();
        var item = {};
        var check = true;
        item.mahv = this.state.mahv.mahv;
        item.makythi = this.state.makythi.makythi;
        var ngay = this.state.ngaythi.toString();
        var e = ngay.split("/", 3);
        if (e.length === 3) {
            item.ngaythi = new Date(e[2], e[1] - 1, e[0], 8);
            console.log(item.ngaythi);
        }
        else {
            item.ngaythi = this.state.ngaythi;
        }
        item.ketqua = parseFloat(this.state.ketqua);
        item.xeploai = this.state.xeploai;
        console.log(item);
        this.service.suaQuanLiDiem(item).then((response) => {
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
        var items = this.state.dataTableValue.filter(temp => temp.mahv !== this.state.editInfo.mahv);
        console.log(items);
        this.service.deleteQuanLiDiem(this.state.editInfo.mahv).then((response) => {
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
    chitiet = () => {
        console.log(this.state.editInfo);
        var item = {};
        item.mahv = this.state.editInfo.mahv;
        item.makythi = this.state.editInfo.makythi;
        this.state.dshocvien.forEach((val, i) => {
            if (val.mahv === this.state.editInfo.mahv) {
                item.hotenhv = val.hotenhv;
                var date = new Date(val.ngaysinh);
                item.ngaysinh = date.toLocaleDateString();
                item.diachi = val.diachi;
                item.sodt = val.sodt;
                item.email = val.email;
                if (val.gioitinh === true) {
                    item.giotinh = "Nam";
                } else if (val.gioitinh === false) {
                    item.giotinh = "Nữ";
                }
                return;
            }
        });
        item.ngaythi = this.state.editInfo.ngaythi;
        item.ketqua = this.state.editInfo.ketqua;
        item.xeploai = this.state.editInfo.xeploai;
        console.log(item);
        var dialogFooter = (
            <div>
                <Button icon="pi pi-times" onClick={() => this.setState({ display: false })} label="Close" className="p-button-secondary" />
            </div>
        );
        var header = "THÔNG TIN CHI TIẾT : " + this.state.hotenhv;
        return <div>
            
            <Dialog header={header} visible={this.state.display1} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display1: false })}>
                <div>
                    <b>Mã Học Viên :  </b>{item.mahv}
                </div>
                <div>
                    <b>Mã Kỳ Thi :  </b>{item.makythi}
                </div>
                <div>
                    <b>Họ Tên Học Viên :  </b>{item.hotenhv}
                </div>
                <div>
                    <b>Ngày Sinh :  </b>{item.ngaysinh}
                </div>
                <div>
                    <b>Địa Chỉ :  </b>{item.diachi}
                </div>
                <div>
                    <b>Số Điện Thoại :  </b>{item.sodt}
                </div>
                <div>
                    <b>Email :  </b>{item.email}
                </div>
                <div>
                    <b>Giới Tính :  </b>{item.gioitinh}
                </div>
                <div>
                    <b>Ngày Thi :  </b>{item.ngaythi}
                </div>
                <div>
                    <b>Kết Quả :  </b>{item.ketqua}
                </div>
                <div>
                    <b>Xếp Loại :  </b>{item.xeploai}
                </div>

            </Dialog>
            
        </div>;
    }
    render() {
        let cols = [
            { field: 'mahv', header: 'Mã HV' },
            { field: 'makythi', header: 'Mã Kỳ Thi' },
            { field: 'ngaythi', header: 'Ngày Thi' },
            { field: 'ketqua', header: 'Kết Quả' },
            { field: 'xeploai', header: 'Xếp Loại' }
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
                {this.chitiet()}
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