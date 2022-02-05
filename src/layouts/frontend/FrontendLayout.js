import React from "react";

import NavBar from './NavBar'

import { Outlet } from "react-router-dom";

const FrontendLayout = () => {

    return (
        <div className="sb-nav-fixed" >
            <NavBar />
            <main style={{ padding: '1rem 0' }}>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    );
}


export default FrontendLayout;
