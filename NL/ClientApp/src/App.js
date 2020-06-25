import React, {Component} from 'react';
import classNames from 'classnames';
import {AppTopbar} from './AppTopbar';
import {AppMenu} from './AppMenu';
import {AppProfile} from './AppProfile';
import {Route} from 'react-router-dom';
import {Dashboard} from './components/Dashboard';
import { HocVien } from './components/HocVien';
import { DonViHocVien } from './components/DonViHocVien';
import { DonViGiaoVien} from './components/DonViGiaoVien';
import { GiaoVien} from './components/GiaoVien';
import { KhoaHoc} from './components/KhoaHoc';
import { MonHoc } from './components/MonHoc';
import { NhomLop} from './components/NhomLop';
import { Lop} from './components/Lop';
import { LichHoc } from './components/LichHoc';
import { NhanVien } from './components/NhanVien';
import { BienLai } from './components/BienLai';
import { DiaDiem } from './components/DiaDiem';
import { PhongHoc } from './components/PhongHoc';
import { KyThi } from './components/KyThi';
import { QuanLiDiem } from './components/QuanLiDiem';
import { GiangDay } from './components/GiangDay';
import { PhanCong } from './components/PhanCong';
import { Dangkihoc } from './components/Dangkihoc';
import { Login } from './components/Login';
import { DanhSachLop } from './components/DanhSachLop';
import { ChartLop } from './components/ChartLop';
import {Documentation} from "./components/Documentation";
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/layout.scss';
import './App.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            login: false
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }

    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }
       
        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
    }

    onMenuItemClick(event) {
        if(!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    createMenu() {
        this.menu = [
            {label: 'Trang Chủ', icon: 'pi pi-fw pi-home', command: () => {window.location = '#/'}},
            {
                label: 'Menu Modes', icon: 'pi pi-fw pi-cog',
                items: [
                    {label: 'Static Menu', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutMode: 'static'}) },
                    {label: 'Overlay Menu', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutMode: 'overlay'}) }
                ]
            },
            {
                label: 'Menu Colors', icon: 'pi pi-fw pi-align-left',
                items: [
                    {label: 'Dark', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutColorMode: 'dark'}) },
                    {label: 'Light', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutColorMode: 'light'}) }
                ]
            },
            {
                label: 'Components', icon: 'pi pi-fw pi-globe',
                items: [
                    { label: 'DonViHocVien', icon: 'pi pi-fw pi-table', to: '/donViHocVien'},
                    { label: 'HocVien', icon: 'pi pi-fw pi-table', to: '/hocVien'},
                    { label: 'DonViGiaoVien', icon: 'pi pi-fw pi-table', to: '/donViGiaoVien'},
                    { label: 'GiaoVien', icon: 'pi pi-fw pi-table', to: '/giaoVien'},
                    { label: 'KhoaHoc', icon: 'pi pi-fw pi-table', to: '/khoaHoc'},
                    { label: 'MonHoc', icon: 'pi pi-fw pi-table', to: '/monHoc'},
                    { label: 'NhomLop', icon: 'pi pi-fw pi-table', to: '/nhomLop'},
                    { label: 'Lop', icon: 'pi pi-fw pi-table', to: '/lop'},
                    { label: 'LichHoc', icon: 'pi pi-fw pi-table', to: '/lichHoc' },
                    { label: 'NhanVien', icon: 'pi pi-fw pi-table', to: '/nhanVien' },
                    { label: 'BienLai', icon: 'pi pi-fw pi-table', to: '/bienLai' }
                    
                    
                ]
            },
            {
                label: 'Template Pages', icon: 'pi pi-fw pi-file',
                items: [
                    { label: 'DiaDiem', icon: 'pi pi-fw pi-circle-off', to: '/diaDiem' },
                    { label: 'KyThi', icon: 'pi pi-fw pi-circle-off', to: '/kyThi' },
                    { label: 'PhongHoc', icon: 'pi pi-fw pi-circle-off', to: '/phongHoc' },
                    { label: 'QuanLiDiem', icon: 'pi pi-fw pi-circle-off', to: '/quanLiDiem' },
                    { label: 'GiangDay', icon: 'pi pi-fw pi-circle-off', to: '/giangDay' },
                    { label: 'PhanCong', icon: 'pi pi-fw pi-circle-off', to: '/phancong' },
                    { label: 'Dangkihoc', icon: 'pi pi-fw pi-circle-off', to: '/dangkihoc' },
                    { label: 'DanhSachLop', icon: 'pi pi-fw pi-circle-off', to: '/danhSachLop' }
                ]
            }
        ];
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    }

    show = () => {
        const logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg';

        const wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });

        const sidebarClassName = classNames("layout-sidebar", {
            'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
            'layout-sidebar-light': this.state.layoutColorMode === 'light'
        });
        return <div className={wrapperClass} onClick={this.onWrapperClick}>
            <AppTopbar onToggleMenu={this.onToggleMenu} />

            <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                <div className="layout-logo">
                    <img alt="Logo" src={logo} />
                </div>
                <AppProfile callback={() => this.callback()} />
                <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
            </div>

            <div className="layout-main">
                <Route path="/" exact component={ChartLop} />
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/HocVien" component={HocVien} />
                <Route path="/DonViHocVien" component={DonViHocVien} />
                <Route path="/DonViGiaoVien" component={DonViGiaoVien} />
                <Route path="/GiaoVien" component={GiaoVien} />
                <Route path="/KhoaHoc" component={KhoaHoc} />
                <Route path="/MonHoc" component={MonHoc} />
                <Route path="/NhomLop" component={NhomLop} />
                <Route path="/Lop" component={Lop} />
                <Route path="/LichHoc" component={LichHoc} />
                <Route path="/NhanVien" component={NhanVien} />
                <Route path="/BienLai" component={BienLai} />
                <Route path="/DiaDiem" component={DiaDiem} />
                <Route path="/PhongHoc" component={PhongHoc} />
                <Route path="/KyThi" component={KyThi} />
                <Route path="/QuanLiDiem" component={QuanLiDiem} />
                <Route path="/GiangDay" component={GiangDay} />
                <Route path="/PhanCong" component={PhanCong} />
                <Route path="/Dangkihoc" component={Dangkihoc} />
                <Route path="/DanhSachLop" component={DanhSachLop} />
                <Route path="/documentation" component={Documentation} />
            </div>
            <div className="layout-mask"></div>
        </div>
    }

    callback = () => {
        sessionStorage.clear();
        window.location = '#/';
        this.setState({ login: true });
    }

    render() {
        //    if (sessionStorage.getItem('name') === null)
        if (this.state.Login === true || sessionStorage.getItem('name') === null)
            return (<Login />);
            if (sessionStorage.getItem('name') !== null)
            return (this.show());
    }
}

export default App;
