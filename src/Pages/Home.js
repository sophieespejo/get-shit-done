import React from 'react'
import ProjectDashboardPage from './ProjectDashboardPage';
import TaskDashboardPage from "../Pages/TaskDashboardPage";
import CreateAccount from "../Pages/CreateAccount";
import Login from "../Pages/Login";
import logo from "../Assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import "../App.css";

function Home() {
  return (
    <>
      <BrowserRouter>
        <Navbar className="navbarBG">
          <Container className="justify-content-center d-flex flex-wrap">
            <Row className="justify-content-center pb-0 mb-0">
              <Navbar.Brand className="text-center" href="/">
                <img
                  src= {logo}
                  className="img-fluid"
                />
              </Navbar.Brand>
            </Row>
            <Row className="navbarTxt">
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-center">
                <Nav>
                  <Nav.Link as={Link} to="/projectDashboard">
                    Project Dashboard{" "}
                  </Nav.Link>

                  <Nav.Link as={Link} to="../">
                    {" "}
                    Login/Create an Account{" "}
                  </Nav.Link>
                  <Nav.Link as={Link} to="/">
                    Sign Out 
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Row>
          </Container>
        </Navbar>
        <Routes>
          <Route index element={<Login />} ></Route>
          <Route path="/projectDashboard" element={<ProjectDashboardPage />}></Route>
          {/* <Route path="login" element={<Login></Login>} /> */}
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/taskDashboard" element={<TaskDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Home