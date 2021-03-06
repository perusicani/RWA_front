import React, { useState } from 'react';

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
                toast.success('Successfully deleted task!');
                removeTaskFromUI();
            })
            .catch((error) => {
                toast.error('Task delete failed!');
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
                <div className='p-1'>
                    <Link to={'/tasks/update?id=' + props.task.id} className="btn btn-info " >Update</Link>
                </div>
                <div className='p-1'>
                    <Button type="button" className="btn btn-danger" onClick={handleShowDelete} >Delete</Button>
                </div>
            </>
        );
    }

    return (
        <div className="btn-group" role="group">
            {TaskButtons}

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Task?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you wish to delete this Task?</Modal.Body>
                <Modal.Footer>
                    <Button className="btn-info" onClick={handleCloseDelete}>
                        No
                    </Button>
                    <Button className="btn-danger" onClick={deleteTask}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TaskActions;
