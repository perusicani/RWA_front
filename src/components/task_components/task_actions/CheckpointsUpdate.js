import React, { useState } from 'react';

//props == checkpoint
function CheckpointUpdate(props) {

  const [description, setDescription] = useState(props.checkpoint.description);

  const handleInputDescription = (event) => {
    setDescription({ [event.target.name]: event.target.value });
  }

  return (
    <div className="form-group">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        className="form-control"
        id="description"
        required
        value={description.description ?? ''}   // https://stackoverflow.com/questions/47012169/a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-erro
        onChange={handleInputDescription}
        name="description"
      />
    </div>
    // <div>{props.checkpoint.title}</div>
  );
}

export default CheckpointUpdate;