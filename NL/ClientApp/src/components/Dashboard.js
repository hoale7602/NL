import React, { Component } from 'react';
import { CarService } from '../service/CarService';
import { Password } from 'primereact/password';
import './Dashboard.css';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { Growl } from 'primereact/growl';

export class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            manhanvien:'',
            gioitinh: '',
            diachi: '',
            email: '',
            sodt: '',
            taikhoan: '',
            matkhau: '',
            quyen: '',
            hoten: '',
            nhanvien: {},
            matkhaucu:'',
            newpass: '',
            confirmpass: '',
            checked: false
        };

        this.service = new CarService();
    }

    componentDidMount() {
        this.loadData();
    }
    loadData = () => {
       
        this.service.getNhanVienID(sessionStorage.getItem('manhanvien')).then(data => {
            console.log(data);
            var hoten = data.tennv;
            // var hoten = "Lê Văn Hòa";
            var index = hoten.lastIndexOf(' ');
            var ten = hoten.slice(index + 1);
            var ho = hoten.slice(0, index);
            console.log(index);
            console.log(ho);
            console.log(ten);
            this.setState({
                nhanvien: data,
                firstname: ho,
                lastname: ten,
                hoten: data.tennv,
                email: data.email,
                sodt: "0" + data.sodt,
                diachi: data.diachi,
                quyen: data.quyen,
                gioitinh: data.gioitinh,
                taikhoan: data.taikhoan,
                matkhau: data.matkhau,
                manhanvien: data.manhanvien
            });
        });
        
    }

    onChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        console.log(name);
        console.log(value);

         this.setState({
            [name]: value
        }
        );
    }

    updateProfile = (item) => {
        this.service.suaNhanVien(item).then((response) => {
            if (response.ok) {
                console.log("ok");
                this.growl.show({ severity: 'success', summary: 'Success Message', detail: 'Cập nhật Thành Công' });
                this.setState({
                    newpass: '',
                    matkhaucu: '',
                    confirmpass: '',
                    checked: false

                });
                this.loadData();
            }
            else {
                console.log(response.errors);
                this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Cập Nhật Thất Bại' });

            }
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        var item = {};
        item.manhanvien = this.state.manhanvien;
        item.tennv = this.state.firstname + " " + this.state.lastname;
        item.email = this.state.email;
        item.sodt = parseInt(this.state.sodt);
        item.quyen = this.state.quyen;
        item.diachi = this.state.diachi;
        item.gioitinh = this.state.gioitinh;
        item.taikhoan = this.state.taikhoan;
        
        if (this.state.checked) {
            if (this.state.matkhau === this.state.matkhaucu) {
                if (this.state.newpass === this.state.confirmpass) {
                    item.matkhau = this.state.confirmpass;
                    this.updateProfile(item);
                    console.log(item);
                }
                else {
                    this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Confirm Password không đúng' });
                }
            }
            else {
                this.growl.show({ severity: 'error', summary: 'Error Message', detail: 'Password không đúng' });

            }
        } else {
            item.matkhau = this.state.matkhau;
            this.updateProfile(item);
            console.log(item);
        }
        
        
    }

    show = () => {
        return <div className="p-grid p-fluid dashboard">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-4 pb-5">
                        <div className="author-card pb-3">
                            <div className="author-card-profile">
                                <div className="author-card-avatar"><img src="assets/layout/images/profile.png" />
                                </div>
                                <div className="author-card-details">
                                    <h5 className="author-card-name text-lg">{this.state.hoten}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <form className="row">
                            
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="account-phone">Account</label>
                                    <input className="form-control" type="text" id="account-phone" name="taikhoan" value={this.state.taikhoan} readOnly />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="account-phone">Permission</label>
                                    <input className="form-control" type="text" id="account-phone" name="quyen" value={this.state.quyen} readOnly />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="account-fn">First Name</label>
                                    <input className="form-control" type="text" id="account-fn" name="firstname" value={this.state.firstname} onChange={(event) => this.onChange(event)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="account-ln">Last Name</label>
                                    <input className="form-control" type="text" id="account-ln" name="lastname" value={this.state.lastname} onChange={(event) => this.onChange(event)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="account-email">E-mail Address</label>
                                    <input className="form-control" type="email" id="account-email" name="email" value={this.state.email} onChange={(event) => this.onChange(event)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="account-phone">Phone Number</label>
                                    <input className="form-control" type="text" id="account-phone" name="sodt" value={this.state.sodt} onChange={(event) => this.onChange(event)} />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="account-phone">Address</label>
                                    <input className="form-control" type="text" id="account-phone" name="diachi" value={this.state.diachi} onChange={(event) => this.onChange(event)} />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                        <label htmlFor="account-phone">Giới Tính</label>
                                    <div className="row">
                                        <RadioButton className="col-md-1" name="gioitinh" value={true} inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.gioitinh === true} />
                                        <label className="col-md-3" htmlFor="rb1" className="p-radiobutton-label">Nam</label>
                                    <RadioButton className="col-md-1" name="gioitinh" value={false} inputId="rb1" onChange={event => this.onChange(event)} checked={this.state.gioitinh === false} />
                                        <label className="col-md-3" htmlFor="rb1" className="p-radiobutton-label">Nữ</label>
                                    </div>
                                    </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <div className="row">
                                        <Checkbox className="col-md-1"  inputId="cb1" checked={this.state.checked} onChange={e => this.setState({ checked: e.checked })} />
                                        <label className="col-md-11" htmlFor="cb1">Đổi Mật Khẩu</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="account-pass">Password</label>
                                    <Password disabled={!this.state.checked} name="matkhaucu" id="account-pass" className="form-control" name="matkhaucu" value={this.state.matkhaucu} onChange={(event) => this.onChange(event)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="account-pass">New Password</label>
                                    <Password disabled={!this.state.checked} name="newpass" id="account-pass" className="form-control" name="newpass" value={this.state.newpass} onChange={(event) => this.onChange(event)} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="account-confirm-pass">Confirm Password</label>
                                    <Password disabled={!this.state.checked} name="confirmpass" id="account-confirm-pass" className="form-control" name="confirmpass" value={this.state.confirmpass} onChange={(event) => this.onChange(event)} />
                                </div>
                            </div>
                            <div className="col-12">
                                <hr className="mt-2 mb-3" />
                                <div className="d-flex flex-wrap justify-content-between align-items-center">
                                    <button className="btn btn-style-1 btn-primary" type="button" data-toast data-toast-position="topRight" onClick={(event) => this.onSubmit(event)}>Cập nhật thông tin</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>;
    }
        

    render() {

        return (<div>
            <Growl ref={(el) => this.growl = el} />
            {this.show()}
        </div>
            
        );
    }
}