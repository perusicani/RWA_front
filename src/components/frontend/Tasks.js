import React, { Component } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify'; //here, not in updatemodal since we need it shown in parent
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactPaginate from 'react-paginate';

import { Link } from 'react-router-dom';

import Task from '../task_components/Task';
import Loader from 'react-spinners/BeatLoader';

//here show update only if task.user_id == our user_id

class Tasks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            total: null,
            pageCount: 0,
            currentPage: 0,
        }
    }

    componentDidMount() {
        this.getTasks(1);
    }

    getTasks = async pageNumber => {

        let self = this;

        axios.get(`/api/tasks?page=${pageNumber}`,
            // {
            //     onDownloadProgress: (progressEvent) => {
            //         console.log('event: ', progressEvent);
            //     }
            // }
        )
            .then(function (response) {
                self.setState({
                    tasks: response.data.tasks.data,
                    total: response.data.total,
                    pageCount: response.data.numberOfPages,
                    currentPage: response.data.page,
                });
            });

    }

    handlePageClick = (event) => {
        this.getTasks(event.selected + 1);
    }

    render() {
        const Tasks = this.state.tasks.map(function (task, i) {
            return <Task key={i} task={task} />
        });

        return (
            <>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Tasks</Breadcrumb.Item>
                </Breadcrumb>
                <Link className='btn btn-primary' to='/tasks/create'>Create new</Link>
                <div className="container" >
                    <ToastContainer />
                    <div className="column">
                        <div>
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
                </div>
            </>
        );
    }

}

export default Tasks;