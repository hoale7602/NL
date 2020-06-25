import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { CarService } from '../service/CarService';
import { Growl } from 'primereact/growl';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export class GiangDay extends Component {
    static displayName = GiangDay.name;

    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],//danh sách học viên trên state
            dataTableSelection: null,//giá trị khi select
            mamonhoc: '',
            magiaovien:'',
            tenmonhoc: '',
            hoten: '',
            thulao: '',
            dsmonhoc: [],
            dsgiaovien: [],
            sotiethoc: '',
            hesothulao:'',
            display: false,//trạng thái dialog form
            value2: '',
            globalFilter: null,//giá trị lọc
            showAddEdit: true,//trạng thái form edit và add
            sttThem: false,
            editInfo: {}//đối tượng cần chỉnh sửa hoặc xóa
        };
        this.service = new CarService();
        this.service.getMonHoc().then(data => this.setState({ dsmonhoc: data }));
        this.service.getGiaoVien().then(data => this.setState({ dsgiaovien: data }));
    }
    componentDidMount() {
         this.loadData();
        
    }

    loadData = () => {
        this.service.getGiangDayFull().then(data => this.setState({ dataTableValue: data }));
        //console.log(this.state.dsmonhoc);
        //console.log(this.state.dsgiaovien);
        //this.service.getGiangDay().then(data => {
        //    var obj = JSON.parse(JSON.stringify(data));
        //    obj.map((value, i) => {
        //        this.state.dsmonhoc.forEach((val, i) => {
        //            if (val.mamonhoc === value.mamonhoc) {
        //                value.tenmonhoc = val.tenmonhoc;
        //                return;
        //            }
        //        });
        //        this.state.dsgiaovien.forEach((val, i) => {
        //            if (val.magiaovien === value.magiaovien) {
        //                value.hoten = val.hoten;
        //                return;
        //            }
        //        });
        //        return null;
        //    });
        //         console.log(obj);
        //    this.setState({ dataTableValue: obj })
        //});
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
    onChangeMonHoc = (event) => {
        var value = event.target.value;
        console.log(value);
        if (value !== null) {
            this.state.dsmonhoc.forEach((val, key) => {
                if (val.mamonhoc === value.mamonhoc) {
                    this.setState({
                        tenmonhoc: val.mamonhoc,
                        sotiethoc: val.sotiethoc
                    });
                    return;
                }
            });
            this.setState({
                mamonhoc: value
            });
        } else if (value === null) {
            this.setState({
                mamonhoc: '',
                tenmonhoc: '',
                sotiethoc: '',
                thulao: ''
            });

        }
    }
    onChangeGiaoVien = (event) => {
        var value = event.target.value;
        if (value !== null) {
            this.state.dsgiaovien.forEach((val, key) => {
                if (val.magiaovien === value.magiaovien) {
                    this.setState({
                        hoten: val.magiaovien
                    });
                    this.thulao(val.hesothulao);
                    return;
                }
            });

            this.setState({
                magiaovien: value
            });
            console.log(value);
        } else if (value === null) {
            this.setState({
                magiaovien: '',
                hoten: '',
                thulao:''
            });

        }
    }
    thulao = (e) => {
        console.log(e);
        console.log(this.state.sotiethoc);
        console.log(e * this.state.sotiethoc);
        this.setState({ thulao: e * this.state.sotiethoc });
    }
    onSubmit = (event) => {
        event.preventDefault();
        var item = {};
        var check = true;
        item.mamonhoc = this.state.mamonhoc.mamonhoc;
        item.magiaovien = this.state.magiaovien.magiaovien;
        item.thulao = parseFloat(this.state.thulao);
        console.log(item);
        this.setState({ display: false })
        this.state.dataTableValue.forEach((value, key) => {
            if (value.tenmonhoc === item.tenmonhoc && value.magiaovien === item.magiaovien) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                    check = false;
                    return;
                }
            });
            console.log(check);
        if (check === true) {
            this.service.themGiangDay(item).then((response) => {
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
    addGiaoVien = () => {
        var dialogFooter = (
            <div>
                <Button icon="pi pi-check" onClick={(event) => this.onSubmit(event)} label="Thêm" disabled={this.state.sttThem} />
                <Button icon="pi pi-times" onClick={() => this.setState({ display: false })} label="Hủy" className="p-button-secondary" />
            </div>
        );
        var header = "THÊM PHÂN CÔNG GIẢNG DẠY";

        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="mamonhoc" value={this.state.mamonhoc} options={this.state.dsmonhoc} ariaLabel="Test" onChange={this.onChangeMonHoc} placeholder="Chọn Môn Học"
                            optionLabel="tenmonhoc" optionValue="mamonhoc" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="tenmonhoc" size="70" type="text" name="tenmonhoc" value={this.state.tenmonhoc} disabled />
                        <label htmlFor="tenmonhoc">Mã Môn Học</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="magiaovien" value={this.state.magiaovien} options={this.state.dsgiaovien} ariaLabel="Test" onChange={this.onChangeGiaoVien} placeholder="Chọn Giáo Viên"
                            optionLabel="hoten" optionValue="magiaovien" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="hoten" size="70" type="text" name="hoten" value={this.state.hoten} disabled />
                        <label htmlFor="hoten">Mã Giáo Viên</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="sotiethoc" size="70" type="text" name="sotiethoc" value={this.state.sotiethoc} disabled />
                        <label htmlFor="sotiethoc">Số Tiết Học</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText keyfilter="int" id="thulao" name="thulao" value={this.state.thulao} disabled />
                        <label htmlFor="thulao">Thù Lao Giảng Dạy</label>
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
                        <Dropdown filter={true} name="mamonhoc" value={this.state.mamonhoc} options={this.state.dsmonhoc} ariaLabel="Test" onChange={this.onChangeMonHoc} placeholder="Chọn Môn Học"
                            optionLabel="tenmonhoc" optionValue="mamonhoc" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="tenmonhoc" size="70" type="text" name="tenmonhoc" value={this.state.tenmonhoc} disabled />
                        <label htmlFor="tenmonhoc">Mã Môn Học</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown filter={true} name="magiaovien" value={this.state.magiaovien} options={this.state.dsgiaovien} ariaLabel="Test" onChange={this.onChangeGiaoVien} placeholder="Chọn Giáo Viên"
                            optionLabel="hoten" optionValue="magiaovien" showClear={true} />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="hoten" size="70" type="text" name="hoten" value={this.state.hoten} disabled />
                        <label htmlFor="hoten">Mã Giáo Viên</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="sotiethoc" size="70" type="text" name="sotiethoc" value={this.state.sotiethoc} disabled />
                        <label htmlFor="sotiethoc">Số Tiết Học</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText keyfilter="int" id="thulao" name="thulao" value={this.state.thulao} onChange={event => this.onChange(event)} />
                        <label htmlFor="thulao">Thù Lao Giảng Dạy</label>
                    </span>
                </div>
            </Dialog>

        </div>;
    }
    renderHeader() {
        return (
            <div>
                PHÂN CÔNG GIẢNG DẠY MON HỌC
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
        this.state.dsmonhoc.forEach((val, i) => {
            if (val.mamonhoc === event.value.mamonhoc) {
                this.setState({
                    mamonhoc: val,
                    tenmonhoc: val.mamonhoc,
                    sotiethoc: val.sotiethoc
                });
                return;
            }
        });
        this.state.dsgiaovien.forEach((val, i) => {
            if (val.magiaovien === event.value.magiaovien) {
                this.setState({
                    magiaovien: val,
                    hoten: val.magiaovien
                });
                return;
            }
        });

        this.setState({
            thulao: event.value.thulao,
            dataTableSelection: event.value,
            editInfo: event.value
        });
    }
    //hàm hiển thị form thêm
    showThem = () => {
        this.setState({
            display: true,
            showAddEdit: true,  //hiển thị form thêm
            mamonhoc:'',
            tenmonhoc: '',
            magiaovien:'',
            hoten: '',
            thulao: '',
            sotiethoc: '',
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
        item.mamonhoc = this.state.mamonhoc.mamonhoc;
        item.magiaovien = this.state.magiaovien.magiaovien;
        item.thulao = parseFloat(this.state.thulao);
        console.log(item);
        this.service.suaGiangDay(item).then((response) => {
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
        var items = this.state.dataTableValue.filter(temp => temp.tenmonhoc !== this.state.editInfo.tenmonhoc);
        console.log(items);
        var temp = [];
        temp.mamonhoc = this.state.editInfo.mamonhoc;
        temp.magiaovien = this.state.editInfo.magiaovien;
        console.log(temp);
        this.service.deleteGiangDay(this.state.editInfo.mamonhoc, this.state.editInfo.magiaovien).then((response) => {
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
        alert("Tên tài khoản: " + this.state.editInfo.taikhoan + "\n Mật Khẩu:" + this.state.editInfo.matkhau);
    }
    render() {
        let cols = [
            { field: 'mamonhoc', header: 'Mã Môn Học' },
            { field: 'tenmonhoc', header: 'Tên Môn Học' },
            { field: 'magiaovien', header: 'Mã Giáo Viên' },
            { field: 'hoten', header: 'Tên Giáo Viên' },
            { field: 'thulao', header: 'Thù Lao' }
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