import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { ToastContainer } from 'react-toastify'; //here, not in updatemodal since we need it shown in parent
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import ReactPaginate from 'react-paginate';

import { Link } from 'react-router-dom';

import Task from '../task_components/Task';
import Loader from 'react-spinners/BeatLoader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//here show update only if task.user_id == our user_id -> manualno se i dalje more pristupit :(((
function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [pagination, setPagination] = useState({ total: null, pageCount: 0, currentPage: 0 });

    const [completed, setCompleted] = useState('');
    const [search, setSearch] = useState('');

    const [loading, setLoading] = useState(false);

    // const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        getTasks(1);
    }, []);

    const getTasks = async (pageNumber) => {
        setLoading(true);
        // console.log('search: ' + search + ' completed: ' + completed);
        axios.post(`/api/tasks?page=${pageNumber}`, { search: search, completed: completed })
            .then(function (response) {
                // console.log(response.data.tasks.data);
                setTasks(response.data.tasks.data);
                // setFilteredTasks(response.data.tasks.data);
                setPagination({ total: response.data.total, pageCount: response.data.numberOfPages, currentPage: response.data.page });
                setLoading(false);
            });
    }

    const handlePageClick = (event) => {
        getTasks(event.selected + 1);
    }

    const reload = () => {
        getTasks(pagination.currentPage);
    }

    const handleSearch = (event) => {
        setSearch(event.target.value);
        // getTasks(1);
    }

    useEffect(() => {
        // ovo uzme staro stanje state-a aaaaaaaaa whyyyyy
        return () => {
            getTasks(1);
        }
    }, [search, completed]);


    // useEffect(() => {
    //     return () => {
    //         getTasks(pagination.currentPage, search);
    //     }
    // }, [search]);



    // FRONTEND FILTRACJIA
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
    const handleCompletedChange = (event) => {
        // console.log(event.target.value);
        setCompleted(event.target.value);
        // getTasks(1);
    }

    const Tasks = tasks.map(function (task, i) {
        return <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} reload={reload} />
    });
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Tasks</Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <Row>
                    <Col lg='6' >
                        <Link className='btn btn-primary' to='/tasks/create'>Create new</Link>
                    </Col>
                    <Col lg='3'>
                        {/* filters */}
                        <input type="text" onChange={handleSearch} />
                    </Col>
                    <Col lg='3'>
                        <div onChange={handleCompletedChange} className='d-flex justify-content-between'>
                            <div>
                                <input className='radio-item' type="radio" value="" name="completed" defaultChecked /> All
                            </div>
                            <div>
                                <input className='radio-item' type="radio" value="1" name="completed" /> Completed
                            </div>
                            <div>
                                <input className='radio-item' type="radio" value="0" name="completed" /> In progress
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>


            <div className="container" >
                <ToastContainer />
                <div className="column">
                    <div>
                        <>
                            {/* <Form.Check
                                type='checkbox'
                                defaultChecked={false}
                                label='Completed?'
                                onChange={(checkboxStatus) => {
                                    setCompleted(checkboxStatus.target.checked ? "0" : "1");
                                }}
                            /> */}

                            {loading ? <Loader /> : <>
                                {Tasks.length > 0 && Tasks}

                                {Tasks.length > 0 ?
                                    <div className='d-flex justify-content-center pt-4'>
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel=">"
                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={5}
                                            pageCount={pagination.pageCount}
                                            previousLabel="<"
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
                                    </div>
                                    : <Container />}
                            </>}
                        </>
                        {/* {
                            Tasks.length > 0 ?
                                <>
                                    <input type="text" onChange={handleSearch} />
                                    <Form.Check
                                        type='checkbox'
                                        defaultChecked={false}
                                        label='Completed?'
                                        onChange={(checkboxStatus) => {
                                            setCompleted(checkboxStatus.target.checked ? "0" : "1");
                                            getTasks(1);
                                        }}
                                    />
                                    
                                </>
                                :
                                <div>No tasks to be found :( ...</div>
                        } */}
                    </div>

                </div>
            </div>
        </>
    );


}

export default Tasks;