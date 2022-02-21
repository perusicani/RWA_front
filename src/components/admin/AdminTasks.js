import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { ToastContainer } from 'react-toastify'; //here, not in updatemodal since we need it shown in parent
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactPaginate from 'react-paginate';

import { Link } from 'react-router-dom';

import Task from '../task_components/Task';
import Loader from 'react-spinners/BeatLoader';

//here show update only if task.user_id == our user_id

function AdminTasks() {

    const [tasks, setTasks] = useState([]);
    const [pagination, setPagination] = useState({ total: null, pageCount: 0, currentPage: 0 });

    useEffect(() => {
        getTasks(1);
    }, []);


    const getTasks = async (pageNumber) => {
        axios.get(`/api/tasks?page=${pageNumber}`,
            // {
            //     onDownloadProgress: (progressEvent) => {
            //         console.log('event: ', progressEvent);
            //     }
            // }
        )
            .then(function (response) {
                setTasks(response.data.tasks.data);
                setPagination({ total: response.data.total, pageCount: response.data.numberOfPages, currentPage: response.data.page });
            });

    }

    const handlePageClick = (event) => {
        getTasks(event.selected + 1);
    }


    const Tasks = tasks.map(function (task, i) {
        return <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
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
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={5}
                                        pageCount={pagination.pageCount}
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

export default AdminTasks;