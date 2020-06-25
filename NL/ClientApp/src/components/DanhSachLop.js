import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { CarService } from '../service/CarService';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';


export class DanhSachLop extends Component {
    static displayName = DanhSachLop.name;
    constructor(props) {
        super(props);
        this.state = {
            dataTableValue: [],//danh sách học viên trên state
            dataTableSelection: null,//giá trị khi select
            malop: '',
            dslop: [],//danh sách các đơn vị của học viên
            globalFilter: null,//giá trị lọc
        };
        this.service = new CarService();
        this.service.getLop().then(data => this.setState({ dslop: data }));

    }
    componentDidMount() {
        this.loadData();
        this.service.getThongTinCacLop().then(data => console.log(data));
        this.service.getCountHocVien("sx").then(data => console.log(data));
        
    }

    loadData = () => {
        this.service.getDanhSachLopFilter(null).then(data => {

            var obj = JSON.parse(JSON.stringify(data));
            console.log(obj);
            obj.map((value, i) => {
                var date = new Date(obj[i].ngaysinh);
                value.ngaysinh = date.toLocaleDateString();
                return null;
            });
            this.setState({ dataTableValue: obj })
        });
    }
    onChangeDonVi = (event) => {
      //  console.log(event.value.malop);
        var value = event.target.value;
        if (value !== null) {
            this.service.getDanhSachLopFilter(value.malop).then(data => {
                var obj = JSON.parse(JSON.stringify(data));
                console.log(obj);
                obj.map((value, i) => {
                    var date = new Date(obj[i].ngaysinh);
                    value.ngaysinh = date.toLocaleDateString();
                    return null;
                });
                this.setState({ dataTableValue: obj, malop: value });
            });
        }
        else {
            this.service.getDanhSachLopFilter(value).then(data => {
                var obj = JSON.parse(JSON.stringify(data));
                console.log(obj);
                obj.map((value, i) => {
                    var date = new Date(obj[i].ngaysinh);
                    value.ngaysinh = date.toLocaleDateString();
                    return null;
                });
                this.setState({ dataTableValue: obj, malop: '' });
            });

        }
        console.log(value);
    }

    renderHeader() {
        return (
            <div>
                DANH SÁCH HỌC VIÊN THEO LỚP
                <div className="p-col-12 p-md-4" style={{ textAlign: 'left' }}>
                    <div className="p-datatable-globalfilter-container">
                        <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Học Viên Search" />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let cols = [
            { field: 'mahv', header: 'Mã Học Viên' },
            { field: 'hotenhv', header: 'Họ Tên' },
            { field: 'ngaysinh', header: 'Ngày Sinh' },
            { field: 'tendonvi', header: 'Tên Đơn Vị' },
            { field: 'email', header: 'EMAIL' }
        ];

        let dynamicColumns = cols.map((col, i) => {

            return <Column key={col.field} field={col.field} header={col.header} sortable={true} />;
        });
        const header = this.renderHeader();


        return (
            <div className="p-fluid">
                <div className="p-grid p-fluid dashboard">
                    <div className="p-col-12 p-lg-3">
                        <span>
                            <Dropdown showClear={true} value={this.state.malop} options={this.state.dslop} ariaLabel="Test" onChange={this.onChangeDonVi} placeholder="Chọn Lớp" optionLabel="tenlop" optionValue="malop" />
                        </span>
                    </div>

                </div>
                <div className="p-grid">

                    <div className="p-col-12">
                            <div className="content-section implementation">
                                <DataTable className="p-datatable-customers" rowHover globalFilter={this.state.globalFilter} emptyMessage="Không tìm thấy thông tin phù hợp" paginator={true}
                                    rows={10} responsive={true} value={this.state.dataTableValue} header={header} rowsPerPageOptions={[5, 10, 15, 30]} selectionMode="single" selection={this.state.dataTableSelection}
                                     paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                                    {dynamicColumns}
                                </DataTable>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}