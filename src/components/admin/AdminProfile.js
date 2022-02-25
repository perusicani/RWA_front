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
            <h4 className='profile-caption'>WIP: Still thinking about what his could be...</h4>
        </>
    );

}

export default AdminProfile;