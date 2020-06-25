import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { CarService } from '../service/CarService';
import { Growl } from 'primereact/growl';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export class BienLai extends Component {
    static displayName = BienLai.name;

    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],//danh sách học viên trên state
            dataTableSelection: null,//giá trị khi select
            mabl: '',
            manhanvien: '',
            ngaybl: '',
            noidung: '',
            sotien: '',
            bangchu: '',
            display: false,//trạng thái dialog form
            value2: '',
            donvigv: [],//danh sách các đơn vị của học viên
            globalFilter: null,//giá trị lọc
            showAddEdit: true,//trạng thái form edit và add
            sttThem: true,
            editInfo: {}//đối tượng cần chỉnh sửa hoặc xóa
        };
        this.service = new CarService();
        //this.service.getDonViGiaoVien().then(data => this.setState({ donvigv: data }));
    }
    componentDidMount() {
          this.loadData();
    }

    loadData = () => {
        this.service.getBienLai().then(data => {
            var obj = JSON.parse(JSON.stringify(data));
            console.log(obj);
            obj.map((value, i) => {
                var date = new Date(obj[i].ngaybl);
                value.ngaybl = date.toLocaleDateString();
                return null;
            });
            this.setState({ dataTableValue: obj })
        });
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
    onChangeDonVi = (event) => {
        console.log(event.value.manhanvien);
        var value = event.target.value;
        this.setState({
            manhanvien: value

        }
        );
        console.log(value);
    }
    onChangengaybl = (event) => {
        var value = event.target.value;
        var ngay = new Date(value);
        ngay.setHours(8);
        console.log(ngay);
        this.setState({
            ngaybl: ngay
        });
    }

    //---------------------------------------------------------------------------------------------------
   
    //---------------------------------------------------------------------------------------------------
    onSubmit = (event) => {
      


    }
    //Hàm kiểm tra số điện thoại
    IsMobileNumber = (txtMobId) => {
        var vnf_regex = /((086|096|097|098|032|033|034|035|036|037|038|039|089|090|093|070|079|077|076|078|088|091|094|083|084|085|081|082)+([0-9]{7})\b)/g;
        console.log(txtMobId);
        if (vnf_regex.test(txtMobId) === false) {
            this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Số Điện Thoại Sai Định Dạng!!!' });
            return false;
        }
        return true;
    }
    //Hàm kiểm tra địa chỉ bangchu
    bangchuIsValid = (bangchu) => {
        var eml = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (eml.test(bangchu) === false) {
            this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'bangchu Sai Định Dạng!!!' });
            return false;
        }
        return true;
    }

    addGiaoVien = () => {
       
    }
    EditMember = () => {

        
    }
    renderHeader() {
        return (
            <div>
                DANH SÁCH BIÊN LAI
                <div className="p-col-12 p-md-4" style={{ textAlign: 'left' }}>
                    <div className="p-datatable-globalfilter-container">
                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Biên Lai Search" />
                    </div>
                </div>
            </div>
        );
    }
    //hàm lấy thông tin chỉnh sửa của 1 đối tượng
    Edit = (event) => {
        //console.log(event);
        //console.log(event.value);
        //this.state.donvigv.forEach((val, i) => {
        //    if (val.manhanvien === event.value.manhanvien) {
        //        this.setState({ manhanvien: val });
        //        return;
        //    }
        //});

        //if (event.value.gioitinh === "Nam") {
        //    this.setState({ gioitinh: true });
        //}
        //if (event.value.gioitinh === "Nữ") {
        //    this.setState({ gioitinh: false });
        //}

        //this.setState({
        //    mabl: event.value.mabl,
        //    hoten: event.value.hoten,
        //    ngaybl: event.value.ngaybl,
        //    noidung: event.value.noidung,
        //    sotien: event.value.sotien,
        //    bangchu: event.value.bangchu,
        //    taikhoangv: event.value.taikhoangv,
        //    matkhau: event.value.matkhau,
        //    hesothulao: event.value.hesothulao,
        //    dataTableSelection: event.value,
        //    editInfo: event.value
        //});
    }
    //hàm hiển thị form thêm
    showThem = () => {
        this.setState({
            display: true,
            showAddEdit: true,  //hiển thị form thêm
            mabl: '',
            manhanvien: '',
            hoten: '',
            ngaybl: '',
            noidung: '',
            sotien: '',
            gioitinh: '',
            bangchu: '',
            taikhoangv: '',
            matkhau: '',
            hesothulao: ''
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
        item.mabl = this.state.mabl;
        item.manhanvien = this.state.manhanvien.manhanvien;
        item.hoten = this.state.hoten;
        //item.ngaybl = new Date(this.state.ngaybl);
        // item.ngaybl = this.state.ngaybl;
        var ngaybl = this.state.ngaybl.toString();
        var e = ngaybl.split("/", 3);
        console.log(e);
        if (e.length === 3) {
            item.ngaybl = new Date(e[2], e[1] - 1, e[0], 8);
        }
        else {
            item.ngaybl = this.state.ngaybl;
        }
        item.noidung = this.state.noidung;
        item.sotien = this.state.sotien;
        item.gioitinh = Boolean(this.state.gioitinh);
        item.bangchu = this.state.bangchu;
        item.taikhoangv = this.state.taikhoangv;
        item.matkhau = this.state.matkhau;
        item.hesothulao = this.state.hesothulao;
        console.log(item);
        this.service.suaGiaoVien(item).then((response) => {
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
        var items = this.state.dataTableValue.filter(temp => temp.mabl !== this.state.editInfo.mabl);
        console.log(items);
        this.service.deleteGiaoVien(this.state.editInfo.mabl).then((response) => {
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
    layMatKhau = () => {
        console.log(this.state.editInfo);
        alert("Tên tài khoản: " + this.state.editInfo.taikhoangv + "\n Mật Khẩu:" + this.state.editInfo.matkhau);
    }
    render() {
        let cols = [
            { field: 'mabl', header: 'Mã BL' },
            { field: 'manhanvien', header: 'Mã NV' },
            { field: 'ngaybl', header: 'Ngày Lập' },
            { field: 'noidung', header: 'Nội Dung' },
            { field: 'sotien', header: 'Số Tiền' },
            { field: 'bangchu', header: 'Bằng Chữ' }
        ];

        let dynamicColumns = cols.map((col, i) => {

            return <Column key={col.field} field={col.field} header={col.header} sortable={true} />;
        });
        const header = this.renderHeader();
        return (
            <div className="p-fluid">
                <Growl ref={(el) => this.growl = el} />
                {this.showAddandEdit()}
                <div className="p-grid">
                    <div className="p-col-12">
                        <div className="card card-w-title">
                            <div className="content-section implementation">
                                <DataTable className="p-datatable-customers" rowHover globalFilter={this.state.globalFilter}
                                    emptyMessage="Không tìm thấy thông tin phù hợp" paginator={true}
                                    rows={10} responsive={true} value={this.state.dataTableValue} header={header} rowsPerPageOptions={[5, 10, 15, 30]}
                                    selectionMode="single" selection={this.state.dataTableSelection}
                                    onSelectionChange={event => this.Edit(event)}
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
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