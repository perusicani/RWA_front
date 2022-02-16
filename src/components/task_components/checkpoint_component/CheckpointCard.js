import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//props == checkpoint object
function CheckpointCard(props) {

    const [initStatus, setInitStatus] = useState(props.checkpoint.status);
    const [checkpointStatus, setCheckpointStatus] = useState(props.checkpoint.status);
    const [statusChange, setStatusChange] = useState(0);
    const [description, setDescription] = useState({ description: props.checkpoint.description });
    const [claimed, setClaimed] = useState(props.checkpoint.claimed_by); //user_id of claimer

    // https://stackoverflow.com/questions/53255951/equivalent-to-componentdidupdate-using-react-hooks
    // const mounted = useRef();

    //on each status change
    useEffect(() => {
        setStatusChange(initStatus !== checkpointStatus);
    }, [checkpointStatus, initStatus]);

    const updateCheckpoint = (claim) => {

        var checkpoint = {
            id: props.checkpoint.id,
            description: props.checkpoint.description,
            status: checkpointStatus,
            task_id: props.checkpoint.task_id,
            claimed_by: claim,
        }

        axios.post('/api/checkpoints', { checkpoint: checkpoint })
            .then(
                response => {
                    if (response.status === 200) {
                        console.log('Checkpoint update success: ' + JSON.stringify(response.data));
                        toast.success(response.data.message);
                        setInitStatus({ initStatus: response.data.checkpoint.status });
                    }

                    setInitStatus(response.data.checkpoint.status);
                    setCheckpointStatus(response.data.checkpoint.status);
                    setDescription({ description: response.data.checkpoint.description });
                    setClaimed(response.data.checkpoint.claimed_by);

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

    const onClickClaim = () => {
        setClaimed(localStorage.getItem('user_id'));
        updateCheckpoint(localStorage.getItem('user_id'));
    }

    const onClickUnClaim = () => {
        setClaimed(null);
        updateCheckpoint(null);
    }

    const renderClaimbutton = () => {
        if (checkpointStatus === 0) {
            if (claimed === null) {
                //claim update with own user_id
                return <Button onClick={onClickClaim}>Claim Task?</Button>;
            } else if (claimed !== null && claimed.toString() === localStorage.getItem('user_id')) {
                //claim update with null
                return <Button onClick={onClickUnClaim}>Unclaim Task?</Button>;
            } else if (claimed !== null) {
                //show whose claim it is
                return <div>{claimed.toString()}</div>;
            }
        }
    }

    return (
        <Card className='m-2'>
            <Card.Header>
                <Container>
                    <Row>
                        <Col>
                            <div key={`default-checkbox`} >
                                <Form.Check
                                    type='checkbox'
                                    id={props.checkpoint.id}
                                    label={description.description}
                                    defaultChecked={initStatus}
                                    disabled={initStatus || (claimed !== null && claimed.toString() !== localStorage.getItem('user_id'))}
                                    onChange={(checkboxStatus) => {
                                        // console.log(checkboxStatus.target.checked);
                                        setCheckpointStatus(checkboxStatus.target.checked ? 1 : 0);
                                    }}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div>
                                {statusChange ? <Button onClick={() => {
                                    updateCheckpoint(claimed);
                                }}>Save changes?</Button> : null}
                            </div>
                        </Col>
                        <Col>
                            {renderClaimbutton()}
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
        </Card>
    );
}

export default CheckpointCard;

