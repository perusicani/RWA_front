import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import CheckpointUpdate from './CheckpointsUpdate';
import Loader from 'react-spinners/BeatLoader';

function TaskUpdate() {

    const [loading, setLoading] = useState(false);

    const [id, setId] = useState('');
    const [stateTask, setStateTask] = useState(null);
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
        setLoading(true);
        // GET TASK ID
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        setId({ id: id });

        // GET TASK FROM DB
        axios.get('/api/tasks/' + id)
            .then((response) => {
                console.log(response);
                setStateTask({ task: response.data.task });
                setTitle({ title: response.data.task.title });
                setDescription({ description: response.data.task.description });
                setUserId({ userId: response.data.task.user_id });
                setCheckpoints(response.data.task.checkpoints);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []); // CLEANUP FUNCTION IMPORTANT!!!!!
    // https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once

    const updateTask = (event) => {
        setLoading(true);
        event.preventDefault();

        var task = {
            id: id.id,
            title: title.title,
            description: description.description,
            status: stateTask.task.status,
        };

        var user_id = userId.userId;

        axios.post('/api/tasks', { task: task, user_id: user_id })
            .then(response => {
                if (response.status === 200) {
                    console.log('Task update success: ' + JSON.stringify(response.data));
                    toast.success(response.data.message);

                }
                setStateTask({ task: response.data.task });
                setTitle({ title: response.data.task.title });
                setDescription({ description: response.data.task.description });

                if (response.status === 422) {
                    console.log(response);
                    toast.error(response);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.log(error);
                toast.error(error);
                setLoading(false);
            });

        axios.post('/api/checkpoints', { checkpoints: checkpoints })
            .then((response) => {
                console.log(response);
                toast.error(response);

                setLoading(false);

                navigate('/tasks');

            }).catch((error) => {
                console.log(error);
                toast.error(error);
                setLoading(false);
            });
    }

    const [checkpoints, setCheckpoints] = useState([]);

    var CheckpointsUpdates = [];

    if (stateTask != null) {
        CheckpointsUpdates = checkpoints.map(function (checkpoint, i) {
            return <CheckpointUpdate key={i} checkpoint={checkpoint} />;
        });
    }

    var SubmitButton = '';
    if (stateTask != null && (stateTask.task.user_id.toString() === localStorage.getItem('user_id') || localStorage.getItem('role') === 'true')) {
        SubmitButton = (
            <button onClick={updateTask} className="btn btn-success">
                Submit
            </button>
        );
    }

    if (loading) return <Loader />

    const MainDisplay = () => {
        if (loading) {
            return (<Loader />);
        } else {
            return (<div>
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
                {CheckpointsUpdates}
                {SubmitButton}
            </div>);
        }
    }

    return <div>
        {MainDisplay()}
    </div>;

}

export default TaskUpdate;