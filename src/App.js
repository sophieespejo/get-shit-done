import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import logo from "./Assets/logo.png";
import ProjectDashboardPage from "./Pages/ProjectDashboardPage";
import TaskDashboardPage from "./Pages/TaskDashboardPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar sticky="top" className="navbarBG">
          <Container className="justify-content-center d-flex flex-wrap">
            <Row className="justify-content-center pb-0 mb-0">
              <Navbar.Brand className=" text-center" href="/">
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

                  <Nav.Link as={Link} to="/">
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
        <TaskDashboardPage/>
        <Routes>
          <Route path="/" ></Route>
          <Route path="/projectDashboard" element={<ProjectDashboardPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
