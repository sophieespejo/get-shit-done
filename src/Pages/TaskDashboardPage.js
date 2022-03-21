import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ProgressBar,
  Modal,
  Form,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskComponent from "../Components/TaskComponent";
import ProjectContext from "../Context/ProjectContext";
import TaskContext from "../Context/TaskContext";
import UserContext from "../Context/UserContext";
import {
  AddTaskItem,
  getAllTaskItems,
  getAllUsers,
  getTaskItemsByProjectID,
} from "../Services/DataService";

export default function TaskDashboardPage() {
    let navigate = useNavigate();
  let projectData = useContext(ProjectContext);
  let taskData = useContext(TaskContext);
  let { allTasks, setAllTasks, statusBar, setStatusBar } = useContext(TaskContext);
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
  let userData = useContext(UserContext);

  //for the add a new task modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for the view project modal
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);


  const [taskSpecialist, setTaskSpecialist] = useState([]);
  let uniqueSet = [];
  const handleShow1 = () => {
    let taskArr = taskData.allTasks.map((task) => task.assignees);
    let temp = [];
    temp = taskArr.toString().split(",");
    uniqueSet = [... new Set(temp)];
    setTaskSpecialist(uniqueSet);
      setShow1(true);
  }

  const [allSpecialist, setAllSpecialist] = useState([]);

  // for creating a new task
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  

  let stringOfMemberIds = "";
  let stringOfMemberUsernames = "";
  let taskMembersId = [];
  let taskMembersUsernames = [];
  const addUserToArrayId = (e, id, username) => {
    taskMembersId.push(id);
    taskMembersUsernames.push(username);
    stringOfMemberIds = taskMembersId.toString();
    stringOfMemberUsernames = taskMembersUsernames.toString();
    e.target.classList.toggle("active");
  };

  let newTask;
  let numOfCompleted = 0;
  const handleSubmit = async () => {

    newTask = {
      Id: 0,
      ProjectId: projectData.clickedProject[0].id,
      Title: taskTitle,
      Description: taskDescription,
      DateCreated: new Date(),
      DueDate: taskDueDate,
      Status: "To Do",
      Assignees: stringOfMemberUsernames,
      IsDeleted: false,
    };

    let result = await AddTaskItem(newTask);
    let allTasks = await getTaskItemsByProjectID(projectData.clickedProject[0].id);

    if(result){
      setAllTasks(allTasks)
    }
    handleClose();
  };

  useEffect(async () => {
    let allFetchedUsers = await getAllUsers();
    setAllSpecialist(allFetchedUsers.filter((user) => user.isSpecialist));
    // setAllSpecialist(allFetchedUsers);
    let allTasks = await getTaskItemsByProjectID(projectData.clickedProject[0].id);
    let numOfTotalTasks = 0;
    let numOfTasksToDo = 0;
    let filteredTasks = [];
    numOfTotalTasks = allTasks.filter(task => !task.isDeleted).length;
    filteredTasks = allTasks.filter(task => task.status == "Completed");
    numOfTasksToDo = filteredTasks.length;
    numOfCompleted = (numOfTasksToDo / numOfTotalTasks) * 100;
    setStatusBar(numOfCompleted);
  }, [])

  const plusIcon = <FontAwesomeIcon icon={faPlusCircle} />;

  return (
    <div>
      <Container className="mt-3 mb-5">
        <Row className="justify-content-center text-center">
          <Col xs={3}>
            <h3>{projectData.clickedProject[0].title}</h3>
            <h5>Due Date:{projectData.clickedProject[0].dueDate}</h5>
          </Col>
        </Row>
        <Row className="justify-content-center mb-2">
          <Col xs={2} className=" d-flex justify-content-center">
            <Button className="editBtn" onClick={handleShow1}>
              View Project
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={1} className="pb-3">
            <h5>Status: </h5>
          </Col>
          <Col>
            <ProgressBar animated variant="success" now={statusBar}></ProgressBar>
          </Col>
        </Row>
        <Row className="text-center taskContainer">
          <Col className="toDoContainer">
            <h3 className="headerTxt mt-2">To-Do</h3>
            {userData.userItems.isAdmin ||
            userData.userItems.isProjectManager ? (
              <div>
                <Card className="mb-2 pointer" onClick={handleShow}>
                  <Card.Body>{plusIcon}</Card.Body>
                </Card>
              </div>
            ) : null}
            {/* map thru all tasks */}
            {/* separate into 3 arrays, map into  */}
            {taskData.allTasks.map((task) => {
              console.log(task);
            })}
            {taskData.allTasks
              .filter((task) => task.status == "To Do")
              .map((todoTasks) => {
                console.log(todoTasks);
                return <TaskComponent task={todoTasks} />;
              })}
          </Col>
          <Col className="inProgressContainer">
            <h3 className="headerTxt mt-2">In Progress</h3>
            {taskData.allTasks
              .filter((task) => task.status == "In Progress")
              .map((inProgressTasks) => {
                return <TaskComponent task={inProgressTasks} />;
              })}
          </Col>
          <Col className="completedContainer">
            <h3 className="headerTxt mt-2">Completed</h3>
            {taskData.allTasks
              .filter((task) => task.status == "Completed")
              .map((completedTasks) => {
                return <TaskComponent task={completedTasks} />;
              })}
          </Col>
        </Row>
      </Container>

      {/* modal for adding a new task */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task Title: </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter task title"
                onChange={({ target: { value } }) => setTaskTitle(value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Description: </Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Description"
                onChange={({ target: { value } }) => setTaskDescription(value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Task Deadline: </Form.Label>
              <Form.Control
                type="date"
                placeholder="duedate"
                onChange={({ target: { value } }) => setTaskDueDate(value)}
              />
            </Form.Group>
            <Form.Label>Assign Specialist:</Form.Label>
            <ListGroup as="ul">
              {allSpecialist.map((user, idx) => {
                return (
                  <ListGroup.Item
                    key={user}
                    action
                    as="li"
                    onClick={(e) => addUserToArrayId(e, user.id, user.username)}
                  >
                    {user.fullName}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for viewing project */}
      <Modal show={show1} onHide={handleClose1}>
      <Modal.Header closeButton>
          <Modal.Title>{projectData.clickedProject[0].title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            Description: {projectData.clickedProject[0].description}
          </Row>
          <Row>
            Due Date: {projectData.clickedProject[0].dueDate}
          </Row>
          <Row>
            Specialists assigned to project:
          </Row>
              {
                taskSpecialist.map((assignee) => {
                  return (
                    <Row>{assignee}</Row>
                  )
                })
              }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          {userData.userItems.isAdmin ||
            userData.userItems.isProjectManager ? (
              <Button variant="primary" onClick={() => navigate("/projectDashboard")}>
                Edit Project
              </Button>
            ) : null}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
