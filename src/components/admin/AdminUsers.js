import React, { Component } from 'react';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify'; //here, not in updatemodal since we need it shown in parent
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactPaginate from 'react-paginate';

import UserCard from '../frontend/user_component/UserCard';

class AdminUsers extends Component {

    // Will need:
    //     table of all AdminUsers
    //     has-> user name, email, tasks (button that either opens modal with their tasks or goes to page tasks with filter for that user?), action buttons -> email them, remove
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            total: null,
            pageCount: 0,
            currentPage: 0,
        }
    }

    //call fetch data on mounted component
    //life cycle method
    componentDidMount() {
        this.getUsers(1);
    }

    //fetching data
    getUsers = async pageNumber => {

        let self = this;

        axios.get(`/api/users?page=${pageNumber}`)
            .then(function (response) {
                // console.log(response.data);
                // console.log('response.data.tasks.data ' + response.data.tasks.data);
                // console.log('response.data.pageCount ' + response.data.pageCount);

                self.setState({
                    users: response.data.users.data,
                    total: response.data.total,
                    pageCount: response.data.numberOfPages,
                    currentPage: response.data.page,
                });
            });

    }

    handlePageClick = (event) => {
        console.log(event.selected);
        this.getUsers(event.selected + 1);
    }

    render() {
        const Users = this.state.users.map(function (user, i) {
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

                        {Users.length > 0 && Users}

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
                    </div>
                </div>
            </>
        );
    }

}

export default AdminUsers;