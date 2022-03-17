import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const CreateAccount = () => {

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
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Full Name" />
                                </Form.Group>
                                <Form.Group className="mb-3 " controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" />
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

    export default CreateAccount;