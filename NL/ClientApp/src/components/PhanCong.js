import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { CarService } from '../service/CarService';
import { Growl } from 'primereact/growl';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export class PhanCong extends Component {
    static displayName = PhanCong.name;

    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],//danh sách học viên trên state
            dataTableSelection: null,//giá trị khi select
            malop: '',
            malichhoc: '',
            magiaovien: '',
            maphong: '',
            buoihoc: '',
            giohoc: '',
            sodt: '',
            dslop: [],
            dslichhoc: [],
            dsgiaovien: [],
            dsphonghoc: [],
            sotiethoc: '',
            hesosodt: '',
            display: false,//trạng thái dialog form
            value2: '',
            globalFilter: null,//giá trị lọc
            showAddEdit: true,//trạng thái form edit và add
            sttThem: false,
            editInfo: {}//đối tượng cần chỉnh sửa hoặc xóa
        };
        this.service = new CarService();
        this.service.getLop().then(data => this.setState({ dslop: data }));
        this.service.getGiaoVien().then(data => this.setState({ dsgiaovien: data }));
        this.service.getPhongHoc().then(data => this.setState({ dsphonghoc: data }));
        this.service.getLichHoc().then(data => this.setState({ dslichhoc: data }));
    }
    componentDidMount() {
        this.loadData();
        this.service.getPhanCongFull().then(data => console.log(data));
    }

    loadData = () => {
        this.service.getPhanCongFull().then(data => this.setState({ dataTableValue: data }));
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
    onChangeLop = (event) => {
        var value = event.target.value;
        console.log(value);
        if (value !== null) {
            this.setState({
                malop: value
            });
        } else if (value === null) {
            this.setState({
                malop: ''
            });
        }
    }
    onChangeGiaoVien = (event) => {
        var value = event.target.value;
        console.log(value);
        if (value !== null) {
            this.setState({
                magiaovien: value
            });
        } else if (value === null) {
            this.setState({
                magiaovien: ''
            });
        }
    }
    onChangePhongHoc = (event) => {
        var value = event.target.value;
        console.log(value);
        if (value !== null) {
            this.setState({
                maphong: value
            });
        } else if (value === null) {
            this.setState({
                maphong: ''
            });
        }
    }
    onChangeLichHoc = (event) => {
        var value = event.target.value;
        if (value !== null) {
            this.state.dslichhoc.forEach((val, key) => {
                if (val.malichhoc === value.malichhoc) {
                    this.setState({
                        malichhoc: val,
                        malichhoctxt: val.malichhoc,
                        giohoc: val.giohoc,
                        buoihoc: val.buoihoc
                    });
                    return;
                }
            });
            console.log(value);
        } else if (value === null) {
            this.setState({
                malichhoc: '',
                giohoc: '',
                buoihoc: ''
            });
        }
    }
    onSubmit = (event) => {
        event.preventDefault();
        var item = {};
        var check = true;
        item.malop = this.state.malop.malop;
        item.malichhoc = this.state.malichhoc.malichhoc;
        item.magiaovien = this.state.magiaovien.magiaovien;
        item.maphong = this.state.maphong.maphong;
        console.log(item);
        this.setState({ display: false })
        this.state.dataTableValue.forEach((value, key) => {
            if (value.malop === item.malop && value.malichhoc === item.malichhoc && value.magiaovien === item.magiaovien && value.maphong === item.maphong) {
                this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                check = false;
                return;
            }
        });
        console.log(check);
        if (check === true) {
            this.service.themPhanCong(item).then((response) => {
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

    addPhanCong = () => {
        var dialogFooter = (
            <div>
                <Button icon="pi pi-check" onClick={(event) => this.onSubmit(event)} label="Thêm" disabled={this.state.sttThem} />
                <Button icon="pi pi-times" onClick={() => this.setState({ display: false })} label="Hủy" className="p-button-secondary" />
            </div>
        );
        var header = "THÊM PHÂN CÔNG PHÒNG HỌC";

        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="malop" value={this.state.malop} options={this.state.dslop} ariaLabel="Test" onChange={this.onChangeLop} placeholder="Chọn Lớp"
                            optionLabel="tenlop" optionValue="malop" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="malichhoc" value={this.state.malichhoc} options={this.state.dslichhoc} ariaLabel="Test" onChange={this.onChangeLichHoc} placeholder="Chọn Buổi Học"
                            optionLabel="buoihoc" optionValue="malichhoc" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="malichhoc" size="70" value={this.state.giohoc} disabled />
                        <label htmlFor="malichhoc">Giờ Học</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="magiaovien" value={this.state.magiaovien} options={this.state.dsgiaovien} ariaLabel="Test" onChange={this.onChangeGiaoVien} placeholder="Chọn Giáo Viên"
                            optionLabel="hoten" optionValue="magiaovien" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="maphong" value={this.state.maphong} options={this.state.dsphonghoc} ariaLabel="Test" onChange={this.onChangePhongHoc} placeholder="Chọn Phòng Học"
                            optionLabel="tenphong" optionValue="maphong" showClear={true} />
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
        var header = "SỬA PHÂN CÔNG GIẢNG DẠY";


        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="malop" value={this.state.malop} options={this.state.dslop} ariaLabel="Test" onChange={this.onChangeLop} placeholder="Chọn Lớp"
                            optionLabel="tenlop" optionValue="malop" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="malichhoc" value={this.state.malichhoc} options={this.state.dslichhoc} ariaLabel="Test" onChange={this.onChangeLichHoc} placeholder="Chọn Buổi Học"
                            optionLabel="buoihoc" optionValue="malichhoc" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="malichhoc" size="70" type="text" value={this.state.giohoc} disabled />
                        <label htmlFor="malichhoc">Giờ Học</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="magiaovien" value={this.state.magiaovien} options={this.state.dsgiaovien} ariaLabel="Test" onChange={this.onChangeGiaoVien} placeholder="Chọn Giáo Viên"
                            optionLabel="hoten" optionValue="magiaovien" showClear={true} />
                    </span>
                </div>
                
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="maphong" value={this.state.maphong} options={this.state.dsphonghoc} ariaLabel="Test" onChange={this.onChangePhongHoc} placeholder="Chọn Phòng Học"
                            optionLabel="tenphong" optionValue="maphong" showClear={true} />
                    </span>
                </div>
              
            </Dialog>

        </div>;
    }
    renderHeader() {
        return (
            <div>
                PHÂN CÔNG PHÒNG HỌC
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
        this.service.getPhanCongID(event.value.malop, event.value.malichhoc, event.value.magiaovien, event.value.maphong).then(data => console.log(data));
        this.state.dslop.forEach((val, i) => {
            if (val.malop === event.value.malop) {
                this.setState({
                    malop: val
                });
                return;
            }
        });
        this.state.dslichhoc.forEach((val, i) => {
            if (val.malichhoc === event.value.malichhoc) {
                this.setState({
                    malichhoc: val,
                    giohoc: val.giohoc,
                    buoihoc: val.buoihoc
                });
                return;
            }
        });

        this.state.dsgiaovien.forEach((val, i) => {
            if (val.magiaovien === event.value.magiaovien) {
                this.setState({
                    magiaovien: val
                });
                return;
            }
        });

        this.state.dsphonghoc.forEach((val, i) => {
            if (val.maphong === event.value.maphong) {
                this.setState({
                    maphong: val
                });
                return;
            }
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
            malichhoc: '',
            maphong: '',
            magiaovien: '',
        });
    }
    //hiểm thị form edit
    showEdit = () => {
        this.setState({
            display: true,
            showAddEdit: false,   //hiển thị form edit
            maloptxt: this.state.editInfo.malop,
            maphongtxt: this.state.editInfo.maphong,
            magiaovientxt: this.state.editInfo.magiaovien,
            malichhoctxt: this.state.editInfo.malichhoc
        });
    }
    //hiển thị form add or edit khi render
    showAddandEdit = () => {
        if (this.state.showAddEdit === true) {
            return this.addPhanCong();
        }
        else if (this.state.showAddEdit === false) {
            return this.EditMember();
        }

    }
    //lưu đối tượng được chihr sửa
    saveEdit = (event) => {
        event.preventDefault();
        var item = {};
        item.malop = this.state.malop.malop;
        item.malichhoc = this.state.malichhoc.malichhoc;
        item.magiaovien = this.state.magiaovien.magiaovien;
        item.maphong = this.state.maphong.maphong;
        console.log(item);
        this.service.deletePhanCong(this.state.editInfo.malop, this.state.editInfo.malichhoc, this.state.editInfo.magiaovien, this.state.editInfo.maphong).then((response) => {
            if (response.ok) {
                console.log("xóa ok");
                this.service.themPhanCong(item).then((response) => {
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
    // xóa đối tượng được chọn
    onClickDelete = () => {
        this.service.deletePhanCong(this.state.editInfo.malop, this.state.editInfo.malichhoc, this.state.editInfo.magiaovien, this.state.editInfo.maphong).then((response) => {
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
    //hàm lấy lại mật khẩu
    layMatKhau = () => {
        console.log(this.state.editInfo);
        alert("Tên tài khoản: " + this.state.editInfo.taikhoan + "\n Mật Khẩu:" + this.state.editInfo.matkhau);
    }
    render() {
        let cols = [
            { field: 'malop', header: 'Mã Lớp' },
            { field: 'tenlop', header: 'Tên Lớp' },
            { field: 'maphong', header: 'Mã Phòng' },
            { field: 'tenphong', header: 'Tên Phòng' },
            { field: 'magiaovien', header: 'Mã Giáo Viên' },
            { field: 'hoten', header: 'Tên Giáo Viên' },
            { field: 'malichhoc', header: 'Mã Lịch Học' },
            { field: 'buoihoc', header: 'Buổi Học' },
            { field: 'giohoc', header: 'Giờ Học' }
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