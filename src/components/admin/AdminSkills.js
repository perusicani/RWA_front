import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';

import ReactPaginate from 'react-paginate';

import { Link } from 'react-router-dom';

import Loader from 'react-spinners/BeatLoader';

import AdminSkill from './AdminSkill';

function AdminSkills() {

    const [skills, setSkills] = useState([]);
    const [pagination, setPagination] = useState({ total: null, pageCount: 0, currentPage: 0 });

    useEffect(() => {
        getSkills(1);
    }, []);


    const getSkills = async (pageNumber) => {
        axios.get(`/api/skills?page=${pageNumber}`)
            .then(function (response) {
                setSkills(response.data.skills.data);
                setPagination({ total: response.data.total, pageCount: response.data.numberOfPages, currentPage: response.data.page });
            });

    }

    const handlePageClick = (event) => {
        getSkills(event.selected + 1);
    }

    const deleteSkill = (id) => {
        axios.delete('/api/skills/' + id)
            .then((response) => {
                console.log(response);
                toast.success(response.data);

                getSkills(pagination.currentPage);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error);
            });
    }


    const Skills = skills.map(function (skill, i) {
        return (
            <tr key={i}>
                <AdminSkill skill={skill} delete={deleteSkill} />
            </tr>
        );
    });

    return (
        <>
            <ToastContainer />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Skills</Breadcrumb.Item>
            </Breadcrumb>
            <Link className='btn btn-primary' to='/admin/skills/create'>Create new</Link>
            <div className="container" >
                <ToastContainer />
                <div className="column">
                    <div>
                        {
                            Skills.length > 0 ?
                                <>
                                    <Table striped bordered hover variant="dark" style={{ margin: 10 }}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Skill</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Skills.length > 0 && Skills}
                                        </tbody>
                                    </Table>
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

export default AdminSkills;