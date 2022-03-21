import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { createAccount } from "../Services/DataService";

const CreateAccount = () => {
  let navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  const handleSubmit = async () => {
    let userData = {
      Id: 0,
      FullName: fullName,
      Username: username,
      Password: password,
    };
    let result = await createAccount(userData);
    result ? navigate("/projectDashboard") : toggleShowA();
  };
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
          <Col
            xs={3}
            className="d-flex justify-content-center mt-3 pt-3 pb-3 loginContainer"
          >
            <Form>
              <Form.Group className="mb-3 loginTxt" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Full Name"
                  onChange={({ target: { value } }) => setFullName(value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 loginTxt" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={({ target: { value } }) => setUserName(value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 loginTxt"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={({ target: { value } }) => setPassword(value)}
                />
              </Form.Group>
              <Container>
                <Row className="d-grid gap-2 mt-2 mb-2 ">
                  <Button
                    variant="primary"
                    size="sm"
                    className="editBtn"
                    onClick={handleSubmit}
                  >
                    Create an account
                  </Button>
                </Row>
              </Container>
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
            <strong className="me-auto">Unable to create an account</strong>
          </Toast.Header>
          <Toast.Body>Please try again</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default CreateAccount;
