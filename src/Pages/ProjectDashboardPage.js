import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  ListGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import ProjectCardComponent from "../Components/ProjectCardComponent";
import NewProjectComponent from "../Components/NewProjectComponent";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function ProjectDashboardPage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  let navigate = useNavigate();

  const [blogItems, setBlogItems] = useState([
    {
      Id: 1,
      isPublished: true,
      isArchived: true,
      isProjectManager: true,
      isAdmin: false,
      Title: "Growing Tomatos",
      Publisher: "Walaa AlSalmi",
      Date: "01-12-2022",
      Text: "Devote a prime, sunny spot to growing tomatoes. Tomatoes need at least 6 to 8 hours of sun to bring out their best flavors. You will need to stake, trellis, or cage most tomato plants to keep them off the ground. Decide on a support plan before you set out your plants, then add that support directly after planting. You will need to stake, trellis, or cage most tomato plants to keep them off the ground. Decide on a support plan before you set out your plants.",
      Image:
        "https://www.almanac.com/sites/default/files/styles/landscape/public/image_nodes/tomatoes_helios4eos_gettyimages-edit.jpeg?itok=m9c3T-XV",
    },

    {
      Id: 2,
      isArchived: true,
      isPublished: true,
      isProjectManager: true,
      isAdmin: false,
      Title: "Growing Peppers",
      Date: "01-06-2022",
      Publisher: "Tom Finland",
      Text: "Set pepper plant seedlings out after the last spring frost. They grow well in raised beds, containers, and in-ground gardens. Plant them 18 to 24 inches apart in a sunny, well-drained spot. Pepper plants need at least 6-8 hours of sunlight per day. They grow well in raised beds, containers, and in-ground gardens. Plant them 18 to 24 inches apart in a sunny, well-drained spot. Pepper plants need at least 6-8 hours of sunlight per day.",
      Image:
        "https://www.farmersalmanac.com/wp-content/uploads/2020/11/Planting-Guide-Bell-Peppers-A105431708.jpg",
    },
    {
      Id: 3,
      isArchived: true,
      isPublished: true,
      isProjectManager: false,
      isAdmin: true,
      Title: "Growing Eggplants",
      Publisher: "Sam Bilton",
      Date: "12-24-2021",
      Text: "Start eggplant seeds indoors up to 10 weeks before the last frost date. Plant the seeds 1/4inch deep, water after planting and cover loosely with plastic to retain moisture. Transplant the seedlings to the garden when soil temperatures reach 60 degrees. Transplant the seedlings to the garden when soil temperatures reach 60 degrees.",
      Image:
        "https://cleangreensimple.com/wp-content/uploads/2020/05/growing-eggplant.jpg",
    },
    {
      Id: 4,
      isArchived: true,
      isPublished: true,
      isProjectManager: false,
      isAdmin: true,
      Title: "Growing Zucchinis",
      Publisher: "Tina Freedman",
      Date: "12-15-2021",
      Text: "Zucchini needs full sun (at least 6 to 8 hours) and consistently moist soil that is high in organic matter. Some zucchini varieties are vining types that require a trellis or a lot of room to sprawl. There are also bush types suitable for container gardening and small space gardening. There are also bush types suitable for container gardening and small space gardening.",
      Image:
        "https://greenhouseemporium.com/wp-content/uploads/2020/02/How_to_Grow_Zucchini_2.jpg",
    },
  ]);

  const { viewIcon } = <FontAwesomeIcon icon={faMagnifyingGlass} />;
  return (
    <>
      <Container className="mt-5">
        <h4 className="headerTxt">Your Current Projects:</h4>
        <Row xs={2} lg={4} className="g-3">
          {/* Map thru current projects here */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProjectCardComponent />
          ))}
          <NewProjectComponent />
        </Row>
      </Container>
      <Container>
        <Row className="mt-5">
          {/* Map thru archived projects here */}
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Archived Projects{viewIcon}</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {blogItems.map((item, i) => {
                    return (
                      <>
                        {item.isArchived ? (
                          <ListGroup.Item key={i} className="d-flex">
                            <Col>{item.Title}</Col>
                            <Col className=" d-flex justify-content-end">
                              <Button
                                className="editBtn"
                                onClick={() => navigate("/taskDashboard")}
                              >
                                View Project {viewIcon}
                              </Button>
                            </Col>
                          </ListGroup.Item>
                        ) : null}
                      </>
                    );
                  })}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>

      {/* see all users and roles */}
      <Container>
        <Row className="mt-5">
          <Col>
            <h3>All Staff</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button onClick={handleShow1}>Add a new user</Button>
          </Col>
          {/* Map thru archived projects here */}
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Admin {viewIcon}</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {/* map thru all users */}
                  {blogItems.map((item, i) => {
                    return (
                      <>
                        <ListGroup.Item key={i} className="d-flex">
                          {/* user.FullName */}
                          <Col>{item.Title}</Col>
                          {/* check to see if user.isAdmin */}
                          {item.isPublished ? (
                            <Col className=" d-flex justify-content-end">
                              <Button variant="danger" className="">
                                Delete user
                              </Button>
                              <Button
                                variant="info"
                                className=""
                                onClick={handleShow}
                              >
                                Change role
                              </Button>
                            </Col>
                          ) : null}
                        </ListGroup.Item>
                      </>
                    );
                  })}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Project Managers</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {/* map thru all users */}
                  {blogItems.map((item, i) => {
                    return (
                      <>
                        {item.isProjectManager ? (
                          <ListGroup.Item key={i} className="d-flex">
                            <Col>{item.Title}</Col>
                            {item.isPublished ? (
                              <Col className=" d-flex justify-content-end">
                                <Button variant="danger" className="">
                                  Delete user
                                </Button>
                                <Button
                                  variant="info"
                                  className=""
                                  onClick={handleShow}
                                >
                                  Change role
                                </Button>
                              </Col>
                            ) : null}
                          </ListGroup.Item>
                        ) : null}
                      </>
                      // <>
                      // {/* check to see if the user.isProjectManager */}
                      // <ListGroup.Item key={i} className="d-flex">
                      //   {item.isProjectManager ? (
                      //     <>
                      //       {/* user.FullName */}
                      //       <Col>{item.Title}</Col>
                      //     </>
                      //   ) : null }
                      // {/* check to see if user.isAdmin */}
                      // {/* check useContext to see if the logged is an admin */}
                      //   {item.isPublished ? (
                      //     <Col className=" d-flex justify-content-end">
                      //         <Button variant = "danger" className="">Delete user</Button>
                      //         <Button variant = "info" className="">Change role</Button>
                      //       </Col>
                      //   ) : null}
                      //   </ListGroup.Item>
                      // </>
                    );
                  })}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Specialists</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {/* map thru all users */}
                  {blogItems.map((item, i) => {
                    return (
                      <>
                        {/* map thru specialists */}
                        <ListGroup.Item key={i} className="d-flex">
                          {/* user.FullName */}
                          <Col>{item.Title}</Col>
                          {/* check to see if user.isAdmin */}
                          {item.isPublished ? (
                            <Col className=" d-flex justify-content-end">
                              <Button variant="danger" className="">
                                Delete user
                              </Button>
                              <Button
                                variant="info"
                                className=""
                                onClick={handleShow}
                              >
                                Change role
                              </Button>
                            </Col>
                          ) : null}
                        </ListGroup.Item>
                      </>
                    );
                  })}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>

        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* get full name from e.target */}
            <h3>Staff Name</h3>
            <Form>
              <Form.Group>
                <Form.Label>Update Role</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="mt-2"
                  // value={blogCategory}
                  // onChange={({ target: { value } }) => setBlogCategory(value)}
                >
                  <option>Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="PM">Project Manager</option>
                  <option value="Specialist">Specialist</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* tie this button to function that will update user role */}
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="email" placeholder="Enter full name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Add a Role</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="mt-2"
                  // value={blogCategory}
                  // onChange={({ target: { value } }) => setBlogCategory(value)}
                >
                  <option>Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="PM">Project Manager</option>
                  <option value="Specialist">Specialist</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose1}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
