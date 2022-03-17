import React, {useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { logIn } from '../Services/DataService';


export default function Login() {    
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);

    const handleSubmit = async () => {
        let userData = {
            Username: username,
            Password: password
        }
        let token = await logIn(userData);
        
        if(token.token != null){
            localStorage.setItem("Token", token.token);
            //GetLoggedInUserData(Username);
            navigate("/projectDashboard");
        }
        else{
            toggleShowA();
        }
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
                                <Form.Control type="text" placeholder="Enter username" onChange={({ target }) => setUsername(target.value)}/>
                            </Form.Group>
                            {/* span contentEditable onKeyDown={(e) => console.log(e.target.textContent)} */}
                            <Form.Group className="mb-3 loginTxt" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={({ target }) => setPassword(target.value)}/>
                            </Form.Group>
                            <Container>
                                <Row className="d-grid gap-2 mt-2 mb-2 ">
                                    <Button variant="primary" size="sm" className="editBtn" type="submit" onClick={handleSubmit}>
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
            <ToastContainer position="top-center">
        <Toast show={!showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Unable to login</strong>
          </Toast.Header>
          <Toast.Body>Please try again</Toast.Body>
        </Toast>
      </ToastContainer>
            
        </>

    )
}
