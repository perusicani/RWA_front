import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import TaskActions from './TaskActions';
import { Link } from 'react-router-dom';

class Task extends Component {

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
                    <Card.Title>{this.props.task.title}</Card.Title>
                    <Card.Text>{this.props.task.description}</Card.Text>
                    <Card.Text>
                        <Link className='btn btn-primary' to={'/profile?id=' + this.props.task.user_id}>
                            Creators profile
                        </Link>
                    </Card.Text>

                    {/* <Button variant="primary">Go somewhere</Button> */}
                    <TaskActions task={this.props.task} />
                </Card.Body>
            </Card>

        );
    }
}


export default Task;