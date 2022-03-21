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
  Card,
  Spinner,
} from "react-bootstrap";
import ProjectCardComponent from "../Components/ProjectCardComponent";
import NewProjectComponent from "../Components/NewProjectComponent";
import {
  faMagnifyingGlass,
  faUserPlus,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  checkToken,
  getAllUsers,
  updateUser,
  getProjectItemsByUserId,
  getProjectItemsByAMemberUsername,
  getAllProjectItems,
  getProjectItemByTitle,
  updateUserRole,
  getTaskItemsByProjectID,
  createAccount,
  getProjectItemsByAMemberId,
  updateProjectItem,
} from "../Services/DataService";
import UserContext from "../Context/UserContext";
import ProjectContext from "../Context/ProjectContext";
import TaskContext from "../Context/TaskContext";

export default function ProjectDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  let userData = useContext(UserContext);
  let clickedProject1 = useContext(ProjectContext);
  // console.log(userData.userItems)
  // console.log(userData.userItems.isSpecialist)
  console.log(userData.userItems);

  const addUserIcon = <FontAwesomeIcon icon={faUserPlus} />;
  const editIcon = <FontAwesomeIcon icon={faEdit} />;
  let navigate = useNavigate();
  let {
    userId,
    setUserId,
    username,
    setUsername,
    isAdmin,
    setIsAdmin,
    isProjectManager,
    setIsProjectManager,
    isSpecialist,
    setIsSpecialist,
    fullName,
    setFullName,
    userItems,
    setUserItems,
  } = useContext(UserContext);
  let {
    clickedProject,
    setClickedProject,
    currentProjects,
    setCurrentProjects,
  } = useContext(ProjectContext);
  let { allTasks, setAllTasks } = useContext(TaskContext);
  const [currentClickedProject, setCurrentClickedProject] = useState({});

  const handleClick = async (e, project) => {
    let project1 = await getProjectItemByTitle(project.title);
    setClickedProject(project1);
    let allTasks = await getTaskItemsByProjectID(project.id);
    setAllTasks(allTasks);
    navigate("/taskDashboard");
  };

  // for admin edit userRoles modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for admin addUser modal
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const [allSpecialist, setAllSpecialist] = useState([]);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDueDate, setProjectDueDate] = useState("");

  const handleAddMember = (e, id) => {
    e.target.classList.toggle("active");
    // Add member to project
    let stringId = id.toString();

    let splitArr = [];
    splitArr = currentClickedProject.membersId.split(",");

    let updatedMembers = [];
    splitArr.push(stringId);
    updatedMembers = splitArr;

    let updatedProject = {
      Id: currentClickedProject.id,
      UserId: currentClickedProject.userId,
      Title: projectTitle,
      Description: projectDescription,
      DateCreated: currentClickedProject.dateCreated,
      DueDate: projectDueDate,
      Status: "test",
      MembersId: updatedMembers.join(","),
      MembersUsername: "test",
      IsDeleted: currentClickedProject.isDeleted,
      IsArchived: currentClickedProject.isArchived,
    };
    updateProjectItem(updatedProject);
    handleClose();
  };

  const handleRemoveMember = (e, id) => {
    e.target.classList.toggle("active");
    // Remove member from project

    let stringId = id.toString();

    let splitArr = [];
    splitArr = currentClickedProject.membersId.split(",");

    let updatedMembers = [];

    splitArr.splice(1, stringId);
    updatedMembers = splitArr;

    let updatedProject = {
      Id: currentClickedProject.id,
      UserId: currentClickedProject.userId,
      Title: projectTitle,
      Description: projectDescription,
      DateCreated: currentClickedProject.dateCreated,
      DueDate: projectDueDate,
      Status: "test",
      MembersId: updatedMembers.join(",").toString(),
      MembersUsername: "test",
      IsDeleted: currentClickedProject.isDeleted,
      IsArchived: currentClickedProject.isArchived,
    };
    updateProjectItem(updatedProject);
    handleClose();
  };

  let allFetchedUsers;

  const setRole = async (value) => {
    console.log(value);
    console.log(selectedUser.username);

    if (value == "Admin") {
      updateUserRole(selectedUser.username, true, false, false);
    } else if (value == "PM") {
      updateUserRole(selectedUser.username, false, true, false);
    } else if (value == "Specialist") {
      updateUserRole(selectedUser.username, false, false, true);
    }

    allFetchedUsers = await getAllUsers();
    setAllUsers(allFetchedUsers);
  };

  //This is the modal for clicking edit button on task thing
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
  };

  let splitMembersId = [];

  const handleClick2 = async (e, project) => {
    let project2 = await getProjectItemByTitle(project.title);
    setClickedProject(project2);
    setCurrentClickedProject(project);

    setProjectTitle(project.title);
    setProjectDescription(project.description);
    setProjectDueDate(project.dueDate);
    setShow2(true);

    // const [isArchived, setIsArchived] = useState(false);
    allFetchedUsers = await getAllUsers();
    setAllSpecialist(allFetchedUsers.filter((user) => user.isSpecialist));
  };

  const handleArchived = async (project) => {
    project.isArchived = true;
    let result = await updateProjectItem(project);
    if (result) {
      let projects = await getAllProjectItems();
      setCurrentProjects(projects);
    } else {
      alert(`A project has not been archived`);
    }
  };

  useEffect(async () => {
    if (!checkToken()) {
      navigate("/Login");
    } else {
      allFetchedUsers = await getAllUsers();
      setAllUsers(allFetchedUsers);

      setTimeout(async () => {
        let currentFetchedProjects;
        if (userData.userItems.isSpecialist) {
          currentFetchedProjects = await getProjectItemsByAMemberId(
            userItems.id
          );
        } else if (userData.userItems.isProjectManager) {
          currentFetchedProjects = await getProjectItemsByUserId(userItems.id);
        } else if (userData.userItems.isAdmin) {
          currentFetchedProjects = await getAllProjectItems();
        }
        setCurrentProjects(currentFetchedProjects);
        setIsLoading(false);
      }, 3000);
    }
  }, []);

  //Function to show model when edit button is clicked

  const { viewIcon } = <FontAwesomeIcon icon={faMagnifyingGlass} />;
  return (
    <>
      <Container className="mt-5">
        <h4 className="headerTxt">Your Current Projects: </h4>
        {isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
        ) : (
          <Row xs={2} lg={4} className="g-3">
            {userData.userItems.isAdmin ||
            userData.userItems.isProjectManager ? (
              <NewProjectComponent />
            ) : null}
            {/* Map thru current projects here */}
            <Modal show={show2} onHide={handleClose2}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Project title:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Edit project title"
                      onChange={(e) => setProjectTitle(e.target.value)}
                      value={projectTitle}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="description"
                      placeholder="Edit description"
                      onChange={(e) => setProjectDescription(e.target.value)}
                      value={projectDescription}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Due Date:</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Edit due date"
                      onChange={(e) => setProjectDueDate(e.target.value)}
                      value={projectDueDate}
                    />
                  </Form.Group>
                  <Form.Label>Edit Specialist:</Form.Label>
                  <ListGroup as="ul">
                    {allSpecialist.map((user, idx) => {
                      // debugger
                      if (currentClickedProject.membersId.includes(user.id)) {
                        return (
                          <ListGroup.Item
                            active
                            action
                            as="li"
                            onClick={(e) => handleRemoveMember(e, user.id)}
                          >
                            {user.fullName}
                          </ListGroup.Item>
                        );
                      } else {
                        return (
                          <ListGroup.Item
                            action
                            as="li"
                            onClick={(e) => handleAddMember(e, user.id)}
                          >
                            {user.fullName}
                          </ListGroup.Item>
                        );
                      }
                    })}
                  </ListGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose2}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            {/* need function that fetches all current projects of that user, but if user is an admin will show all projects */}
            {currentProjects.map((project, idx) => {
              return (
                <>
                  {!project.isArchived ? (
                    <div>
                      <Card
                        border="danger"
                        style={{ width: "15rem", height: "15rem" }}
                        className="shadow"
                      >
                        <Card.Body>
                          <Card.Title className="d-flex justify-content-between">
                            {project.title}
                            <Button
                              className="editBtn"
                              onClick={(e) => handleClick2(e, project)}
                            >
                              {editIcon}
                            </Button>
                          </Card.Title>
                          <Card.Text>
                            <p className="projectCardTxt">
                              Due Date: <span>{project.dueDate}</span>
                            </p>
                            <p className="projectCardTxt">
                              {project.description}
                            </p>
                          </Card.Text>
                          {userData.userItems.isAdmin ||
                          userData.userItems.isProjectManager ? (
                            <Row>
                              <Col>
                                <Button
                                  className="editBtn"
                                  onClick={(e) => handleClick(e, project)}
                                >
                                  View
                                </Button>
                              </Col>
                              <Col>
                                <Button
                                  variant="info"
                                  onClick={() => handleArchived(project)}
                                >
                                  Archive
                                </Button>
                              </Col>
                            </Row>
                          ) : null}
                        </Card.Body>
                      </Card>
                    </div>
                  ) : null}
                </>
              );
            })}
          </Row>
        )}
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
                            <Col>{item.title}</Col>
                            <Col className=" d-flex justify-content-end">
                              <Button
                                className="editBtn"
                                // onClick={() => navigate("/taskDashboard")}
                                onClick={() => handleClick(item.title)}
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
      <div className="mb-5"></div>
    </>
  );
}
