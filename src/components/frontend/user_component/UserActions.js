import React, { useState, useEffect } from 'react';

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
        axios.delete('/api/users/' + props.userId)
            .then((response) => {
                console.log(response);
                toast.success(response.data);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error);
            });
        setShowDelete(false);
    }

    return (
        <div className="btn-group" role="group">
            <ToastContainer />

            <Link to={'/profile?id=' + props.userId} className="btn btn-primary" >view</Link>

            <Link to={'/profile/update?id=' + props.userId} className="btn btn-info" >Update</Link>

            <Button type="button" className="btn btn-danger" onClick={handleShowDelete} >Delete</Button>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you wish to delete this User?</Modal.Body>
                <Modal.Body>This action is irreversable, so think this through!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        No
                    </Button>
                    <Button variant="danger" onClick={deleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        // <div className="btn-group" role="group">
        //     <Button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#viewModal" + props.userId}>View</Button>
        //     {/* the modal is hidden until called */}
        //     {/* pass through the note id and data */}
        //     {/* <ViewModal modalId={props.userId} noteDetails={state} /> */}

        //     <Button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target={"#updateModal" + props.userId}>Update</Button>
        //     {/* <UpdateModal modalId={props.userId} noteDetails={state} /> */}

        //     <Button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#deleteModal" + props.userId}>Delete</Button>
        //     {/* <DeleteModal modalId={props.userId} /> */}
        // </div>
    );

}

export default UserActions;
