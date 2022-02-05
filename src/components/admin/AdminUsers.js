import React from 'react';

import Breadcrumb from 'react-bootstrap/Breadcrumb';


function AdminUsers() {

    // Will need:
    //     table of all AdminUsers
    //     has-> user name, email, tasks (button that either opens modal with their tasks or goes to page tasks with filter for that user?), action buttons -> email them, remove


    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin">Admin</Breadcrumb.Item>
                <Breadcrumb.Item active>Users</Breadcrumb.Item>
            </Breadcrumb>
            <h1>
                AdminUsers
            </h1>
        </>

    );

}

export default AdminUsers;