import React, {Component} from 'react';
import {CarService} from '../service/CarService';
import {InputText} from 'primereact/inputtext';
import {DataTable} from 'primereact/datatable';
import {Button} from 'primereact/button';
import {Panel} from 'primereact/panel';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { Growl } from 'primereact/growl';

export class DonViHocVien extends Component {
    static displayName = DonViHocVien.name;
    constructor(props) {
        super(props);
        this.state = {
            dataTableValue : [],
            dataTableSelection: null,
            madonvi: '',
            tendonvi: '',
            diachi: '',
            sttSelect: false,
            err: true,  //trạng thái của lỗi
            add: true,  //trạng thái hiểnt thị của form add or edit
            editInfo: {},   //đối tượng được chọn trong dataTableValue
            dshv: []    //danh sach hoc vien
           
            
        };
        this.service = new CarService();
        
        
    }
    componentDidMount() {
        
        this.service.getDonViHocVien().then(data => this.setState({ dataTableValue: data }));
        this.service.getHocVien().then(data => this.setState({ dshv: data }));
    }
    

    //lấy giá trị thay đổi trong input
    onChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        console.log(name);
        if (name === "madonvi") {
            console.log(value.length);
            if (value.length > 6)
                this.setState({ err: false });
            else {
                this.setState({ err: true });
            }
        }
            
        this.setState({
            [name]: value
        }
        );
    }

    //hiển thị thông báo lỗi
    showError() {
       if (this.state.err === false) {
           return <Message severity="error" text="Số kí tự phải ít hơn 7." />;
       }
    }

    //hàm xử lí khi ấn vào button thêm
    onSubmit = (event) => {
        event.preventDefault();
        var item = {};
        var check = true;
        item.madonvi = this.state.madonvi;
        item.tendonvi = this.state.tendonvi;
        item.diachi = this.state.diachi;
        console.log(item);
        console.log(item.madonvi.length);
        if (item.madonvi.length < 7) {
            this.state.dataTableValue.forEach((value, key) => {
                if (value.madonvi === item.madonvi) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                    check = false;
                    return;
                }
            });
            console.log(check);
            if (check === true) {
                this.service.themdonvihocvien(item).then((response) => {
                    if (response.ok) {
                        console.log("ok");
                        this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Thêm Thành Công' });
                        this.service.getDonViHocVien().then(data => this.setState({ dataTableValue: data })); 
                        this.setState({
                            madonvi: '',
                            tendonvi: '',
                            diachi: ''
                        });
                        return response.json();
                    }
                    else {
                        this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Thêm Thất Bại' });
                    }
                });
            }
        } else {
            this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Số kí tự MÃ ĐƠN VỊ phải nhỏ hơn 7' });

        }
        
      
        
    }
    //lấy giá trị dùng để chỉnh sửa
    Edit = (event) => {
        console.log(event.value.madonvi);
        if (this.state.sttSelect === true) {
            this.setState({
                madonvi: event.value.madonvi,
                tendonvi: event.value.tendonvi,
                diachi: event.value.diachi
                
            });
        }
        this.setState({
            editInfo: event,
            dataTableSelection: event.value
        });
    }

    //cập nhật lại thông tin đối tượng cần chỉnh sửa state khi chỉnh sửa
    saveEdit = (event) => {
        event.preventDefault();
        var item = {};
        item.madonvi = this.state.madonvi;
        item.tendonvi = this.state.tendonvi;
        item.diachi = this.state.diachi;
        console.log(item);
        this.service.suaDocViHocVien(item).then((response) => {
            if (response.ok) {
                console.log("ok");
                
                this.state.dataTableValue.forEach((value, key) => {
                    if (value.madonvi === item.madonvi) {
                        value.tendonvi = item.tendonvi;
                        value.diachi = item.diachi;
                    }
                });
                this.setState({
                    madonvi: '',
                    tendonvi: '',
                    diachi:''

                });
                this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Sửa Thành Công' });
            }
            else {
                console.log(response.errors);
                this.growl.show({ severity: 'error', summary: 'Error  Message', detail: 'Sửa Thất Bại' });

            }
        });
        
    }

    //form chỉnh sửa
    EditMember = () => {
        return <Panel header="Sửa Đơn Vị">
            <div className="p-grid">
                <div className="p-col-12">
                    <InputText type="text" name="madonvi" placeholder="Mã Đơn Vị" value={this.state.madonvi} onChange={event => this.onChange(event)} disabled />
                </div>
                <div className="p-col-12">
                    <InputText type="text" name="tendonvi" placeholder="Tên Đơn Vị" value={this.state.tendonvi} onChange={event => this.onChange(event)} />
                </div>
                <div className="p-col-12">
                    <InputText type="text" name="diachi" placeholder="Địa Chỉ" value={this.state.diachi} onChange={event => this.onChange(event)} />
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
            madonvi: '',
            tendonvi: '',
            diachi: ''
        });
    }
    //form thêm thông tin
    Add = () => {
        return <Panel header="Thêm Đơn Vị">
            <div className="p-grid">
                <div className="p-col-12">
                    {this.showError()}
                    <InputText type="text" name="madonvi" placeholder="Mã Đơn Vị" value={this.state.madonvi} onChange={event => this.onChange(event)} />
                </div>
                <div className="p-col-12">
                    <InputText type="text" name="tendonvi" placeholder="Tên Đơn Vị" value={this.state.tendonvi} onChange={event => this.onChange(event)} />
                </div>
                <div className="p-col-12">
                    <InputText type="text" name="diachi" placeholder="Địa Chỉ" value={this.state.diachi} onChange={event => this.onChange(event)} />
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
            return  this.Add() ;
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
            madonvi: '',
            tendonvi: '',
            diachi:''
        });
        
    }
    //hiển thị button edit
    onEdit = () => {
        return <Button label="Edit" className="p-button-info p-button-raised" onClick={this.onClickEdit} />;
    }
    //hàm xử lí xóa khi click vào delete
    onClickDelete = () => {
        var items = this.state.dataTableValue.filter(temp => temp.madonvi !== this.state.editInfo.value.madonvi);
        console.log(items);
        const ck = this.state.dshv.find(value => value.madonvi === this.state.editInfo.value.madonvi);
        console.log(ck);
        if (ck === undefined) {
            console.log("ok");
            this.service.deleteDVHV(this.state.editInfo.value.madonvi).then((response) => {
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
            });;
        }
        else {
            this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Xóa Thất Bại - Tồn Tại Sinh Viên Trong Đơn Vị' });

        }

        
    }

    render() {
        let cols = [
            { field: 'madonvi', header: 'MADONVI' },
            { field: 'tendonvi', header: 'TENDONVI' },
            { field: 'diachi', header: 'DIACHI' }
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
                            <DataTable value={this.state.dataTableValue} header="ĐƠN VỊ HỌC VIÊN" selectionMode="single" selection={this.state.dataTableSelection}
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