import React, { Component } from 'react';
import { toast } from 'react-toastify';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Task from '../Task';

class TaskUpdateModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            taskTitle: null,
            taskDescription: null,
            // noteTag: null,
        }
    }

    //update note state
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
    // inputTaskTag = (event) => {
    //     this.setState({
    //         noteTag: event.target.value,
    //     });
    // }

    //Get values from props
    static getDerivedStateFromProps(props, current_state) {
        let noteUpdate = {
            taskTitle: null,
            taskDescription: null,
            // noteTag: null,
        }

        //updating data from input

        if (current_state.taskTitle && (current_state.taskTitle !== props.taskTitle)) {
            //if there is data already && that data is not equal to props
            return null;
        }
        if (current_state.taskDescription && (current_state.taskDescription !== props.taskDescription)) {
            //if there is data already && that data is not equal to props
            return null;
        }
        // if (current_state.noteTag && (current_state.noteTag !== props.noteTag)) {
        //     //if there is data already && that data is not equal to props
        //     return null;
        // }


        //updating data from props
        //??????? What? when not equal or equal?? so always?

        if (current_state.taskTitle !== props.noteDetails.currentTaskTitle || current_state.taskTitle === props.noteDetails.currentTaskTitle) {
            noteUpdate.taskTitle = props.noteDetails.currentTaskTitle;
        }
        if (current_state.taskDescription !== props.noteDetails.currentTaskDescription || current_state.taskDescription === props.noteDetails.currentTaskDescription) {
            noteUpdate.taskDescription = props.noteDetails.currentTaskDescription;
        }
        // if (current_state.noteTag !== props.noteDetails.currentNoteTag || current_state.noteTag === props.noteDetails.currentNoteTag) {
        //     noteUpdate.noteTag = props.noteDetails.currentNoteTag;
        // }

        //updates state
        return noteUpdate;
    }

    //updating note details in db
    updateTaskDetails = () => {

        axios.post('/tasks', {
            // noteId: this.props.modalId,
            taskTitle: this.state.taskTitle,
        }).then((response) => {
            console.log(response);
            toast.success("Note updated successfully!");    //show toast
            setTimeout(() => {
                location.reload(); //page refresh
            }, 2500);
        }).catch(function (error) {
            console.log(error.response.data);
            toast.error("Note couldn't be updated");    //show toast
            // setTimeout(() => {
            //     location.reload(); //page refresh
            // }, 2500);
        });
    }

    //rendering component
    render() {
        return (
            <div className="modal fade" id={"updateModal" + this.props.modalId} tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateModalLabel">Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='form'>
                                <div className='form-group'>
                                    <input className='form-control mb-3' type='text' id='taskTitle' value={this.state.taskTitle ?? ''} onChange={this.inputNoteTitle} />
                                </div>
                                <div className='form-group'>
                                    <textarea className='form-control mb-3' id='taskDescription' value={this.state.taskDescription ?? ''} onChange={this.inputNoteDescription}></textarea>
                                    {/* <input type='text-area' id='taskDescription' value={this.state.taskDescription ?? ''} onChange={this.inputNoteDescription} /> */}
                                </div>
                                <div className='form-group'>
                                    <input className='form-control mb-3' type='text' id='noteTag' value={this.state.noteTag ?? ''} onChange={this.inputNoteTag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <input type="submit" className="btn btn-info" value='Update' onClick={this.updateTaskDetails} />
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default TaskUpdateModal;
