import axios from 'axios';
import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavBar() {

    const navigate = useNavigate();

    const logoutSubmit = (event) => {
        event.preventDefault();

        axios.post('/api/logout').then(response => {
            if (response.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('user_id');
                localStorage.removeItem('role');

                toast.success(response.data.message);

                setTimeout(() => {
                    navigate('/');
                }, 2500);
            }
        }).catch((error) => {
            console.log('Logout: ' + error);
            toast.error('Logout failed!');
        });
    }

    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')) {
        /* login and register */
        AuthButtons = (
            <>
                <Nav.Item >
                    <Nav.Link eventKey="/login" href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/register" href="/register">Register</Nav.Link>
                </Nav.Item>
            </>
        )
    } else {
        /* logout */
        AuthButtons = (
            <>
                <Nav.Item> <Nav.Link href="/tasks">Tasks</Nav.Link> </Nav.Item>

                {/* <Link to={'/tasks/update?id=' + props.task.id} className="btn btn-info" >Update</Link> */}
                <Nav.Item> <Nav.Link href={'/profile?id=' + localStorage.getItem('user_id')}>Profile</Nav.Link> </Nav.Item>
                <Button type='button' onClick={logoutSubmit} className="nav-link btn btn-logout btn-sm text-white" >Logout</Button>
            </>
        );
    }

    return (
        <Navbar bg="dark" variant="dark" expand >
            <ToastContainer />
            <Container className='d-flex justify-content-start'>
                <Navbar.Brand href="/" className='mr-auto' >Do my bidding</Navbar.Brand>
            </Container>
            <Container className='d-flex justify-content-end'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav.Item> <Nav.Link href="/">Home</Nav.Link> </Nav.Item>
                {AuthButtons}
            </Container>
        </Navbar>
    );

}

export default NavBar;

// return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
//         <ToastContainer />
//         <div className="container">
//             <Link className="navbar-brand" to="/">Do my bidding</Link>
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                 <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                     <li className="nav-item">
//                         <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//                     </li>
//                     {AuthButtons}
//                 </ul>
//             </div>
//         </div>
//     </nav>
// );