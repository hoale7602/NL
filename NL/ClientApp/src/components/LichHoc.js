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
import { Calendar } from 'primereact/calendar';

export class LichHoc extends Component {
    static displayName = LichHoc.name;
    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],
            dataTableSelection: null,
            malichhoc: '',
            buoihoc: '',
            dsbuoihoc: [
                { label: 'Sáng', value: 'Sáng' },
                { label: 'Chiều', value: 'Chiều' },
                { label: 'Tối', value: 'Tối' }
            ],
            giohoc: '',
            min: '',
            max:'',
            sttSelect: false,
            err: true,  //trạng thái của lỗi
            add: true,  //trạng thái hiểnt thị của form add or edit
            editInfo: {},   //đối tượng được chọn trong dataTableValue
            dshv: []    //danh sach hoc vien


        };
        this.service = new CarService();
        


    }
    componentDidMount() {

        this.service.getLichHoc().then(data => this.setState({ dataTableValue: data }));
        //this.service.getHocVien().then(data => this.setState({ dshv: data }));
        
    }


    //lấy giá trị thay đổi trong input
    onChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        console.log(name);
        console.log(value);
        if (value !== null) {
            if (name === "malichhoc") {
                console.log(value.length);
                if (value.length > 6)
                    this.setState({ err: false });
                else {
                    this.setState({ err: true });
                }
            }
            if (name === "buoihoc") {
                var datemin = new Date();
                var datemax = new Date();
                if (value.value === "Sáng") {
                    datemin.setHours(7);
                    datemin.setMinutes(0);
                    datemax.setHours(11);
                }
                if (value.value === "Chiều") {
                    datemin.setHours(13);
                    datemin.setMinutes(0);
                    datemax.setHours(17);
                }
                if (value.value === "Tối") {
                    datemin.setHours(18);
                    datemin.setMinutes(0);
                    datemax.setHours(21);
                }
                this.setState({ min: datemin, max: datemax, giohoc: datemin });
            }
        } else { this.setState({ min: '', max: '', giohoc: ''}); }
        

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
        item.malichhoc = this.state.malichhoc;
        item.buoihoc = this.state.buoihoc.value;
        var gio = new Date(this.state.giohoc);
        var str = ""+ gio.getHours() + ":" + gio.getMinutes()+"";
        item.giohoc = str;
        console.log(str);
        console.log(item);
        
        if (item.malichhoc.length < 7) {
            this.state.dataTableValue.forEach((value, key) => {
                if (value.malichhoc === item.malichhoc) {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Tồn tại khóa chính - Thêm Thất Bại' });
                    check = false;
                    return;
                }
            });
            console.log(check);
            if (check === true) {
                this.service.themLichHoc(item).then((response) => {
                    if (response.ok) {
                        console.log("ok");
                        this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Thêm Thành Công' });
                        this.service.getLichHoc().then(data => this.setState({ dataTableValue: data }));
                        this.setState({
                            malichhoc: '',
                            buoihoc: '',
                            giohoc: ''
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
        console.log(event.value.buoihoc);
        
        if (this.state.sttSelect === true) {
            this.state.dsbuoihoc.forEach((val, i) => {
                if (val.value === event.value.buoihoc) {
                    this.setState({ buoihoc: val });
                    return;
                }
            });

            var jk = new Date();
            var gf = event.value.giohoc;
            var e = gf.split(":", 2);
            jk.setHours(e[0]);
            jk.setMinutes(e[1]);
            console.log(e);
            console.log(jk);
            this.setState({
                malichhoc: event.value.malichhoc,
                giohoc: jk

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
        item.malichhoc = this.state.malichhoc;
        item.buoihoc = this.state.buoihoc.value;
        var gio = new Date(this.state.giohoc);
        var str = "" + gio.getHours() + ":" + gio.getMinutes() + "";
        item.giohoc = str;
        console.log(item);
        this.service.suaLichHoc(item).then((response) => {
            if (response.ok) {
                console.log("ok");
                this.service.getLichHoc().then(data => this.setState({ dataTableValue: data }));
                this.setState({
                    malichhoc: '',
                    buoihoc: '',
                    giohoc: ''

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
                    <InputText type="text" name="malichhoc" placeholder="Mã Lịch Học" value={this.state.malichhoc} onChange={event => this.onChange(event)} disabled />
                </div>
                <div className="p-col-12">
                    <Dropdown name="buoihoc" value={this.state.buoihoc} options={this.state.dsbuoihoc} onChange={event => this.onChange(event)} showClear={true} optionLabel="label" optionValue="value" />
                </div>
                <div className="p-col-12">
                    <Calendar name="giohoc" value={this.state.giohoc} onChange={event => this.onChange(event)} timeOnly={true} hourFormat="24" />
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
            malichhoc: '',
            buoihoc: '',
            giohoc: ''
        });
    }
    //form thêm thông tin
    Add = () => {
        return <Panel header="Thêm Lịch Học">
            <div className="p-grid">
                <div className="p-col-12">
                    {this.showError()}
                    <InputText type="text" name="malichhoc" placeholder="Mã Lịch Học" value={this.state.malichhoc} onChange={event => this.onChange(event)} />
                </div>
                <div className="p-col-12">
                    <Dropdown name="buoihoc" value={this.state.buoihoc} options={this.state.dsbuoihoc} onChange={event => this.onChange(event)} showClear={true} optionLabel="label" optionValue="value" />
                </div>
                <div className="p-col-12">
                    <Calendar minDate={this.state.min} maxDate={this.state.max} name="giohoc" value={this.state.giohoc} onChange={event => this.onChange(event)} timeOnly={true} hourFormat="24" />
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
            malichhoc: '',
            buoihoc: '',
            giohoc: ''
        });

    }
    //hiển thị button edit
    onEdit = () => {
        return <Button label="Edit" className="p-button-info p-button-raised" onClick={this.onClickEdit} />;
    }
    //hàm xử lí xóa khi click vào delete
    onClickDelete = () => {
        var items = this.state.dataTableValue.filter(temp => temp.malichhoc !== this.state.editInfo.value.malichhoc);
        console.log(items);
        //const ck = this.state.dshv.find(value => value.malichhoc === this.state.editInfo.value.malichhoc);
        //console.log(ck);
        //if (ck === undefined) {
            //console.log("ok");
            this.service.deleteLichHoc(this.state.editInfo.value.malichhoc).then((response) => {
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
        //}
        //else {
        //    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Xóa Thất Bại - Tồn Tại Sinh Viên Trong Đơn Vị' });

        //}


    }

    render() {
        let cols = [
            { field: 'malichhoc', header: 'Mã Lịch Học' },
            { field: 'buoihoc', header: 'Buổi Học' },
            { field: 'giohoc', header: 'Giờ Học' }
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
                            <DataTable value={this.state.dataTableValue} header="LỊCH HỌC" selectionMode="single" selection={this.state.dataTableSelection}
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