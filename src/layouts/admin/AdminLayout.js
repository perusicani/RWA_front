import React from "react";

import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

import NavBar from './NavBar'
import SideBar from "./SideBar";

import { Outlet } from "react-router-dom";
// import Redirect from 'react-router';


const AdminLayout = () => {

    return (
        <div className="sb-nav-fixed" >
            <NavBar />
            <div id='layoutSidenav'>
                <div id="layoutSidenav_nav">
                    <SideBar />
                </div>

                <div id="layoutSidenav_content">
                    <main style={{ padding: 30 }}>
                        <Outlet />
                    </main>
                    {/* <Footer /> */}
                </div>
            </div>
        </div >
    );
}


export default AdminLayout;
