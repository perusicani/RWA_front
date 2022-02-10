import React, { Component } from 'react';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class TaskUpdate extends Component {

    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);

        this.updateTask = this.updateTask.bind(this);
        // this.newTutorial = this.newTutorial.bind(this);

        this.state = {
            id: null,
            task: null,
            title: '',
            description: '',
            user_id: null,
        };

    }


    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        // GET TASK ID
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        this.setState({ id: id });

        // GET TASK FROM DB
        axios.get('/api/tasks/' + id)
            .then((response) => {
                console.log(response);
                this.setState({
                    task: response.data.task,
                    title: response.data.task.title,
                    description: response.data.task.description,
                    user_id: response.data.task.user_id
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateTask() {
        var task = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            status: 0,
        };

        var user_id = this.state.user_id;

        axios.post('/api/tasks', { task: task, user_id: user_id })
            .then(
                response => {
                    if (response.status === 200) {
                        console.log('Task update success: ' + JSON.stringify(response.data));
                        toast.success(response.data.message);
                    }

                    this.setState({
                        title: response.data.task.title,
                        description: response.data.task.description,
                    });

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

    render() {
        return <>
            <div>
                <ToastContainer />
                <h1>{this.state.id}</h1>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={this.state.title}
                        onChange={this.handleInput}
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
                        value={this.state.description}
                        onChange={this.handleInput}
                        name="description"
                    />
                </div>
                <button onClick={this.updateTask} className="btn btn-success">
                    Submit
                </button>
            </div>
        </>
    }
}

export default TaskUpdate;