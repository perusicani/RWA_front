import React, { useState } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Link } from 'react-router-dom';

function UserActions(props) {

    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const deleteUser = () => {
        axios.delete('/api/users/delete/' + props.userId)
            .then((response) => {
                toast.success('User deleted successfully!');
                removeUserFromUI();
            })
            .catch((error) => {
                console.log(error);
                toast.error('User deletion failed!');
            });
        setShowDelete(false);
    }

    const removeUserFromUI = () => {
        props.setUsers(props.users.filter(user => {
            if (user.id !== props.user.id) {
                return user;
            }
        }));
    }


    return (
        <div className="btn-group" role="group">
            <ToastContainer />

            <Link to={'/profile?id=' + props.userId} className="btn btn-primary m-1" >view</Link>

            <Link to={'/profile/update?id=' + props.userId} className="btn btn-info m-1" >Update</Link>

            <Button type="button" className="btn btn-danger m-1" onClick={handleShowDelete} >Delete</Button>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you wish to delete this User?</Modal.Body>
                <Modal.Body>This action is irreversable, so think this through or send the user a warning by their email!</Modal.Body>
                <Modal.Body>(Their email can be found on their profile)</Modal.Body>
                <Modal.Footer>
                    <Button className="btn-info" onClick={handleCloseDelete}>
                        No
                    </Button>
                    <Button className="btn-danger" onClick={deleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default UserActions;
