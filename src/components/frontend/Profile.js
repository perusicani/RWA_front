import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Loader from 'react-spinners/BeatLoader';

function Profile() {

    //About me
    //My interests

    //prema user_id prikaži profile (na nav baru -> svoj)
    //na task buttonu od osobe čiji je task
    const [id, setId] = useState('');
    const [user, setUser] = useState();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        // this.setState({ id: id });
        setId({ id: id });

        axios.get('/api/users/' + id,
            // {
            //     onDownloadProgress: (progressEvent) => {
            //         let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100);
            //         console.log('completed: ', percentCompleted)
            //     }
            // }
        )
            .then((response) => {
                console.log(response);
                setUser({ user: response.data.user });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>
            <Card style={{}}>
                <Card.Header>Users data</Card.Header>
                <ListGroup variant="flush">
                    <div>
                        {
                            user ?
                                <>
                                    <ListGroup.Item>id: {user.user.id ?? ''}</ListGroup.Item>
                                    <ListGroup.Item>name: {user.user.name ?? ''}</ListGroup.Item>
                                    <ListGroup.Item>email: {user.user.email ?? ''}</ListGroup.Item>
                                    <ListGroup.Item>description: {user.user.description ?? ''}</ListGroup.Item>
                                </>
                                : <Loader />
                        }
                    </div>
                </ListGroup>
            </Card>
        </>
    );

}

export default Profile;