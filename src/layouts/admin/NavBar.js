import React from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {

    const navigate = useNavigate();

    const logoutSubmit = (event) => {
        event.preventDefault();

        axios.post('/api/logout').then(response => {
            if (response.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');

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

    return (
        <Navbar className="sb-topnav navbar navbar-expand navbar-dark bg-dark flex">
            <ToastContainer />
            <Container>
                <Navbar.Brand href="/admin">Admin panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link> */}
                        <NavDropdown title="More actions" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">Back to FrontEnd</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item style={{ color: 'red' }} onClick={logoutSubmit}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;