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

export class NhomLop extends Component {
    static displayName = NhomLop.name;
    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],
            dataTableSelection: null,
            manhom: '',
            tennhom: '',
            sttSelect: false,
            add: true,  //trạng thái hiểnt thị của form add or edit
            editInfo: {},   //đối tượng được chọn trong dataTableValue
            dsmonhoc: []    //danh sach hoc vien


        };
        this.service = new CarService();
      //  this.service.getMonHoc().then(data => this.setState({ dsmonhoc: data }));

    }
    componentDidMount() {
        this.service.getNhomLop().then(data => this.setState({ dataTableValue: data }));
        console.log(sessionStorage.getItem('name'));
    }
   


    //lấy giá trị thay đổi trong input
    onChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        console.log(value);
        this.setState({
             [name]: value
        });
        
    }

    //hàm xử lí khi ấn vào button thêm
    onSubmit = (event) => {
        event.preventDefault();
        var item = {};
        var check = true;
        item.manhom = this.state.manhom;
        item.tennhom = this.state.tennhom;
        console.log(item);
        if (item.manhom.length < 7) {
            this.state.dataTableValue.forEach((value, key) => {
                if (value.manhom === item.manhom) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                    check = false;
                    return;
                }
            });
            console.log(check);
            if (check === true) {
                this.service.themNhomLop(item).then((response) => {
                    if (response.ok) {
                        console.log("ok");
                        this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Thêm Thành Công' });
                        this.service.getNhomLop().then(data => this.setState({ dataTableValue: data }));
                        this.setState({
                            manhom: '',
                            tennhom: ''
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
        console.log(event.value.manhom);
        if (this.state.sttSelect === true) {
            this.setState({
                manhom: event.value.manhom,
                tennhom: event.value.tennhom
            });
        }
        this.setState({ dataTableSelection: event.value, editInfo: event });
    }

    //cập nhật lại thông tin đối tượng cần chỉnh sửa state khi chỉnh sửa
    saveEdit = (event) => {
        event.preventDefault();
        var item = {};
        item.manhom = this.state.manhom;
        item.tennhom = this.state.tennhom;
        console.log(item);
        this.service.suaNhomLop(item).then((response) => {
            if (response.ok) {
                console.log("ok");
                this.service.getNhomLop().then(data => this.setState({ dataTableValue: data }));
                this.setState({
                    manhom: '',
                    tennhom: ''
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
        return <Panel header="Sửa Nhóm Lớp">
            <div className="p-grid">
                <div className="p-col-12">
                    <span className="p-float-label">
                        <InputText type="text" id="manhom" name="manhom" value={this.state.manhom} onChange={event => this.onChange(event)} disabled />
                        <label htmlFor="manhom">Mã Nhóm</label>

                    </span>
                </div>
                <div className="p-col-12">
                    <span className="p-float-label">
                        <InputText type="text" id="tennhom" name="tennhom" value={this.state.tennhom} onChange={event => this.onChange(event)} />
                        <label htmlFor="tennhom">Tên Nhóm</label>
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
            manhom: '',
            tennhom: ''
        });
    }
    //form thêm thông tin
    Add = () => {
        return <Panel header="Thêm Nhóm Lớp">
            <div className="p-grid">
                <div className="p-col-12" style={{ height: '55px' }}>
                    <span className="p-float-label">
                        <InputText type="text" id="manhom" name="manhom" value={this.state.manhom} onChange={event => this.onChange(event)} />
                        <label htmlFor="manhom">Mã Nhóm</label>

                    </span>
                </div>
                <div className="p-col-12" style={{ height: '55px' }}>
                    <span className="p-float-label">
                        <InputText type="text" id="tennhom" name="tennhom" value={this.state.tennhom} onChange={event => this.onChange(event)} />
                        <label htmlFor="tennhom">Tên Nhóm</label>
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
            manhom: '',
            tennhom: ''
        });

    }
    //hiển thị button edit
    onEdit = () => {
        return <Button label="Edit" className="p-button-info p-button-raised" onClick={this.onClickEdit} />;
    }
    //hàm xử lí xóa khi click vào delete
    onClickDelete = () => {
        var items = this.state.dataTableValue.filter(temp => temp.manhom !== this.state.editInfo.value.manhom);
        console.log(items);
        //const ck = this.state.dsmonhoc.find(value => value.manhom === this.state.editInfo.value.manhom);
        //console.log(ck);
        //if (ck === undefined) {
            console.log("ok");
            this.service.deleteNhomLop(this.state.editInfo.value.manhom).then((response) => {
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
        //}
        //else {
        //    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Xóa Thất Bại - Tồn Tại Môn Học Trong Khóa Học' });

        //}


    }

    render() {
        let cols = [
            { field: 'manhom', header: 'Mã Nhóm Lớp' },
            { field: 'tennhom', header: 'Tên Nhóm Lớp' }
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
                            <DataTable value={this.state.dataTableValue} header="DANH SÁCH NHÓM LỚP HỌC" selectionMode="single" selection={this.state.dataTableSelection}
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