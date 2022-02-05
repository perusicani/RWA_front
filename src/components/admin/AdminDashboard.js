import React from 'react';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

function AdminDashboard() {

    // Overview of app:
    //     -> maybe some of those fonky graphs?

    return (
        <>

            <Breadcrumb>
                <Breadcrumb.Item href="/admin">Admin</Breadcrumb.Item>
                <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <h1>
                AdminDashboard
            </h1>
        </>
    );

}

export default AdminDashboard;