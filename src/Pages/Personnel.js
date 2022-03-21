import React, { useState, useEffect, useContext } from "react";
import {Container,Row,Col,Accordion,ListGroup,Button,Modal,Form,} from "react-bootstrap";
import { faMagnifyingGlass, faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { checkToken, getAllUsers, updateUser, getProjectItemsByUserId, getProjectItemsByAMemberUsername, getAllProjectItems, getProjectItemByTitle, updateUserRole, getTaskItemsByProjectID, createAccount } from "../Services/DataService";
import UserContext from '../Context/UserContext';
import ProjectContext from "../Context/ProjectContext";
import TaskContext from "../Context/TaskContext";

function Personnel() {

    const { viewIcon } = <FontAwesomeIcon icon={faMagnifyingGlass} />;
    let userData = useContext(UserContext);
    let clickedProject1 = useContext(ProjectContext);
  
    const addUserIcon = <FontAwesomeIcon icon={faUserPlus} />
    const editIcon = <FontAwesomeIcon icon={faEdit} />
    let navigate = useNavigate();
    let { userId, setUserId, username, setUsername, isAdmin, setIsAdmin, isProjectManager, setIsProjectManager, isSpecialist, setIsSpecialist, fullName, setFullName, userItems, setUserItems } = useContext(UserContext);
    let { clickedProject, setClickedProject} = useContext(ProjectContext)
    let { allTasks, setAllTasks} = useContext(TaskContext);
  
    const handleClick = async (e, project) => {
      let project1 = await getProjectItemByTitle(project.title);
      setClickedProject(project1);
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
    const handleShow1 = () => setShow1(true);

    const [fullname, setFullname] = useState("");
    const [Username, setUserName] = useState("");
    const [Password, setPassword] = useState("");
  
    let allFetchedUsers;
    const handleClose1 = async () => {
      let userData = {
        Id: 0,
        Username: Username,
        FullName: fullname,
        Password: Password,
      };
      setShow1(false)
      let result = await createAccount(userData);
      allFetchedUsers = await getAllUsers();
      setAllUsers([...allFetchedUsers]);
    };

    const [currentProjects, setCurrentProjects] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    let currentFetchedProjects;
  
    const setRole = async (value) => {
      let result1;

      if (value == 'Admin') {
         result1 = await updateUserRole(selectedUser.username, true, false, false);
      } else if (value == 'PM') {
         result1 = await updateUserRole(selectedUser.username, false, true, false);
      } else if (value == 'Specialist') {
         result1 = await updateUserRole(selectedUser.username, false, false, true);
      }
      if (result1){
        allFetchedUsers = await getAllUsers();
      }else{
        alert("error")
      }
      setAllUsers([...allFetchedUsers]);
    }
  
    useEffect( async() => {
      allFetchedUsers = await getAllUsers();
      setAllUsers([...allFetchedUsers]);
        
    }, [])
  
  
    //Delete a user
    const handleDelete = async (user) => {
      user.IsDeleted = true;
      let result = await updateUser(user);
      if(result){
        let allUpdatedUsers = await getAllUsers();
        setAllUsers(allUpdatedUsers);
        }else{
        alert(`User not Deleted`);
        }
    }
  
  return (
      <>
  {/* see all users and roles */}
  <Container>
    <Row className="mt-5 mb-5">
      <Col className="mb-2">
        <h3>All Staff</h3>
      </Col>
      {/* only have this button show up if user isAdmin */}
      <Col className="d-flex justify-content-end mb-2">
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
                            <Button variant="danger" className="" onClick={() => handleDelete(user)}>
                              Delete user
                            </Button>
                            <Button
                              variant="info"
                              className=""
                              onClick={() => {
                                handleShow();
                                setSelectedUser(user);
                              }}
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
                            <Button variant="danger" className="" onClick={() => handleDelete(user)}>
                              Delete user
                            </Button>
                            <Button
                              variant="info"
                              className=""
                              onClick={() => {
                                handleShow();
                                setSelectedUser(user);
                              }}
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
                            <Button variant="danger" className="" onClick={() => handleDelete(user)}>
                              Delete user
                            </Button>
                            <Button
                              variant="info"
                              className=""
                              onClick={() => {
                                handleShow();
                                setSelectedUser(user);
                              }}
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
                            <Button variant="danger" className="" onClick={() => handleDelete(user)}>
                              Delete user
                            </Button>
                            <Button
                              variant="info"
                              className=""
                              onClick={() => {
                                handleShow();
                                setSelectedUser(user);
                              }}
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
        <h3>{selectedUser.fullName}</h3>
        <Form>
          <Form.Group>
            <Form.Label>Update Role</Form.Label>
            <Form.Select
              aria-label="Default select example"
              className="mt-2"
            // value={blogCategory}
            onChange={({ target: { value } }) => setRole(value)}
            // onChange={(e) => console.log(e)}
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
            <Form.Control type="email" placeholder="Enter full name" onChange={({ target: { value } }) => setFullname(value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" onChange={({ target: { value } }) => setUserName(value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={({ target: { value } }) => setPassword(value)}/>
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
  )
}

export default Personnel