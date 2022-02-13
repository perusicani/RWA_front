import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

function TaskUpdate() {

    const [id, setId] = useState('');
    const [task, setTask] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState('');

    const navigate = useNavigate();

    const handleInputTitle = (event) => {
        setTitle({ [event.target.name]: event.target.value });
    }
    const handleInputDescription = (event) => {
        setDescription({ [event.target.name]: event.target.value });
    }

    useEffect(() => {
        // GET TASK ID
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        setId({ id: id });

        // GET TASK FROM DB
        axios.get('/api/tasks/' + id)
            .then((response) => {
                console.log(response);
                setTask({ task: response.data.task });
                setTitle({ title: response.data.task.title });
                setDescription({ description: response.data.task.description });
                setUserId({ userId: response.data.task.user_id });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // CLEANUP FUNCTION IMPORTANT!!!!!
    // https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once

    const updateTask = (event) => {
        event.preventDefault();

        var task = {
            id: id.id,
            title: title.title,
            description: description.description,
            status: 0,
        };

        var user_id = userId.userId;

        axios.post('/api/tasks', { task: task, user_id: user_id })
            .then(
                response => {
                    if (response.status === 200) {
                        console.log('Task update success: ' + JSON.stringify(response.data));
                        toast.success(response.data.message);

                        setTimeout(() => {
                            navigate('/tasks');
                        }, 2500);
                    }

                    setTitle({ title: response.data.task.title });
                    setDescription({ description: response.data.task.description });

                    if (response.status === 422) {
                        console.log(response);
                        toast.error(response);
                    }
                })
            .catch(error => {
                console.log(error);
                toast.error(error);
            });
    }

    return <>
        <div>
            <ToastContainer />
            <h1>{id.id}</h1>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={title.title ?? ''}   // https://stackoverflow.com/questions/47012169/a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-erro
                    onChange={handleInputTitle}
                    name="title"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={description.description ?? ''}
                    onChange={handleInputDescription}
                    name="description"
                />
            </div>
            <button onClick={updateTask} className="btn btn-success">
                Submit
            </button>
        </div>
    </>
}

export default TaskUpdate;