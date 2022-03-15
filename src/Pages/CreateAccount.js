import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <h1>Create an account</h1>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center mt-3">
                        <Form>
                            <Form.Group className="mb-3 " controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                                {/* <Link to="../">Login</Link> */}
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>

    )
}

export default Login;