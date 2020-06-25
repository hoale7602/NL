import React, { Component } from 'react';
import { CarService } from '../service/CarService';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { Growl } from 'primereact/growl';
import { Calendar } from 'primereact/calendar';


export class KhoaHoc extends Component {
    static displayName = KhoaHoc.name;

    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],
            dataTableSelection: null,
            makhoahoc: '',
            tenkhoahoc: '',
            ngaybd: '',
            ngaykt: '',
            minDate: '',
            minDatekt: '',
            sttSelect: false,
            add: true,  //trạng thái hiểnt thị của form add or edit
            editInfo: {},   //đối tượng được chọn trong dataTableValue
            dsmonhoc: []    //danh sach hoc vien


        };
        this.service = new CarService();
        this.service.getMonHoc().then(data => this.setState({ dsmonhoc: data }));

    }
    componentDidMount() {
        this.loadData();
        this.setDate();
    }
    setDate = () => {
        var today = new Date();
        var month = today.getMonth();
        var year = today.getFullYear();        
        var nextMonth = (month === 11) ? 0 : month + 1;
        var nextYear = (nextMonth === 0) ? year + 1 : year;

        var minDate = new Date();
        minDate.setMonth(nextMonth);
        minDate.setFullYear(nextYear);
        console.log(today);
        console.log(nextMonth);
        console.log(minDate);
        this.setState({
            minDatekt: minDate,
            minDate: today
        });
    }
    loadData = () => {
        this.service.getKhoaHoc().then(data => {
            var obj = JSON.parse(JSON.stringify(data));
            console.log(data);
            obj.map((value, i) => {
                var date = new Date(obj[i].ngaybd);
                var date1 = new Date(obj[i].ngaykt);
                value.ngaybd = date.toLocaleDateString();
                value.ngaykt = date1.toLocaleDateString();  
                return null;
            });
                  console.log(obj);
            this.setState({ dataTableValue: obj });
        });
    }


    //lấy giá trị thay đổi trong input
    onChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        console.log(value);
        if (name === "ngaybd" || name === "ngaykt") {

            var ngay = new Date(value);
            ngay.setHours(8);
            console.log(ngay);
            this.setState({
                [name]: ngay
            });
        } else {

            this.setState({
                [name]: value
            }
            );
        }
    }

    //hàm xử lí khi ấn vào button thêm
    onSubmit = (event) => {
        event.preventDefault();
        var item = {};
        var check = true;
        item.makhoahoc = this.state.makhoahoc;
        item.tenkhoahoc = this.state.tenkhoahoc;
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

        console.log(item);
        if (item.makhoahoc.length < 7) {
            this.state.dataTableValue.forEach((value, key) => {
                if (value.makhoahoc === item.makhoahoc) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                    check = false;
                    return;
                }
            });
            console.log(check);
            if (check === true) {
                this.service.themKhoaHoc(item).then((response) => {
                    if (response.ok) {
                        console.log("ok");
                        this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Thêm Thành Công' });
                        this.loadData();
                        this.setState({
                            makhoahoc: '',
                            tenkhoahoc: '',
                            ngaybd: '',
                            ngaykt:''
                        });
                        return response.json();
                    }
                    else {
                        this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Thêm Thất Bại' });
                    }
                }).catch(er => console.log(er));
            }
        } else {
            this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Số kí tự MÃ ĐƠN VỊ phải nhỏ hơn 7' });

        }



    }
    //lấy giá trị dùng để chỉnh sửa
    Edit = (event) => {
        console.log(event.value.makhoahoc);
        if (this.state.sttSelect === true) {
            this.setState({
                makhoahoc: event.value.makhoahoc,
                tenkhoahoc: event.value.tenkhoahoc,
                ngaybd: event.value.ngaybd,
                ngaykt: event.value.ngaykt
            });
        }
        this.setState({ dataTableSelection: event.value, editInfo: event});
    }

    //cập nhật lại thông tin đối tượng cần chỉnh sửa state khi chỉnh sửa
    saveEdit = (event) => {
        event.preventDefault();
        var item = {};
        item.makhoahoc = this.state.makhoahoc;
        item.tenkhoahoc = this.state.tenkhoahoc;
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
        console.log(item);
        this.service.suaKhoaHoc(item).then((response) => {
            if (response.ok) {
                console.log("ok");
                this.loadData();
                this.setState({
                    makhoahoc: '',
                    tenkhoahoc: '',
                    ngaybd: '',
                    ngaykt:''
                });
                this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Sửa Thành Công' });
            }
            else {
                this.growl.show({ severity: 'error', summary: 'Error  Message', detail: 'Sửa Thất Bại' });
            }
        });

    }

    //form chỉnh sửa
    EditMember = () => {
        return <Panel header="Sửa Đơn Vị">
            <div className="p-grid">
                <div className="p-col-12">
                    <span className="p-float-label">
                        <InputText type="text" id="makhoahoc" name="makhoahoc" value={this.state.makhoahoc} onChange={event => this.onChange(event)} disabled />
                        <label htmlFor="makhoahoc">Mã Khóa Học</label>

                    </span>
                </div>
                <div className="p-col-12">
                     <span className="p-float-label">
                        <InputText type="text" id="tenkhoahoc" name="tenkhoahoc" value={this.state.tenkhoahoc} onChange={event => this.onChange(event)} />
                        <label htmlFor="tenkhoahoc">Tên Khóa Học</label>
                     </span>
                </div>
                <div className="p-col-12">
                    <span className="p-float-label">
                        <Calendar dateFormat="dd/mm/yy" id="ngaybd" name="ngaybd" value={this.state.ngaybd} onChange={event => this.onChange(event)} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
                        <label htmlFor="ngaybd">  Ngày Bắt Đầu</label>
                    </span>
                </div>
                <div className="p-col-12">
                    <span className="p-float-label">
                        <Calendar dateFormat="dd/mm/yy" id="ngaykt" name="ngaykt" value={this.state.ngaykt} onChange={event => this.onChange(event)} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
                        <label htmlFor="ngaykt">  Ngày Kết Thúc</label>
                    </span>
                </div>

                <div className="p-lg-6">
                    <Button type="button" label="Save" icon="fa-send" onClick={event => this.saveEdit(event)} />
                </div>
                <div className="p-lg-6">
                    <Button type="button" label="Hủy" icon="fa-send" onClick={this.onClickEdit} />
                </div>

            </div>
        </Panel>;

    }
    //xóa dữ liệu trong ô input
    clearData = () => {
        this.setState({
            makhoahoc: '',
            tenkhoahoc: '',
            ngaybd: '',
            ngaykt:''
        });
    }
    //form thêm thông tin
    Add = () => {
        return <Panel header="Thêm Khóa Học">
            <div className="p-grid">
                <div className="p-col-12" style={{ height: '55px' }}>
                    <span className="p-float-label">
                        <InputText type="text" id="makhoahoc" name="makhoahoc" value={this.state.makhoahoc} onChange={event => this.onChange(event)} />
                        <label htmlFor="makhoahoc">Mã Khóa Học</label>

                    </span>
                </div>
                <div className="p-col-12" style={{ height: '55px' }}>
                    <span className="p-float-label">
                        <InputText type="text" id="tenkhoahoc" name="tenkhoahoc" value={this.state.tenkhoahoc} onChange={event => this.onChange(event)} />
                        <label htmlFor="tenkhoahoc">Tên Khóa Học</label>
                    </span>
                </div>
                <div className="p-col-12" style={{ height: '55px' }}>
                    <span className="p-float-label">
                        <Calendar minDate={this.state.minDate} dateFormat="dd/mm/yy" id="ngaybd" name="ngaybd" value={this.state.ngaybd} onChange={event => this.onChange(event)} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
                        <label htmlFor="ngaybd">  Ngày Bắt Đầu</label>
                    </span>
                </div>
                <div className="p-col-12" style={{ height: '55px' }}>
                    <span className="p-float-label">
                        <Calendar minDate={this.state.minDatekt} dateFormat="dd/mm/yy" id="ngaykt" name="ngaykt" value={this.state.ngaykt} onChange={event => this.onChange(event)} monthNavigator={true} yearNavigator={true} yearRange="2010:2030" />
                        <label htmlFor="ngaykt">  Ngày Kết Thúc</label>
                    </span>
                </div>
                <div className="p-lg-6">
                    <Button type="button" label="Thêm" icon="fa-send" onClick={event => this.onSubmit(event)} />
                </div>
                <div className="p-lg-6">
                    <Button type="button" label="Clear" icon="fa-send" onClick={this.clearData} />
                </div>
            </div>
        </Panel>;
    }

    //hàm hiển thị form thêm or edit
    showAddandEdit = () => {
        if (this.state.add === true) {
            return this.Add();
        }
        else if (this.state.add === false) {
            return this.EditMember();
        }

    }
    //hàm xử lí khi click vào edit
    onClickEdit = () => {

        this.setState({
            add: !this.state.add,
            sttSelect: !this.state.sttSelect,
            makhoahoc: '',
            tenkhoahoc: '',
            ngaybd: '',
            ngaykt: ''
        });

    }
    //hiển thị button edit
    onEdit = () => {
        return <Button label="Edit" className="p-button-info p-button-raised" onClick={this.onClickEdit} />;
    }
    //hàm xử lí xóa khi click vào delete
    onClickDelete = () => {
        var items = this.state.dataTableValue.filter(temp => temp.makhoahoc !== this.state.editInfo.value.makhoahoc);
        console.log(items);
        const ck = this.state.dsmonhoc.find(value => value.makhoahoc === this.state.editInfo.value.makhoahoc);
        console.log(ck);
        if (ck === undefined) {
            console.log("ok");
            this.service.deleteKhoaHoc(this.state.editInfo.value.makhoahoc).then((response) => {
                if (response.ok) {
                    console.log("ok");
                    this.setState({ dataTableValue: items });
                    this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Xóa Thành Công' });

                    return response.json();
                }
                else {
                    console.log("lỗi");
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Xóa Thất Bại' });

                }
            });
        }
        else {
            this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Xóa Thất Bại - Tồn Tại Môn Học Trong Khóa Học' });

        }


    }

    render() {
        let cols = [
            { field: 'makhoahoc', header: 'Mã Khóa Học' },
            { field: 'tenkhoahoc', header: 'Tên Khóa Học' },
            { field: 'ngaybd', header: 'Ngày BĐ' },
            { field: 'ngaykt', header: 'Ngày KT' }
        ];

        let dynamicColumns = cols.map((col, i) => {
            return <Column key={col.field} field={col.field} header={col.header} sortable={true} />;
        });


        return (
            <div className="p-fluid">
                <div className="p-grid">
                    <div className="p-col-12 p-lg-4 p-fluid contact-form">
                        <Growl ref={(el) => this.growl = el} />
                        {this.showAddandEdit()}
                    </div>
                    <div className="p-col-12 p-lg-8">
                        <div className="card card-w-title">
                            <div className="p-grid">
                                <div className="p-col-12 p-md-4">
                                    {this.onEdit()}</div>
                                <div className="p-col-12 p-md-4">
                                    <Button label="Delete" className="p-button-info p-button-raised" onClick={this.onClickDelete} />
                                </div>
                            </div>
                            <DataTable value={this.state.dataTableValue} header="DANH SÁCH KHÓA HỌC" selectionMode="single" selection={this.state.dataTableSelection}
                                onSelectionChange={event => this.Edit(event)}>
                                {dynamicColumns}
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}