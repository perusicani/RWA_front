import React from "react";

import NavBar from './NavBar'

import { Outlet } from "react-router-dom";

const FrontendLayout = () => {

    return (
        <div className="sb-nav-fixed" >
            <div>
                <NavBar />
            </div>
            <main style={{ padding: 30 }}>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    );
}


export default FrontendLayout;
