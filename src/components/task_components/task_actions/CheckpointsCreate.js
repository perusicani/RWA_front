import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import CheckpointCreate from './CheckpointCreate';

//props == task (za prikaz trenutne data-e), checkpoints list, setcheckpoints za dodavanje
function CheckpointsCreate(props) {

    const [checkpointId, setCheckpointId] = useState(0);

    const addCheckpoint = () => {
        setCheckpointId((currentId) => currentId + 1);
        props.setCheckpoints([...props.checkpoints, { id: checkpointId, status: 0, description: '', task_id: props.task.id }]);
    }

    const removeCheckpoint = (id) => {
        console.log('remove');
        console.log(id);
        props.setCheckpoints(props.checkpoints.filter(checkpoint => {
            console.log(checkpoint);
            if (checkpoint.id !== id) {
                return checkpoint;
            }
        }));
    }

    const Checkpoints = props.checkpoints.map(function (checkpoint, i) {
        return <CheckpointCreate key={i} checkpoint={checkpoint} removeCheckpoint={removeCheckpoint} />
    });

    return (
        <>
            <Card>
                <Card.Header>
                    <h2>Title: {props.task.title}</h2>
                    <h4>Description: {props.task.description}</h4>
                </Card.Header>
                <Card.Body>
                    {Checkpoints.length > 0 && Checkpoints}
                    <Button onClick={addCheckpoint} >+</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default CheckpointsCreate;