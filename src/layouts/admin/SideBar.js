import React from "react";
import { Link } from "react-router-dom";


const SideBar = () => {

    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Analytics</div>

                    <Link className="nav-link" to="/admin/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link >

                    <div className="sb-sidenav-menu-heading">Personal</div>
                    <Link className="nav-link" to="/admin/profile">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Profile
                    </Link >

                    <div className="sb-sidenav-menu-heading">Moderation</div>
                    <Link className="nav-link" to="/admin/users">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Users
                    </Link >

                    <Link className="nav-link" to="/admin/tasks">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Tasks
                    </Link >
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {localStorage.getItem('auth_name')}
            </div>
        </nav>
    );
}

export default SideBar;