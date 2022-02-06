import React, { Component } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify'; //here, not in updatemodal since we need it shown in parent
import 'react-toastify/dist/ReactToastify.css';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

import Task from '../task_components/Task';

class AdminTasks extends Component {
    // Will need:
    //     table for all AdminTasks
    //     has -> title, description, action buttons -> update, delete

    //     maybe button -> alert user -> sends them an email that warns about illicit content in their task?

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
        }
    }

    //call fetch data on mounted component
    //life cycle method
    componentDidMount() {
        this.getTasks();
    }

    //fetching data
    getTasks = () => {
        let self = this;
        axios.get('/api/tasks').then(function (response) {
            console.log(response.data);
            //set response data to state
            self.setState({
                tasks: response.data,
            });
        });
    }

    dummyData = [
        {
            "name": "test1",
            "description": "Ovo je descript taska 1",
            "user_claim": "owner: user1",
        },
        {
            "name": "test2",
            "description": "Ovo je descript taska 2",
            "user_claim": "owner: user2",
        }

    ];

    render() {
        return (
            <>
                <Breadcrumb>
                    <Breadcrumb.Item href="/admin">Admin</Breadcrumb.Item>
                    <Breadcrumb.Item active>Tasks</Breadcrumb.Item>
                </Breadcrumb>
                <div className="container">
                    <ToastContainer />
                    <div className="column">
                        {
                            this.dummyData.map(function (task, i) {
                                // return <TableRow key={i} data={note} />
                                //va svaki card pass -> title, description, array of checkpoints???, user_claim
                                return <Task key={i} task={task} />
                            })
                            // this.state.tasks.map(function (note, i) {
                            //     // return <TableRow key={i} data={note} />
                            // })
                        }

                    </div>
                </div>
            </>
        );
    }
}

export default AdminTasks;
