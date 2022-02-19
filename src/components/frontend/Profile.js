import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Loader from 'react-spinners/BeatLoader';

import { Link } from 'react-router-dom';

function Profile() {

    //About me
    //My interests

    //prema user_id prikaži profile (na nav baru -> svoj)
    //na task buttonu od osobe čiji je task
    const [id, setId] = useState('');
    const [user, setUser] = useState();

    const [error, setError] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        // this.setState({ id: id });
        setId({ id: id });

        axios.get('/api/users/' + id)
            .then((response) => {
                console.log(response);
                setUser({ user: response.data.user });
            })
            .catch((error) => {
                console.log(error);
                setError({ error: true });
            });
    }, []);


    if (error.error) {
        return (
            <h1>Error</h1>
        );
    }

    var EditButtons = '';
    if (id.id === localStorage.getItem('user_id') || localStorage.getItem('role') === 'true') {
        EditButtons = (
            <Link className='btn btn-info' to={'/profile/update?id=' + id.id} >Edit profile</Link>
        );
    }

    const sendEmail = () => {
        window.location = "mailto:" + user.user.email ?? '';
    }

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
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                email: {user.user.email ?? ''}
                                            </Col>
                                            <Col>
                                                <Button onClick={sendEmail}>
                                                    Contact user?
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>description: {user.user.description ?? ''}</ListGroup.Item>
                                </>
                                : <Loader />
                        }
                    </div>
                </ListGroup>
            </Card>
            {EditButtons}
        </>
    );

}

export default Profile;