import React, {useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import UserContext from '../Context/UserContext';



const Login = () => {
    
    let userData = useContext(UserContext);
    console.log(userData);
    const handleChange = (e) => {
        userData.setUsername(e.target.value);
    }


    return (
        <>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center mt-5 loginTxt">
                        <h1>Login</h1>
                    </Col>
                </Row>
            </Container>
            <Container >
                <Row className="justify-content-center" >
                    <Col xs={3} className="d-flex justify-content-center mt-3 pt-3 pb-3 loginContainer">
                        <Form>
                            <Form.Group className="mb-3 loginTxt" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" onChange={handleChange} />
                            </Form.Group>
                            {/* span contentEditable onKeyDown={(e) => console.log(e.target.textContent)} */}
                            <Form.Group className="mb-3 loginTxt" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Container>
                                <Row className="d-grid gap-2 mt-2 mb-2 ">
                                    <Button variant="primary" size="sm" className="editBtn" type="submit">
                                        Login
                                    </Button>
                                </Row>
                            </Container>
                            <Row>
                                <Link to="/createaccount" className="text-center">Create an account</Link>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>

            
        </>

    )
}

export default Login;