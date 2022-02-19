import React, { useEffect } from 'react';

import Card from 'react-bootstrap/Card';

import TaskActions from './TaskActions';
import CheckpointCard from './checkpoint_component/CheckpointCard';
import Loader from 'react-spinners/BeatLoader';

import { Link } from 'react-router-dom';

//props = task, settasks
function Task(props) {
    // component did mount, unmount i to explanation 
    // https://dev.to/robmarshall/how-to-use-componentwillunmount-with-functional-components-in-react-2a5g
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component

    const Checkpoints = props.task.checkpoints.map(function (checkpoint, i) {
        return <CheckpointCard key={i} checkpoint={checkpoint} />
    });

    var CompleteButtons = '';

    if (!props.task.status) {
        CompleteButtons = <>
            <Card.Text>
                <Link className='btn btn-primary' to={'/profile?id=' + props.task.user_id}>
                    Creators id: {props.task.user_id}
                </Link>
            </Card.Text>

            <TaskActions task={props.task} tasks={props.tasks} setTasks={props.setTasks} />
        </>;
    }

    return (
        < Card style={{ margin: 15, background: props.task.status ? '#dddddd' : 'white' }} >
            <Card.Body>
                <Card.Title>{props.task.title}</Card.Title>
                <Card.Text>{props.task.description}</Card.Text>
                {/* here checkpoint mapping */}
                <div>
                    {
                        Checkpoints ?
                            <>
                                {Checkpoints.length > 0 ? Checkpoints : <h3>no checkpoints</h3>}
                            </>
                            :
                            <Loader />
                    }
                </div>
                {CompleteButtons}
            </Card.Body>
        </Card >
    );

}


export default Task;