import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  ListGroup,
  Button,
  Modal,
  Form,
  Card
} from "react-bootstrap";
import ProjectCardComponent from "../Components/ProjectCardComponent";
import NewProjectComponent from "../Components/NewProjectComponent";
import { faMagnifyingGlass, faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { checkToken, getAllUsers, getProjectItemsByUserId, getProjectItemsByAMemberUsername, getAllProjectItems, getProjectItemByTitle, getTaskItemsByProjectID } from "../Services/DataService";
import UserContext from '../Context/UserContext';
import ProjectContext from "../Context/ProjectContext";
import TaskContext from "../Context/TaskContext";


export default function ProjectDashboardPage() {
  let userData = useContext(UserContext);
  let clickedProject1 = useContext(ProjectContext);
  // console.log(userData.userItems)
  // console.log(userData.userItems.isSpecialist)

  const addUserIcon = <FontAwesomeIcon icon={faUserPlus} />
  const editIcon = <FontAwesomeIcon icon={faEdit} />
  let navigate = useNavigate();
  let { userId, setUserId, username, setUsername, isAdmin, setIsAdmin, isProjectManager, setIsProjectManager, isSpecialist, setIsSpecialist, fullName, setFullName, userItems, setUserItems } = useContext(UserContext);
  let { clickedProject, setClickedProject} = useContext(ProjectContext)
  let { allTasks, setAllTasks} = useContext(TaskContext);

  const handleClick = async (e, project) => {
    let project1 = await getProjectItemByTitle(project.title);
    setClickedProject(project1);
    // console.log(clickedProject);
    let allTasks = await getTaskItemsByProjectID(project.id);
    setAllTasks(allTasks);
    navigate("/taskDashboard");
  }

  // for admin edit userRoles modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for admin addUser modal
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [currentProjects, setCurrentProjects] = useState([]);


  const [allUsers, setAllUsers] = useState([]);

  useEffect( async() => {

    let allFetchedUsers;
    let currentFetchedProjects;
    allFetchedUsers = await getAllUsers();
    // console.log(allFetchedUsers)
    setAllUsers(allFetchedUsers);
    
    setTimeout(async () => {
      if (userData.userItems.isSpecialist) {
        currentFetchedProjects = await getProjectItemsByAMemberUsername(userItems.username)
        // console.log("specialist")
      } else if (userData.userItems.isProjectManager) {
        currentFetchedProjects = await getProjectItemsByUserId(userItems.id);
        // console.log("pm")
      } else  {
        currentFetchedProjects = await getAllProjectItems();
        // console.log("admin")
      }
      // console.log(currentFetchedProjects);
      setCurrentProjects(currentFetchedProjects);
      
    }, 3000);
      
  }, [userData])

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
        <h4 className="headerTxt">Your Current Projects: {userItems.id} </h4>
        <Row xs={2} lg={4} className="g-3">
          {/* Map thru current projects here */}
          {/* need function that fetches all current projects of that user, but if user is an admin will show all projects */}
          { currentProjects.map((project, idx) => (
            <div>
              <Card border="danger" style={{ width: '15rem', height: '15rem'}} className="shadow">
                  <Card.Body >
                      <Card.Title className="d-flex justify-content-between">{project.title} <Button className="editBtn">{editIcon}</Button></Card.Title>
                      <Card.Text>
                      <p>Due Date: <span>{project.dueDate}</span></p>
                      <p>Priority: <span>whateverr</span></p>
                      <p>Status: <span>whateverrr</span></p>
                      </Card.Text>
                      <Button className="editBtn" 
                      // onClick={() => navigate("/taskDashboard")}
                      onClick = {(e) => handleClick(e, project)}
                      >View Project</Button>
                  </Card.Body>
              </Card>
            </div>
          ))}
        {
          userData.userItems.isAdmin ?  (
              <NewProjectComponent />
          ) : null 
        }
        </Row>
      </Container>
      <Container>
        <Row className="mt-5">
          {/* Map thru archived projects here */}
          {/* should this be viewable to specialists or just admin and PM? */}
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Archived Projects{viewIcon}</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {currentProjects.map((item, i) => {
                    return (
                      <>
                        {item.isArchived ? (
                          <ListGroup.Item key={i} className="d-flex">
                            <Col>{item.Title}</Col>
                            <Col className=" d-flex justify-content-end">
                              <Button
                                className="editBtn"
                                // onClick={() => navigate("/taskDashboard")}
                                onClick = {() => handleClick(item.Title)}
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
        <Row className="mt-5 mb-5">
          <Col>
            <h3>All Staff</h3>
          </Col>
          {/* only have this button show up if user isAdmin */}
          <Col className="d-flex justify-content-end">
             {
              userData.userItems.isAdmin ? (
                 <Button onClick={handleShow1}>Add a new user {addUserIcon} </Button>
              ) : null
            }
          </Col>
          {/* Map thru archived projects here */}
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Admin {viewIcon}</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {/* map thru all users */}
                  {allUsers.map((user, i) => {
                    return (
                      <>
                        {user.isAdmin ? (
                          <ListGroup.Item key={i} className="d-flex">
                            <Col>{user.fullName}</Col>
                            {/* buttons will only be shown if user isAdmin */}
                            {userData.userItems.isAdmin  ? (
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
                  {allUsers.map((user, i) => {
                    return (
                      <>
                        {user.isProjectManager ? (
                          <ListGroup.Item key={i} className="d-flex">
                            <Col>{user.fullName}</Col>
                            {userData.userItems.isAdmin ? (
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
                  {allUsers.map((user, i) => {
                    return (
                      <>
                        {user.isSpecialist ? (
                          <ListGroup.Item key={i} className="d-flex">
                            <Col>{user.fullName}</Col>
                            {userData.userItems.isAdmin  ? (
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
                    );
                  })}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Staff With Roles Not Assigned</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {/* map thru all users */}
                  {allUsers.map((user, i) => {
                    return (
                      <>
                        {!user.isSpecialist && !user.isProjectManager && !user.isAdmin ? (
                          <ListGroup.Item key={i} className="d-flex">
                            <Col>{user.fullName}</Col>
                            {userData.userItems.isAdmin  ? (
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
