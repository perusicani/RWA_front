import React from 'react';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

function AdminProfile() {

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin">Admin</Breadcrumb.Item>
                <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>
            <h1>
                AdminProfile
            </h1>
        </>
    );

}

export default AdminProfile;