import React from 'react';

import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Card from 'react-bootstrap/Card';

import TaskActions from './TaskActions';
import CheckpointCard from './checkpoint_component/CheckpointCard';
import Loader from 'react-spinners/BeatLoader';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

import { Link } from 'react-router-dom';

//props = task, settasks
function Task(props) {
    // component did mount, unmount i to explanation 
    // https://dev.to/robmarshall/how-to-use-componentwillunmount-with-functional-components-in-react-2a5g
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component

    const callbackFromCheckpoint = (returnedCheckpoint) => {
        // update according to returned checkpoint
        props.task.checkpoints.forEach((checkpoint, index) => {
            if (checkpoint.id === returnedCheckpoint.id) {
                props.task.checkpoints[index] = returnedCheckpoint;
            }
        });

        var update = 1;
        props.task.checkpoints.forEach(checkpoint => {
            if (checkpoint.status === 0) {
                update = 0;
            }
        });

        if (update) {

            var task = {
                id: props.task.id,
                title: props.task.title,
                description: props.task.description,
                status: 1,
            };

            var user_id = props.task.userId;

            console.log(task);

            //check if all checkpoints status === 1, send status update for task
            axios.post('/api/tasks', { task: task, user_id: user_id })
                .then(response => {
                    if (response.status === 200) {
                        console.log('Check from checkpoint 200');
                    }
                })
                .catch(error => {
                    console.log('Check from checkpoint err');
                });

            //gettasks in parent
            props.reload();
        }
    }

    const Checkpoints = props.task.checkpoints.map(function (checkpoint, i) {
        return <CheckpointCard key={checkpoint.id} checkpoint={checkpoint} callBack={callbackFromCheckpoint} />
    });


    var CompleteButtons = '';

    //ako je status done && nisi kreator ili nisi admin -> don't show
    if (!props.task.status || props.task.user_id === localStorage.getItem('user_id') || localStorage.getItem('role') === 'true') {
        CompleteButtons = <>
            {/* <Card.Text>
                <Link className='btn btn-primary' to={'/profile?id=' + props.task.user_id}>
                    Creators id: {props.task.user_id}
                </Link>
            </Card.Text> */}

            <TaskActions key={props.task.id} task={props.task} tasks={props.tasks} setTasks={props.setTasks} />
        </>;
    }

    const Skills = props.task.skills.map(function (skill, i) {
        return <Tooltip
            key={skill.id}
            title={skill.description}
        >
            <Chip
                style={{ margin: 5 }}
                label={skill.name}
            />
        </Tooltip>;
    });

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
                <footer style={{ margin: 3 }} className="blockquote-footer">
                    {Skills ?
                        <>
                            {Skills.length > 0 ? Skills : <div>no skills required</div>}
                        </> : <Loader />}
                </footer>
                <Card.Text>
                    <Link className='btn btn-primary' to={'/profile?id=' + props.task.user_id}>
                        Creators id: {props.task.user_id}
                    </Link>
                </Card.Text>

                {CompleteButtons}
            </Card.Body>
        </Card >
    );

}


export default Task;