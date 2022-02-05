import React from "react";

import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

import NavBar from './NavBar'
import SideBar from "./SideBar";
import Footer from "./Footer";
import Dashboard from "../../components/admin/Dashboard";
import Profile from "../../components/admin/Profile";
import Users from "../../components/admin/Users";
import Page404 from "../../components/errors/Page404";


import { Route, Routes, Link, Outlet } from "react-router-dom";
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
                    {/* <main>
                        <Routes>
                            <Route element={<AdminLayout />}>

                                <Route index element={<Dashboard />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/users" element={<Users />} />

                            </Route>
                            <Route path="/admin/*" element={<Page404 />} />
                        </Routes>
                    </main> */}
                    <main style={{ padding: '1rem 0' }}>
                        <Outlet />
                    </main>
                    {/* <Footer /> */}
                </div>
            </div>
        </div >
    );
}


export default AdminLayout;
