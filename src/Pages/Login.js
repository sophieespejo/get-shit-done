import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <h1>Login</h1>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center mt-3">
                        <Form>
                            <Form.Group className="mb-3 " controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                                <Link to="/createaccount">Create an account</Link>
                            </Form.Group>
                            
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                            
                            
                        </Form>
                    </Col>
                </Row>
            </Container>

            
        </>

    )
}

export default Login;