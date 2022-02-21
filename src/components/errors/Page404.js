import React from "react";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import { Link } from 'react-router-dom';

function Page404() {
    return (
        <Container flex='true'>
            <Card style={{ marginTop: 50, marginBottom: 50, padding: 50 }} >
                <h1>Page 404 | Not Found</h1>
                <h3>Url / Page you are seaching was not found.</h3>
                <Link className='btn btn-primary' to='/'>Back to home :(</Link>
            </Card>
        </Container>
    );
}

export default Page404;
