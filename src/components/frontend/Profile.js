import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Loader from 'react-spinners/BeatLoader';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

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
                // console.log(response);
                setUser({ user: response.data.user });
            })
            .catch((error) => {
                // console.log(error);
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
            <div className='d-flex justify-content-end'>
                <Link className='btn btn-info m-3' to={'/profile/update?id=' + id.id} >Edit profile</Link>
            </div>
        );
    }

    const sendEmail = () => {
        window.location = "mailto:" + user.user.email ?? '';
    }

    // const Skills = user.user.skills.map(function (skill, i) {
    //     return <Tooltip key={i} title={skill.description}>
    //         <Chip
    //             style={{ margin: 5 }}
    //             label={skill.name}
    //         />
    //     </Tooltip>;
    // });

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>
            <Card className='profile-card p-3'>
                <Card.Header className='profile-card-header'>Users data</Card.Header>
                <ListGroup variant="flush">
                    <div>
                        {
                            user ?
                                <>
                                    <div className='profile-caption'>Id:</div> <ListGroup.Item> <h4>{user.user.id ?? ''}</h4> </ListGroup.Item>
                                    <div className='profile-caption'>Name:</div><ListGroup.Item> <h4>{user.user.name ?? ''}</h4> </ListGroup.Item>
                                    <div className='profile-caption'>Email:</div><ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <h4>{user.user.email ?? ''}</h4>
                                            </Col>
                                            <Col>
                                                <Button onClick={sendEmail}>
                                                    Contact user?
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <div className='profile-caption'>Description:</div><ListGroup.Item> <h4> {user.user.description ?? ''}</h4></ListGroup.Item>
                                </>
                                : <Loader />
                        }
                    </div>
                </ListGroup>
                <footer style={{ margin: 3 }} className="blockquote-footer">
                    {user ?
                        <>
                            {user.user.skills.length > 0
                                ? user.user.skills.map(function (skill, i) {
                                    return <Tooltip key={i} title={skill.description}>
                                        <Chip
                                            className='chip'
                                            style={{ margin: 5 }}
                                            label={skill.name}
                                        />
                                    </Tooltip>;
                                })
                                : <div>no skills</div>}
                        </>
                        : <Loader />}
                </footer>
            </Card>
            {EditButtons}
        </>
    );

}

export default Profile;