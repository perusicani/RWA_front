import React, { useState } from 'react';


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CheckpointCreate(props) {

    const [checkpointData, setCheckpointData] = useState({ description: props.checkpoint.description });

    const handleInputDescription = (event) => {
        setCheckpointData({ description: event.target.value });
        props.checkpoint.description = event.target.value;
    }

    return (
        <>
            <Container className='m-1'>
                <Row>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            id="descritpion"
                            required
                            value={checkpointData.description}
                            onChange={handleInputDescription}
                            name="title"
                        />
                    </Col>
                    <Col>
                        <Button onClick={() => props.removeCheckpoint(props.checkpoint.id)} >-</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CheckpointCreate;