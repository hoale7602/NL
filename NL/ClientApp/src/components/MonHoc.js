import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { CarService } from '../service/CarService';
import { Growl } from 'primereact/growl';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Spinner } from 'primereact/spinner';

export class MonHoc extends Component {
    static displayName = MonHoc.name;

    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],//danh sách môn học trên state
            dataTableSelection: null,//giá trị khi select
            mamonhoc: '',
            makhoahoc: '',
            tenmonhoc: '',
            hocphi: '',
            sotiethoc: '',
            display: false,//trạng thái dialog form
            dskhoahoc: [],//danh sách các khóa học
            globalFilter: null,//giá trị lọc
            showAddEdit: true,//trạng thái form edit và add
            sttThem: false,
            editInfo: {}//đối tượng cần chỉnh sửa hoặc xóa
        };
        this.service = new CarService();
        this.service.getKhoaHoc().then(data => this.setState({ dskhoahoc: data }));

    }
    componentDidMount() {
        this.service.getMonHoc().then(data => this.setState({ dataTableValue: data }));

    }
    //lấy giá trị khi input thay đổi
    onChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        console.log(value);

        this.setState({
            [name]: value
        }
        );
    }
    onChangeKhoaHoc = (event) => {
        console.log(event.value.makhoahoc);
        var value = event.target.value;
        this.setState({
            makhoahoc: value
        }
        );
        console.log(value);
    }
    //xử lí khi thêm
    onSubmit = (event) => {
        event.preventDefault();
        var item = {};
        var check = true;
        item.mamonhoc = this.state.mamonhoc;
        item.makhoahoc = this.state.makhoahoc.makhoahoc;
        item.tenmonhoc = this.state.tenmonhoc;
        item.hocphi = parseFloat(this.state.hocphi);
        item.sotiethoc = this.state.sotiethoc;
        console.log(item);
        this.setState({ display: false })
        if (item.mamonhoc.length < 7) {
            this.state.dataTableValue.forEach((value, key) => {
                if (value.mamonhoc === item.mamonhoc) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                    check = false;
                    return;
                }
            });
            console.log(check);
            if (check === true) {
                this.service.themMonHoc(item).then((response) => {
                    if (response.ok) {
                        console.log("ok");
                        this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Thêm Thành Công' });
                        this.service.getMonHoc().then(data => this.setState({ dataTableValue: data }));
                        return response.json();
                    }
                    else {
                        console.log(response.status)
                        this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Thêm Thất Bại' });
                    }
                }).catch(err => console.log(err));
            }
        }


    }
   
    //form thêm
    addKhoaHoc = () => {
        var dialogFooter = (
            <div>
                <Button icon="pi pi-check" onClick={(event) => this.onSubmit(event)} label="Thêm" disabled={this.state.sttThem} />
                <Button icon="pi pi-times" onClick={() => this.setState({ display: false })} label="Hủy" className="p-button-secondary" />
            </div>
        );
        var header = "THÊM MÔN HỌC";

        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="mamonhoc" size="70" type="text" name="mamonhoc" value={this.state.mamonhoc} onChange={event => this.onChange(event)} />
                        <label htmlFor="mamonhoc">Mã Môn Học</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown tooltip="Chọn khóa học" value={this.state.makhoahoc} options={this.state.dskhoahoc} onChange={this.onChangeKhoaHoc} placeholder="Select Khóa Học" optionLabel="tenkhoahoc" optionValue="makhoahoc" />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="tenmonhoc" size="70" type="text" name="tenmonhoc" value={this.state.tenmonhoc} onChange={event => this.onChange(event)} />
                        <label htmlFor="tenmonhoc">Tên Môn Học</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText keyfilter="money" id="hocphi" size="70" type="text" name="hocphi" value={this.state.hocphi} onChange={event => this.onChange(event)} />
                        <label htmlFor="hocphi">Học Phí</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <Spinner readonly value={this.state.sotiethoc} id="sotiethoc" name="sotiethoc" onChange={event => this.onChange(event)} min={0} max={20} />
                        <label htmlFor="sotiethoc">Số Tiết Học</label>
                    </span>
                </div>
            </Dialog>

        </div>;
    }
    //form edit
    EditMember = () => {

        var dialogFooter = (
            <div>
                <Button icon="pi pi-check" label="Save" onClick={event => this.saveEdit(event)} />
                <Button icon="pi pi-times" onClick={() => this.setState({ display: false })} label="Hủy" className="p-button-secondary" />
            </div>
        );
        var header = "SỬA MÔN HỌC";


        const spanStyle = {
            color: 'blue',
            height: '55px'
        };
        return <div>
            <Dialog header={header} visible={this.state.display} modal={true} width="400px" footer={dialogFooter} onHide={() => this.setState({ display: false })}>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText disabled tooltip="Mã Môn Học" tooltipOptions={{ event: 'focus' }} id="mamonhoc" size="70" type="text" name="mamonhoc" value={this.state.mamonhoc} onChange={event => this.onChange(event)} />
                        <label htmlFor="mamonhoc">Mã Môn Học</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span>
                        <Dropdown tooltip="Chọn khóa học" value={this.state.makhoahoc} options={this.state.dskhoahoc} ariaLabel="Test" onChange={this.onChangeKhoaHoc} placeholder="Select đơn vị" optionLabel="tenkhoahoc" optionValue="makhoahoc" />
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText id="tenmonhoc" size="70" type="text" name="tenmonhoc" value={this.state.tenmonhoc} onChange={event => this.onChange(event)} />
                        <label htmlFor="tenmonhoc">Tên Môn Học</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <InputText keyfilter="money" id="hocphi" size="70" type="text" name="hocphi" value={this.state.hocphi} onChange={event => this.onChange(event)} />
                        <label htmlFor="hocphi">Học Phí</label>
                    </span>
                </div>
                <div className="p-col-12" style={spanStyle}>
                    <span className="p-float-label">
                        <Spinner readonly value={this.state.sotiethoc} id="sotiethoc" name="sotiethoc" onChange={event => this.onChange(event)} min={0} max={20} />
                        <label htmlFor="sotiethoc">Số Tiết Học</label>
                    </span>
                </div>
            </Dialog>

        </div>;
    }
    renderHeader() {
        return (
            <div>
                DANH SÁCH MÔN HỌC
                <div className="p-col-12 p-md-4" style={{ textAlign: 'left' }}>
                    <div className="p-datatable-globalfilter-container">
                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Môn Học Search" />
                    </div>
                </div>
            </div>
        );
    }
    //hàm lấy thông tin chỉnh sửa của 1 đối tượng
    Edit = (event) => {
        console.log(event);
        console.log(event.value);
        this.state.dskhoahoc.forEach((val, i) => {
            if (val.makhoahoc === event.value.makhoahoc) {
                this.setState({ makhoahoc: val });
                return;
            }
        });
        this.setState({
            mamonhoc: event.value.mamonhoc,
            tenmonhoc: event.value.tenmonhoc,
            hocphi: event.value.hocphi,
            sotiethoc: event.value.sotiethoc,
            dataTableSelection: event.value,
            editInfo: event.value
        });
    }
    //hàm hiển thị form thêm
    showThem = () => {
        this.setState({
            display: true,
            showAddEdit: true,  //hiển thị form thêm
            mamonhoc: '',
            makhoahoc: '',
            tenmonhoc: '',
            hocphi: '',
            sotiethoc: ''
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
            return this.addKhoaHoc();
        }
        else if (this.state.showAddEdit === false) {
            return this.EditMember();
        }

    }
    //lưu đối tượng được chỉnh sửa
    saveEdit = (event) => {
        event.preventDefault();
        var item = {};
        item.mamonhoc = this.state.mamonhoc;
        item.makhoahoc = this.state.makhoahoc.makhoahoc;
        item.tenmonhoc = this.state.tenmonhoc;
        item.hocphi = parseFloat(this.state.hocphi);
        item.sotiethoc = this.state.sotiethoc;
        console.log(item);
        this.service.suaMonHoc(item).then((response) => {
            if (response.ok) {
                console.log("ok");
                this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Sửa Thành Công' });
                this.setState({ display: false });
                this.service.getMonHoc().then(data => this.setState({ dataTableValue: data }));

            }
            else {
                this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Sửa Thất Bại' });

            }
        });


    }
    // xóa đối tượng được chọn
    onClickDelete = () => {
        var items = this.state.dataTableValue.filter(temp => temp.mamonhoc !== this.state.editInfo.mamonhoc);
        console.log(items);
        this.service.deleteMonHoc(this.state.editInfo.mamonhoc).then((response) => {
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
    render() {
        let cols = [
            { field: 'mamonhoc', header: 'Mã Môn Học' },
            { field: 'makhoahoc', header: 'Mã Khóa Học' },
            { field: 'tenmonhoc', header: 'Tên Môn Học' },
            { field: 'hocphi', header: 'Học Phí' },
            { field: 'sotiethoc', header: 'Số Tiết Học' }
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