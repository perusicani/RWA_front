import React, { Component, useState } from 'react';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

// class TaskCreate extends Component {
function TaskCreate(props) {
    // constructor(props) {
    //     super(props);

    //     this.handleInput = this.handleInput.bind(this);

    //     this.createTask = this.createTask.bind(this);
    //     // this.newTutorial = this.newTutorial.bind(this);

    //     this.state = {
    //         title: "",
    //         description: "",
    //     };
    // }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleInputTitle = (event) => {
        setTitle({ [event.target.name]: event.target.value });
    }
    const handleInputDescription = (event) => {
        setDescription({ [event.target.name]: event.target.value });
    }

    const createTask = () => {


        var task = {
            title: title.title,
            description: description.description,
            status: 0,
        };

        var user_id = localStorage.getItem('user_id');

        axios.post('/api/tasks/create', { task: task, user_id: user_id })
            .then(
                response => {

                    if (response.status === 200) {
                        console.log('Task creation success: ' + JSON.stringify(response.data));

                        toast.success(response.data.message);

                        setTimeout(() => {
                            navigate('/tasks');
                        }, 2500);
                    }

                    // this.setState({
                    //     title: response.data.task.title,
                    //     description: response.data.task.description,
                    // });
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

    // render() {
    return <>
        <div>
            <ToastContainer />
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={title.value}
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
                    value={description.value}
                    onChange={handleInputDescription}
                    name="description"
                />
            </div>
            <button onClick={createTask} className="btn btn-success">
                Submit
            </button>
        </div>
    </>
    // }
}

export default TaskCreate;