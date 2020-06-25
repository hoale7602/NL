import React, { Component } from 'react';
import { Chart } from 'primereact/chart';
import { CarService } from '../service/CarService';

export class ChartLop extends Component {
    static displayName = ChartLop.name;
    constructor(props) {
        super(props);
        this.state = {
            dslop: [],
            tonghs: '',
            gv: '',
            hv: '',
            nv: '',
            doanhthu: []

        };
        this.service = new CarService();
      //  this.service.getCountBienLai().then(data => console.log(data));
        this.service.getThongTinCacLop().then(data => {
            console.log(data);
            this.setState({ tonghs: data })
        });
        this.service.getCountTongHocVien().then(data => {
            console.log(data);
            this.setState({ hv: data })
        });
        this.service.getCountNhanVien().then(data => {
            console.log(data);
            this.setState({ nv: data })
        });
        this.service.getCountGiaoVien().then(data => {
            console.log(data);
            this.setState({ gv: data })
        });
    }
    componentDidMount() {
        this.service.getCountHocVien().then(data => {
            console.log(data);
            this.setState({ dslop: data })
        });
        this.doanhthu();
    }
    doanhthu = () => {
        this.service.getCountBienLai().then(data => {
            this.setState({ doanhthu: data });
            console.log(data.thang);
        });
        
    }

    render() {
        var datas1 = [];
        var lab1 = [];
        var tshs = this.state.tonghs;
        var temp = [];
        this.state.dslop.forEach((value, key) => {
            lab1[key] = value.malop;
            datas1[key] = value.count;
            temp[key] = tshs;
        });
        console.log(tshs);
        const data = {
            labels: lab1,
                datasets: [
                    {
                        label: 'Học Viên',
                        backgroundColor: '#42A5F5',
                        data: datas1
                    },
                    {
                        label: 'Tổng Học Viên',
                        data: temp,
                        fill: false,
                        borderColor: '#FFC107'
                    }

                ]
        };
        { console.log(this.state.doanhthu) }
        var thang = [];
        var sotien = [];
        var today = new Date();
        var nam = today.getFullYear() + "";
        var i = 0;
        this.state.doanhthu.forEach((value, key) => {
            var c = value.thang + "";
            
            if (c.lastIndexOf(nam) !== -1) {
                thang[i] = value.thang;
                sotien[i] = value.sotien;
                i = i + 1;
            }
        });
        var thangtrongnam = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var doanhthuthang = [0,0,0,0,0,0,0,0,0,0,0,0];
        for (var i = 0; i < thang.length; i++) {
            var temp = thang[i] + "";
            var e = temp.slice(0, 2);
            console.log(e);
            for (var j = 0; j < thangtrongnam.length; j++) {
                if (e == thangtrongnam[j]) {
                    var tg = thangtrongnam[j] - 1;
                    console.log(tg);
                    doanhthuthang[j] = doanhthuthang[j] + sotien[i];
                    break;
                }
               // doanhthuthang[j] = 0;
            }
            
        }
        const data1 = {
            labels: thangtrongnam,
            datasets: [
                {
                    label: 'Doanh thu',
                    backgroundColor: '#42A5F5',
                    data: doanhthuthang
                }
            ]
        };
        console.log(doanhthuthang);
        console.log(thang);
        console.log(sotien);
            return (
                <div className="p-grid p-fluid dashboard">
                    <div className="p-col-12 p-lg-4">
                        <div className="card summary">
                            <span className="title">Nhân Viên</span>
                            <span className="detail">Tổng số nhân viên Trung Tâm</span>
                            <span className="count visitors">{this.state.nv}</span>
                        </div>
                    </div>
                    <div className="p-col-12 p-lg-4">
                        <div className="card summary">
                            <span className="title">Giáo viên</span>
                            <span className="detail">Tổng số giáo viên Trung Tâm</span>
                            <span className="count purchases">{this.state.gv}</span>
                        </div>
                    </div>
                    <div className="p-col-12 p-lg-4">
                        <div className="card summary">
                            <span className="title">Học viên</span>
                            <span className="detail">Tổng số học viên Trung Tâm</span>
                            <span className="count revenue">{this.state.hv}</span>
                        </div>
                    </div>
                    <div className="p-col-12 p-lg-6">
                        <div className="card">
                        <h3>Học viên theo lớp</h3>
                            <Chart type="bar" data={data} />
                        </div>
                    </div>
                    <div className="p-col-12 p-lg-6">
                        <div className="card">
                            <h3>Doanh Thu Năm {nam}</h3>
                            <Chart type="bar" data={data1} />
                        </div>
                    </div>
                </div>
            )
        }
    }