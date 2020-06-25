import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';


export class AppProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }


    onclickLogout = () => {
        //sessionStorage.clear();
        console.log(sessionStorage.getItem('name'));
        this.props.callback();
    }

    render() {

        return  (
            <div className="layout-profile">
                <div>
                    <img src="assets/layout/images/profile.png" />
                    
                </div>
                <button className="p-link layout-profile-link" onClick={this.onClick}>
                    <span className="username">{sessionStorage.getItem('name')}</span>
                    <i className="pi pi-fw pi-cog"/>
                </button>
                <ul className={classNames({'layout-profile-expanded': this.state.expanded})}>
                    <li><button className="p-link"><i className="pi pi-fw pi-user" /><span><Link to="/Dashboard">Account</Link></span></button></li>
                    <li><button onClick={this.onclickLogout} className="p-link"><i className="pi pi-fw pi-power-off" /><span>Logout</span></button></li>
                </ul>
            </div>
        );
    }
}