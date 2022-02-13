import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

//props == checkpoint object
function CheckpointCard(props) {

    const [initStatus, setInitStatus] = useState(0);
    const [checkpointStatus, setCheckpointStatus] = useState(0);
    const [statusChange, setStatusChange] = useState(0);
    const [description, setDescription] = useState('');

    // https://stackoverflow.com/questions/53255951/equivalent-to-componentdidupdate-using-react-hooks
    // const mounted = useRef();

    // on init
    useEffect(() => {
        setInitStatus({ initStatus: props.checkpoint.status });
        setCheckpointStatus({ checkpointStatus: props.checkpoint.status });
        setDescription({ description: props.checkpoint.description });
    }, []);

    //on each status change
    useEffect(() => {
        setStatusChange({ statusChange: initStatus.initStatus !== checkpointStatus.checkpointStatus });
    }, [checkpointStatus]);

    const updateCheckpoint = () => {

        var checkpoint = {
            id: props.checkpoint.id,
            description: props.checkpoint.description,
            status: checkpointStatus.checkpointStatus,
            task_id: props.checkpoint.task_id,
        }

        axios.post('/api/checkpoints', { checkpoint: checkpoint })
            .then(
                response => {
                    if (response.status === 200) {
                        console.log('Checkpoint update success: ' + JSON.stringify(response.data));
                        toast.success(response.data.message);
                        setInitStatus({ initStatus: response.data.checkpoint.status });
                    }

                    setCheckpointStatus({ checkpointStatus: response.data.checkpoint.status });
                    setDescription({ description: response.data.checkpoint.description });

                    if (response.status === 422) {
                        console.log(response);
                        toast.error(response);
                    }
                })
            .catch(error => {
                console.log(error);
                toast.error(error);
            });
    }

    return (
        <Card className='m-2'>
            <Card.Header>
                <div key={`default-checkbox`} >
                    <Form.Check
                        type='checkbox'
                        id={props.checkpoint.id}
                        label={description.description}
                        defaultChecked={initStatus.initStatus}
                        disabled={initStatus.initStatus}
                        onChange={(checkboxStatus) => {
                            // console.log(checkboxStatus.target.checked);
                            setCheckpointStatus({ checkpointStatus: checkboxStatus.target.checked ? 1 : 0 });
                        }}
                    />
                </div>
                <div>
                    {statusChange.statusChange ? <Button onClick={updateCheckpoint}>Save changes?</Button> : null}
                </div>
            </Card.Header>
        </Card>
    );
}

export default CheckpointCard;