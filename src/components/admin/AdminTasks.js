import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify'; //here, not in updatemodal since we need it shown in parent
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactPaginate from 'react-paginate';

import Loader from 'react-spinners/BeatLoader';

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
            total: null,
            pageCount: 0,
            currentPage: 0,
        }
    }

    //call fetch data on mounted component
    //life cycle method
    componentDidMount() {
        this.getTasks(1);
    }

    //fetching data
    getTasks = async pageNumber => {

        let self = this;

        axios.get(`/api/tasks?page=${pageNumber}`)
            .then(function (response) {
                // console.log(response.data);
                // console.log('response.data.tasks.data ' + response.data.tasks.data);
                // console.log('response.data.pageCount ' + response.data.pageCount);

                self.setState({
                    tasks: response.data.tasks.data,
                    total: response.data.total,
                    pageCount: response.data.numberOfPages,
                    currentPage: response.data.page,
                });
            });

    }
    handlePageClick = (event) => {
        // console.log(event.selected);
        this.getTasks(event.selected + 1);
    }

    render() {
        const Tasks = this.state.tasks.map(function (task, i) {
            //va svaki card pass -> title, description, array of checkpoints???, user_claim
            return <Task key={i} task={task} />
        });

        return (
            <>
                <ToastContainer />
                <Breadcrumb>
                    <Breadcrumb.Item href="/admin">Admin</Breadcrumb.Item>
                    <Breadcrumb.Item active>Tasks</Breadcrumb.Item>
                </Breadcrumb>
                <div className="container" >
                    <div className="column">
                        {
                            Tasks.length > 0 ?
                                <>
                                    {Tasks.length > 0 && Tasks}
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="next >"
                                        onPageChange={this.handlePageClick}
                                        pageRangeDisplayed={5}
                                        pageCount={this.state.pageCount}
                                        previousLabel="< previous"
                                        renderOnZeroPageCount={null}
                                        containerClassName='pagination'
                                        pageClassName='page-item'
                                        pageLinkClassName='page-link'
                                        previousClassName='page-item'
                                        previousLinkClassName='page-link'
                                        nextClassName='page-item'
                                        nextLinkClassName='page-link'
                                        breakClassName='page-item'
                                        breakLinkClassName='page-link'
                                        activeClassName='active'
                                    />
                                </>
                                :
                                <Loader />
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default AdminTasks;