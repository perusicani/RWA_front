import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

//props == checkpoint
function CheckpointUpdate(props) {

  const [checkpointData, setCheckpointData] = useState({ status: props.checkpoint.status, description: props.checkpoint.description });

  const handleInputDescription = (event) => {
    setCheckpointData({ description: event.target.value });
    props.checkpoint.description = event.target.value;
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <label htmlFor="description">{props.checkpoint.id}</label>
          </Col>
          <Col>
            <div key={`default-checkbox`} >
              <Form.Check
                type='checkbox'
                id={props.checkpoint.id}
                defaultChecked={checkpointData.status}
                onChange={(checkboxStatus) => {
                  setCheckpointData({ status: checkboxStatus.target.checked ? 1 : 0 });
                  props.checkpoint.status = checkboxStatus.target.checked ? 1 : 0;
                }}
              />
            </div>
          </Col>
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
        </Row>
      </Container>
    </>
  );
}

export default CheckpointUpdate;