import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

class TaskActions extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     currentNoteTitle: null,
        //     currentNoteDescription: null,
        //     currentNoteTag: null,
        // }
    }

    //getting individual note data
    // getNoteDetails = (id) => {
    //     axios.post('/get/note/details', {
    //         taskId: id,
    //     }).then((response) => {
    //         // console.log(response.data);
    //         this.setState({
    //             currentNoteTitle: response.data.note_title,
    //             currentNoteDescription: response.data.note_description,
    //             currentNoteTag: response.data.note_tag,
    //         });
    //     });
    // }

    // {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#viewModal" + this.props.taskId}
    // // onClick={() => { this.getNoteDetails(this.props.taskId) }}
    // >
    //     View
    // </button> */}

    //rendering component
    render() {
        return (
            <div className="btn-group" role="group">
                <Button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#viewModal" + this.props.taskId}>View</Button>
                {/* the modal is hidden until called */}
                {/* pass through the note id and data */}
                {/* <ViewModal modalId={this.props.taskId} noteDetails={this.state} /> */}

                <Button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target={"#updateModal" + this.props.taskId}>Update</Button>
                {/* <UpdateModal modalId={this.props.taskId} noteDetails={this.state} /> */}

                <Button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteModal" + this.props.taskId}>Delete</Button>
                {/* <DeleteModal modalId={this.props.taskId} /> */}
            </div>
        );
    }
}

export default TaskActions;
