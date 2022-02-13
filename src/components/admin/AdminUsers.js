import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { ToastContainer } from 'react-toastify'; //here, not in updatemodal since we need it shown in parent
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactPaginate from 'react-paginate';

import Loader from 'react-spinners/BeatLoader';

import UserCard from '../frontend/user_component/UserCard';

function AdminUsers() {

    // Will need:
    //     table of all AdminUsers
    //     has-> user name, email, tasks (button that either opens modal with their tasks or goes to page tasks with filter for that user?), action buttons -> email them, remove
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({ total: null, pageCount: 0, currentPage: 0 });

    useEffect(() => {
        getUsers(1);
    }, []);


    const getUsers = async (pageNumber) => {

        axios.get(`/api/users?page=${pageNumber}`)
            .then(function (response) {
                console.log(response.data);

                setUsers(response.data.users.data);
                setPagination({ total: response.data.total, pageCount: response.data.numberOfPages, currentPage: response.data.page });
            });

    }

    const handlePageClick = (event) => {
        getUsers(event.selected + 1);
    }


    const Users = users.map(function (user, i) {
        //va svaki card pass -> title, description, array of checkpoints???, user_claim
        return <UserCard key={i} user={user} />
    });

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/admin">Admin</Breadcrumb.Item>
                <Breadcrumb.Item active>Users</Breadcrumb.Item>
            </Breadcrumb>
            <div className="container">
                <ToastContainer />
                <div className="column">
                    {
                        Users.length > 0 ?
                            <>
                                {Users.length > 0 && Users}

                                < ReactPaginate
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
                            : <Loader />
                    }
                </div>
            </div>
        </>
    );

}

export default AdminUsers;