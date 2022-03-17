import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const CreateAccount = () => {

        return (
            <>
                <Container>
                    <Row>
                        <Col className="d-flex justify-content-center loginTxt mt-5">
                            <h1>Create an account</h1>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={3} className="d-flex justify-content-center mt-3 pt-3 pb-3 loginContainer">
                            <Form>
                                <Form.Group className="mb-3 loginTxt" controlId="formBasicEmail">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Full Name" />
                                </Form.Group>
                                <Form.Group className="mb-3 loginTxt" controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" />
                                </Form.Group>
                                <Form.Group className="mb-3 loginTxt" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                    {/* <Link to="../">Login</Link> */}
                                </Form.Group>
                                <Container>
                                <Row className="d-grid gap-2 mt-2 mb-2 ">
                                    <Button variant="primary" size="sm" className="editBtn" type="submit">
                                        Create an account
                                    </Button>
                                </Row>
                            </Container>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>

        )
    }

    export default CreateAccount;