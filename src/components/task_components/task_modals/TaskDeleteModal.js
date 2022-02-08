import React, { Component } from 'react';

import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class TaskDeleteModal extends Component {

    constructor(props) {
        super(props);
    }

    // delete individual note
    deleteTask = (taskId) => {
        axios.delete('/api/tasks/' + taskId).then((response) => {
            console.log(response);
            toast.success("Task deleted successfully!");
            setTimeout(() => {
                //TODO: page refresh
            }, 2500);
        }).catch(function (error) {
            console.log(error.response.body);
            toast.error("Task couldn't be deleted");
            // setTimeout(() => {
            //     window.location.reload(); //page refresh
            // }, 2500);
        });
    }

    //rendering component
    render() {
        return (
            //tu nesmije bit #deleteModal (for some reason mora bit različit od onog di ga se zove data-bs-target={"#deleteModal" + this.props.taskId})
            <div className="modal fade" id={"taskDeleteModal" + this.props.modalId} tabIndex="-1" aria-labelledby="taskDeleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="taskDeleteModalLabel">Delete Task?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you wish to delete this Task?
                        </div>
                        {/* <div>
                            <Task task={this.props.task} />
                        </div> */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => this.deleteTask(this.props.modalId)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskDeleteModal;
