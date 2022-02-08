import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import UserActions from './UserActions';

class UserCard extends Component {

    constructor(props) {
        super(props);
    }

    //rendering component
    render() {
        return (
            // <li>{this.props.data.name}</li>
            <Card style={{ margin: 15 }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title>{this.props.user.name}</Card.Title>
                    <Card.Text>{this.props.user.description}</Card.Text>

                    <UserActions taskId={this.props.user.id} />

                </Card.Body>
            </Card>

        );
    }
}


export default UserCard;