import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import UserActions from './UserActions';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

function UserCard(props) {

    //rendering component
    return (
        <Card style={{ margin: 15 }}>
            <Card.Body>
                <Card.Title>{props.user.name}</Card.Title>
                <Card.Text>{props.user.description}</Card.Text>

                <footer style={{ margin: 3 }} className="blockquote-footer">
                    {props.user.skills.length > 0
                        ? props.user.skills.map(function (skill, i) {
                            return <Tooltip key={i} title={skill.description}>
                                <Chip
                                    style={{ margin: 5 }}
                                    label={skill.name}
                                />
                            </Tooltip>;
                        })
                        : <div>no skills</div>}
                </footer>
                <div className='d-flex justify-content-end'>
                    <UserActions userId={props.user.id} users={props.users} setUsers={props.setUsers} />
                </div>

            </Card.Body>
        </Card>

    );
}


export default UserCard;