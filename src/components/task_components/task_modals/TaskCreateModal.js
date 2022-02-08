import React, { Component } from 'react';

import axios from 'axios';

import { toast } from 'react-toastify';
import Modal from 'react-bootstrap';

class CreateModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            taskTitle: null,
            taskDescription: null,
            // taskSkills: null,
        }
    }

    //creating note state
    inputTaskTitle = (event) => {
        this.setState({
            taskTitle: event.target.value,
        });
    }
    inputTaskDescription = (event) => {
        this.setState({
            taskDescription: event.target.value,
        });
    }
    // inputTaskSkills = (event) => {
    //     this.setState({
    //         noteSkills: event.target.value,
    //     });
    // }

    storeTaskDetails = () => {
        axios.post('/tasks/create', {
            taskTitle: this.state.taskTitle,
            taskDescription: this.state.taskDescription,
            // taskTag: this.state.taskTag,
        }).then((response) => {
            console.log(response);
            toast.success('Task created successfully!');
            setTimeout(() => {
                location.reload();
            }, 2500);
        }).catch(function (error) {
            console.log(error.response.data);
            toast.error("Task couldn't be created");
            // setTimeout(() => {
            //     location.reload();
            // }, 2500);
        });
    }

    render() {
        return (
            <>
                <div className='row text-right mb-3 p-3'>
                    <button className='btn btn-info text-right col-3 offset-md-9'
                        data-bs-toggle="modal" data-bs-target={"#taskCreateModal"} > Add New Note </button>
                </div>
                <div className="modal fade" id={"taskCreateModal"} tabIndex="-1" aria-labelledby="taskCreateModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="taskCreateModalLabel">Create Task</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='form'>
                                    <div className='form-group'>
                                        <input className='form-control mb-3' type='text' id='taksTitle' placeholder='Title' onChange={this.inputTaskTitle} />
                                    </div>
                                    <div className='form-group'>
                                        <textarea className='form-control mb-3' id='taskDescription' placeholder='Description' onChange={this.inputTaskDescription}></textarea>
                                    </div>
                                    {/* <div className='form-group'>
                                        <input className='form-control mb-3' type='text' id='noteTag' placeholder='Tag' onChange={this.inputNoteTag} />
                                    </div> */}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <input type="button" className="btn btn-primary" value='Create Task' onClick={this.storeTaskDetails} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CreateModal;
