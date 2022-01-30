import React from "react";

import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';

import NavBar from './NavBar'
import SideBar from "./SideBar";
import Footer from "./Footer";

import routes from "../../routes/routes";
import { Route, Routes, Navigate, Redirect } from "react-router-dom";
// import Redirect from 'react-router';


const MasterLayout = () => {

    return (
        <div className="sb-nav-fixed" >
            <NavBar />

            <div id='layoutSidenav'>

                <div id="layoutSidenav_nav">
                    <SideBar />
                </div>


                <div id="layoutSidenav_content">

                    <main>

                        <Routes>
                            {
                                routes.map((route, index) => {
                                    return (
                                        route.element && (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={(props) => (
                                                    <route.element {...props} />
                                                )}
                                            />
                                        )
                                    );
                                })
                            }
                            {/* <Route path="/admin" element={<Navigate replace to="/admin/dashboard" />} /> */}
                            {/* <Route path='admin' render={() => <Redirect to='/admin/dashboard' />} /> */}
                            {/* <Redirect from='admin' to='/admin/dashboard' /> */}
                        </Routes>

                    </main>

                    <Footer />
                </div>
            </div>

        </div>
    );
}

export default MasterLayout;