import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

function TaskActions(props) {

    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const deleteTask = () => {
        axios.delete('/api/tasks/delete/' + props.task.id)
            .then((response) => {
                console.log(response);
                toast.success(response.data);
                removeTaskFromUI();
            })
            .catch((error) => {
                console.log(error);
                toast.error(error);
            });
        setShowDelete(false);
    }

    const removeTaskFromUI = () => {
        props.setTasks(props.tasks.filter(task => {
            if (task.id !== props.task.id) {
                return task;
            }
        }));
    }

    var TaskButtons = '';
    if (props.task.user_id.toString() === localStorage.getItem('user_id') || localStorage.getItem('role') === 'true') {
        TaskButtons = (
            <>
                <Link to={'/tasks/update?id=' + props.task.id} className="btn btn-info" >Update</Link>

                <Button type="button" className="btn btn-danger" onClick={handleShowDelete} >Delete</Button>
            </>
        );
    }

    return (
        <div className="btn-group" role="group">
            <ToastContainer />

            {TaskButtons}

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Task?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you wish to delete this Task?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        No
                    </Button>
                    <Button variant="danger" onClick={deleteTask}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TaskActions;
