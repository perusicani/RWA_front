import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { ToastContainer } from 'react-toastify'; //here, not in updatemodal since we need it shown in parent
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactPaginate from 'react-paginate';

import { Link } from 'react-router-dom';

import Task from '../task_components/Task';
import Loader from 'react-spinners/BeatLoader';

//here show update only if task.user_id == our user_id -> manualno se i dalje more pristupit :(((
function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [pagination, setPagination] = useState({ total: null, pageCount: 0, currentPage: 0 });

    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        getTasks(1);
    }, []);

    const getTasks = async (pageNumber) => {
        axios.get(`/api/tasks?page=${pageNumber}`)
            .then(function (response) {
                setTasks(response.data.tasks.data);
                // setFilteredTasks(response.data.tasks.data);
                setPagination({ total: response.data.total, pageCount: response.data.numberOfPages, currentPage: response.data.page });
            });
    }

    const handlePageClick = (event) => {
        getTasks(event.selected + 1);
    }

    const reload = () => {
        getTasks(pagination.currentPage);
    }

    // useEffect(() => {
    //     return () => {
    //         console.log(tasks);
    //     }
    // }, [tasks]);



    // let result = [];
    // let value = '';

    // const handleSearch = (event) => {
    //     value = event.target.value.toLowerCase();
    //     console.log(value);
    //     if (value !== null && value !== '') {
    //         result = tasks.filter((task) => {
    //             return task.title.toLowerCase().search(value) != -1;
    //         });
    //         setFilteredTasks(result);
    //     } else {
    //         setFilteredTasks(tasks);
    //     }
    // }

    const Tasks = tasks.map(function (task, i) {
        return <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} reload={reload} />
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
                                    {/* filters */}
                                    {/* <input type="text" onChange={(event) => handleSearch(event)} /> */}

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

export default Tasks;