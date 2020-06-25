import React, { Component } from 'react';
import { CarService } from '../service/CarService';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { Growl } from 'primereact/growl';

export class KyThi extends Component {
    static displayName = KyThi.name;
    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],
            dataTableSelection: null,
            makythi: '',
            tenkythi: '',
            sttSelect: false,
            err: true,  //trạng thái của lỗi
            add: true,  //trạng thái hiểnt thị của form add or edit
            editInfo: {},   //đối tượng được chọn trong dataTableValue
            dsphonghoc: []    //danh sach phòng học


        };
        this.service = new CarService();


    }
    componentDidMount() {

        this.service.getKyThi().then(data => this.setState({ dataTableValue: data }));
     //   this.service.getPhongHoc().then(data => this.setState({ dsphonghoc: data }));
    }


    //lấy giá trị thay đổi trong input
    onChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        console.log(name);
        if (name === "makythi") {
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
        item.makythi = this.state.makythi;
        item.tenkythi = this.state.tenkythi;
        console.log(item);
        console.log(item.makythi.length);
        if (item.makythi.length < 7) {
            this.state.dataTableValue.forEach((value, key) => {
                if (value.makythi === item.makythi) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                    check = false;
                    return;
                }
            });
            console.log(check);
            if (check === true) {
                this.service.themKyThi(item).then((response) => {
                    if (response.ok) {
                        console.log("ok");
                        this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Thêm Thành Công' });
                        this.service.getKyThi().then(data => this.setState({ dataTableValue: data }));
                        this.setState({
                            makythi: '',
                            tenkythi: ''
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
        console.log(event.value.makythi);
        if (this.state.sttSelect === true) {
            this.setState({
                makythi: event.value.makythi,
                tenkythi: event.value.tenkythi

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
        item.makythi = this.state.makythi;
        item.tenkythi = this.state.tenkythi;
        console.log(item);
        this.service.suaKyThi(item).then((response) => {
            if (response.ok) {
                console.log("ok");

                this.state.dataTableValue.forEach((value, key) => {
                    if (value.makythi === item.makythi) {
                        value.tenkythi = item.tenkythi;
                    }
                });
                this.setState({
                    makythi: '',
                    tenkythi: ''

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
        return <Panel header="Sửa Kỳ Thi">
            <div className="p-grid">
                <div className="p-col-12">
                    <InputText type="text" name="makythi" placeholder="Mã Kỳ Thi" value={this.state.makythi} onChange={event => this.onChange(event)} disabled />
                </div>
                <div className="p-col-12">
                    <InputText type="text" name="tenkythi" placeholder="Tên Kỳ Thi" value={this.state.tenkythi} onChange={event => this.onChange(event)} />
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
            makythi: '',
            tenkythi: ''
        });
    }
    //form thêm thông tin
    Add = () => {
        return <Panel header="Thêm Kỳ Thi">
            <div className="p-grid">
                <div className="p-col-12">
                    {this.showError()}
                    <InputText type="text" name="makythi" placeholder="Mã Kỳ Thi" value={this.state.makythi} onChange={event => this.onChange(event)} />
                </div>
                <div className="p-col-12">
                    <InputText type="text" name="tenkythi" placeholder="Tên Kỳ Thi" value={this.state.tenkythi} onChange={event => this.onChange(event)} />
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
            makythi: '',
            tenkythi: ''
        });

    }
    //hiển thị button edit
    onEdit = () => {
        return <Button label="Edit" className="p-button-info p-button-raised" onClick={this.onClickEdit} />;
    }
    //hàm xử lí xóa khi click vào delete
    onClickDelete = () => {
        var items = this.state.dataTableValue.filter(temp => temp.makythi !== this.state.editInfo.value.makythi);
        console.log(items);
        const ck = this.state.dsphonghoc.find(value => value.makythi === this.state.editInfo.value.makythi);
        console.log(ck);
        if (ck === undefined) {
            console.log("ok");
            this.service.deleteKyThi(this.state.editInfo.value.makythi).then((response) => {
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
            this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Xóa Thất Bại - Tồn Tại Phòng Học' });

        }


    }

    render() {
        let cols = [
            { field: 'makythi', header: 'Mã Kỳ Thi' },
            { field: 'tenkythi', header: 'Tên Kỳ Thi' }
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
                            <DataTable value={this.state.dataTableValue} header="DANH SÁCH KỲ THI" selectionMode="single" selection={this.state.dataTableSelection}
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