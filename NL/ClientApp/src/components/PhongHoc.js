import React, { Component } from 'react';
import { CarService } from '../service/CarService';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { Growl } from 'primereact/growl';
import { Dropdown } from 'primereact/dropdown';


export class PhongHoc extends Component {
    static displayName = PhongHoc.name;
    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],
            dataTableSelection: null,
            maphong: '',
            madiadiem: '',
            tenphong: '',
            sttSelect: false,
            err: true,  //trạng thái của lỗi
            add: true,  //trạng thái hiểnt thị của form add or edit
            editInfo: {},   //đối tượng được chọn trong dataTableValue
            dsdiadiem: []    //danh sach địa điểm


        };
        this.service = new CarService();


    }
    componentDidMount() {

        this.service.getDiaDiem().then(data => this.setState({ dsdiadiem: data }));
        this.service.getPhongHoc().then(data => this.setState({ dataTableValue: data }));
    }


    //lấy giá trị thay đổi trong input
    onChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        console.log(name);
        if (name === "maphong") {
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
    onChangeDiaDiem = (event) => {
        console.log(event.value.madonvi);
        var value = event.target.value;
        this.setState({
            madiadiem: value
        }
        );
        console.log(value.madiadiem);
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
        item.maphong = this.state.maphong;
        item.madiadiem = this.state.madiadiem.madiadiem;
        item.tenphong = this.state.tenphong;
        console.log(item);
        console.log(item.maphong.length);
        if (item.maphong.length < 7) {
            this.state.dataTableValue.forEach((value, key) => {
                if (value.maphong === item.maphong) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                    check = false;
                    return;
                }
            });
            console.log(check);
            if (check === true) {
                this.service.themPhongHoc(item).then((response) => {
                    if (response.ok) {
                        console.log("ok");
                        this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Thêm Thành Công' });
                        this.service.getPhongHoc().then(data => this.setState({ dataTableValue: data }));
                        this.setState({
                            maphong: '',
                            madiadiem: '',
                            tenphong: ''
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
        console.log(event.value.maphong);
        if (this.state.sttSelect === true) {
            this.state.dsdiadiem.forEach((val, i) => {
                if (val.madiadiem === event.value.madiadiem) {
                    this.setState({ madiadiem: val });
                    return;
                }
            });
            this.setState({
                maphong: event.value.maphong,
                tenphong: event.value.tenphong

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
        item.maphong = this.state.maphong;
        item.madiadiem = this.state.madiadiem.madiadiem;
        item.tenphong = this.state.tenphong;
        console.log(item);
        this.service.suaPhongHoc(item).then((response) => {
            if (response.ok) {
                console.log("ok");

                this.state.dataTableValue.forEach((value, key) => {
                    if (value.maphong === item.maphong) {
                        value.madiadiem = item.madiadiem;
                        value.tenphong = item.tenphong;
                    }
                });
                this.setState({
                    maphong: '',
                    madiadiem: '',
                    tenphong: ''

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
        return <Panel header="Sửa Phòng Học">
            <div className="p-grid">
                <div className="p-col-12">
                    <InputText type="text" name="maphong" placeholder="Mã Phòng" value={this.state.maphong} onChange={event => this.onChange(event)} disabled />
                </div>
                <div className="p-col-12">
                    <Dropdown name="madiadiem" value={this.state.madiadiem} options={this.state.dsdiadiem} ariaLabel="Test" onChange={this.onChangeDiaDiem} placeholder="Chọn Địa Điểm" optionLabel="tendiadiem" optionValue="madiadiem" />
                </div>
                <div className="p-col-12">
                    <InputText type="text" name="tenphong" placeholder="Tên Phòng" value={this.state.tenphong} onChange={event => this.onChange(event)} />
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
            maphong: '',
            madiadiem: '',
            tenphong: ''
        });
    }
    //form thêm thông tin
    Add = () => {
        return <Panel header="Thêm Phòng Học">
            <div className="p-grid">
                <div className="p-col-12">
                    {this.showError()}
                    <InputText type="text" name="maphong" placeholder="Mã Phòng" value={this.state.maphong} onChange={event => this.onChange(event)} />
                </div>
                <div className="p-col-12">
                    <Dropdown name="madiadiem" value={this.state.madiadiem} options={this.state.dsdiadiem} ariaLabel="Test" onChange={this.onChangeDiaDiem} placeholder="Chọn Địa Điểm" optionLabel="tendiadiem" optionValue="madiadiem" />
                </div>
                <div className="p-col-12">
                    <InputText type="text" name="tenphong" placeholder="Tên Phòng" value={this.state.tenphong} onChange={event => this.onChange(event)} />
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
            maphong: '',
            madiadiem: '',
            tenphong: ''
        });

    }
    //hiển thị button edit
    onEdit = () => {
        return <Button label="Edit" className="p-button-info p-button-raised" onClick={this.onClickEdit} />;
    }
    //hàm xử lí xóa khi click vào delete
    onClickDelete = () => {
        var items = this.state.dataTableValue.filter(temp => temp.maphong !== this.state.editInfo.value.maphong);
        console.log(items);
        //const ck = this.state.dsphonghoc.find(value => value.maphong === this.state.editInfo.value.maphong);
        //console.log(ck);
        //if (ck === undefined) {
        //    console.log("ok");
            this.service.deletePhongHoc(this.state.editInfo.value.maphong).then((response) => {
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
            //    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Xóa Thất Bại - Tồn Tại Sinh Viên Trong Đơn Vị' });

            //}


        }

        render() {
            let cols = [
                { field: 'maphong', header: 'Mã Phòng' },
                { field: 'madiadiem', header: 'Mã Địa Điểm' },
                { field: 'tenphong', header: 'Tên Phòng' }
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
                                <DataTable value={this.state.dataTableValue} header="DANH SÁCH PHÒNG HỌC" selectionMode="single" selection={this.state.dataTableSelection}
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