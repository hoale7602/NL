import React, { Component } from 'react';
import { CarService } from '../service/CarService';
import { InputText } from 'primereact/inputtext';
import { Redirect } from 'react-router';
import App from '../App';
import { Growl } from 'primereact/growl';

export class Login extends Component {
    static displayName = Login.name;
    constructor(props) {
        super(props);
        this.state = {
            taikhoan: '',
            matkhau: '',
            check: false,
            ktdn: true
        };
        this.service = new CarService();
    }

    onChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    onSubmit = () => {
        var item = {};
        item.taikhoan = this.state.taikhoan;
        item.matkhau = this.state.matkhau;
        console.log(item);
        var str = this.state.taikhoan + "," + this.state.matkhau;
        this.service.Login(str).then(data => {
            if (data.status === 200 ) {
                sessionStorage.setItem('name', data.data.tennv);
                sessionStorage.setItem('manhanvien', data.data.manhanvien);
                this.setState({ check: true, ktdn: true });
            }
            else {
                console.log("Mật Khẩu sai");
                this.growl.show({ severity: 'error', detail: 'Mật Khẩu Không Đúng' });

            }
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    console.log("Tài Khoản Không tồn tại");
                    alert("Tài Khoản không tồn tại");
                }
            }
        });
    }


    Login = () => {
        // lấy user từ trong localStorage nếu == 'true' thì sẽ Redirect. Còn không sẽ ở trang Login
        if (this.state.check === true) {
            return <Redirect to="/BienLai" />
        }
    }
    form = () => {
        const sectionStyle = {
            backgroundImage: 'url("assets/images/bg-01.jpg")'
        };
        
        console.log(sessionStorage.getItem('name'));
        if (sessionStorage.getItem('name') === null)
            console.log("lol");
        else console.log("ok");
        if (this.state.check === false)
            return <div>
            <div className="limiter">
                <div className="container-login100" style={sectionStyle}>
                        <div className="wrap-login100 p-t-30 p-b-50">
                        <span className="login100-form-title p-b-41">
                            Account Login
                        </span>
                            <Growl ref={(el) => this.growl = el} />
                            <form>
                            <div className="form-group mb-4">
                                <InputText tooltip="Tên tài khoản" className="form-control" type="text" name="taikhoan" placeholder="Tài Khoản" value={this.state.taikhoan} onChange={event => this.onChange(event)} />
                            </div>
                            <div className="form-group mb-4">
                                <InputText tooltip="Mật Khẩu" className="form-control" type="password" name="matkhau" placeholder="Mật Khẩu" value={this.state.matkhau} onChange={event => this.onChange(event)} />
                            </div>
                            <input onClick={this.onSubmit} name="login" id="login" className="btn btn-block login-btn mb-4" type="button" defaultValue="Login" />
                        </form>
                    </div>
                </div>
            </div>
        </div>;
        else return <App></App>;
    }
    render() {
        return (<div >
            {this.form()}
        </div>
        );
    }
}