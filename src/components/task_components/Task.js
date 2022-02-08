import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import TaskActions from './TaskActions';

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

                    {/* <Button variant="primary">Go somewhere</Button> */}
                    <TaskActions task={this.props.task} />
                </Card.Body>
            </Card>
            // <Accordion flush style={{ margin: 15 }}>
            //     <Accordion.Item eventKey={this.props.task.id}>
            //         <Accordion.Header>
            //             {this.props.task.name}
            //         </Accordion.Header>
            //         <Accordion.Body>
            //             {this.props.task.description}
            //         </Accordion.Body>
            //         <Accordion.Collapse>
            //             <TaskActions taskId={this.props.task.id} />
            //         </Accordion.Collapse>
            //     </Accordion.Item>
            // </Accordion>

        );
    }
}


export default Task;