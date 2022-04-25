import React, { useContext } from "react";
import ProjectDashboardPage from "./ProjectDashboardPage";
import TaskDashboardPage from "../Pages/TaskDashboardPage";
import CreateAccount from "../Pages/CreateAccount";
import Login from "../Pages/Login";
import logo from "../Assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import "../App.css";
import Personnel from "./Personnel";
import UserContext from "../Context/UserContext";

function Home() {
  let userData = useContext(UserContext);

  const handleSignout = () => {
    localStorage.clear();
  }

  return (
    <>
      <BrowserRouter>
        <Navbar className="navbarBG">
          <Container className="justify-content-center d-flex flex-wrap">
            <Row className="justify-content-center pb-0 mb-0">
              <Navbar.Brand className="text-center" href="/">
                <img src={logo} className="img-fluid" />
              </Navbar.Brand>
            </Row>
            {userData.userItems.isAdmin ||
                  userData.userItems.isProjectManager || userData.userItems.isSpecialist ? (
                    <Row className="navbarTxt">
                      <Navbar.Toggle />
                      <Navbar.Collapse className="justify-content-center">
                        <Nav>
                          <Nav.Link as={Link} to="/projectDashboard" className="white">
                            Project Dashboard{" "}
                          </Nav.Link>
                          {userData.userItems.isAdmin ||
                          userData.userItems.isProjectManager ? (
                            <Nav.Link as={Link} to="/personnel" className="white">
                              Personnel{" "}
                            </Nav.Link>
                          ) : null}
                          <Nav.Link as={Link} to="/" className="white" onClick={handleSignout}>
                            Sign Out
                          </Nav.Link>
                        </Nav>
                      </Navbar.Collapse>
                    </Row>

                  ) : null}
          </Container>
        </Navbar>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route
            path="/projectDashboard"
            element={<ProjectDashboardPage />}
          ></Route>
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/taskDashboard" element={<TaskDashboardPage />} />
          <Route path="/personnel" element={<Personnel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Home;
