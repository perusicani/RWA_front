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
            <h4 className='profile-caption'>WIP: Analytics for storage (when file upload server impemented)</h4>
            <h4 className='profile-caption'>WIP: Analytics for users (following trends in login/register frequency)</h4>
            <h4 className='profile-caption'>WIP: Analytics for tasks (following trends in task creation/completion frequency)</h4>
        </>
    );

}

export default AdminDashboard;