import React, {useContext, useState, useEffect} from "react";
import { Container, Row, Col, Button, Card, ProgressBar, Modal, Form, ListGroup } from "react-bootstrap";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TaskComponent from '../Components/TaskComponent';
import ProjectContext from "../Context/ProjectContext";
import TaskContext from "../Context/TaskContext";
import UserContext from '../Context/UserContext';
import {AddTaskItem, getAllTaskItems, getAllUsers, getTaskItemsByProjectID} from "../Services/DataService";


export default function TaskDashboardPage() {

  let projectData = useContext(ProjectContext);
  console.log(projectData)
  let taskData = useContext(TaskContext);
  let { allTasks, setAllTasks } = useContext(TaskContext)
  let { userId, setUserId, username, setUsername, isAdmin, setIsAdmin, isProjectManager, setIsProjectManager, isSpecialist, setIsSpecialist, fullName, setFullName, userItems, setUserItems } = useContext(UserContext);
  let userData = useContext(UserContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
    console.log(taskMembersId);
    stringOfMemberIds = taskMembersId.toString();
    stringOfMemberUsernames = taskMembersUsernames.toString();
    e.target.classList.toggle('active');
  }

  let newTask;

  const handleSubmit = async () => {

    // setProjectMembersUsername(e);
    // console.log(projectMembersUsername);

    newTask = { 
      Id: 0,
      ProjectId: projectData.clickedProject[0].id,
      Title: taskTitle,
      Description: taskDescription,
      DateCreated: new Date(),
      DueDate: taskDueDate,
      Status: "To Do",
      // MembersId: stringOfMemberIds,
      Assignees: stringOfMemberUsernames,
      IsDeleted: false,
    }

    let result = await AddTaskItem(newTask);
    let allTasks = await getTaskItemsByProjectID(projectData.clickedProject[0].id);
    if(result){
      setAllTasks(allTasks)
    }
    handleClose();
  }

  useEffect(async () => {
    let allFetchedUsers = await getAllUsers();
    setAllSpecialist(allFetchedUsers.filter(user => user.isSpecialist))
    // setAllSpecialist(allFetchedUsers);
  }, [])

  const handleClick = () => {
    
  }

  const plusIcon = <FontAwesomeIcon icon={faPlusCircle} />

  return (
    <div>
      <Container className="mt-3 mb-5">
        <Row className="mb-3 text-center">
          <h3>{projectData.clickedProject[0].title}</h3>
          <h5>Due Date:{projectData.clickedProject[0].dueDate}</h5>
        </Row>
        <Row className="justify-content-center">
          <Col xs={1} className="pb-3">
            <h5>Status: </h5>
          </Col>
          <Col>
            <ProgressBar animated variant="success" now={80}></ProgressBar>
          </Col>
        </Row>
        <Row className="text-center taskContainer">
          <Col className="toDoContainer">
            <h3 className="headerTxt mt-2">To-Do</h3>
            {
          userData.userItems.isAdmin || userData.userItems.isProjectManager ? (
            <div>
            <Card className="mb-2 pointer" onClick={handleShow} >
              <Card.Body>{plusIcon}</Card.Body>
            </Card>
            </div>
          ) : null 
        }
        {/* map thru all tasks */}
        {/* separate into 3 arrays, map into  */}
            {/* <TaskComponent/> */}
            {
              taskData.allTasks.map((task) => {
                console.log(task)
              })
            }
            { taskData.allTasks.filter((task) => task.status == "To Do").map(todoTasks => {
              console.log(todoTasks)
              return (
                <TaskComponent task={todoTasks}/>
              )
            })}

          </Col>
          <Col className="inProgressContainer">
            <h3 className="headerTxt mt-2">In Progress</h3>
            { taskData.allTasks.filter((task) => task.status == "In Progress").map(inProgressTasks => {
              
              return (
                <TaskComponent task={inProgressTasks}/>
              )
            })}
          </Col>
          <Col className="completedContainer">
            <h3 className="headerTxt mt-2">Completed</h3>
            { taskData.allTasks.filter((task) => task.status == "Completed").map(completedTasks => {
              return (
                <TaskComponent task={completedTasks}/>
              )
            })}
          </Col>
        </Row>
      </Container>
      
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Task Title: </Form.Label>
                <Form.Control type="email" placeholder="Enter task title" onChange={({target:{value}}) => setTaskTitle(value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Description: </Form.Label>
                <Form.Control as="textarea" type="text" placeholder="Description" onChange={({target:{value}}) => setTaskDescription(value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Task Deadline: </Form.Label>
                <Form.Control type="date" placeholder="duedate" onChange={({target:{value}}) => setTaskDueDate(value)}/>
              </Form.Group>
            <Form.Label>Assign Specialist:</Form.Label>
            <ListGroup as="ul">
              {
                allSpecialist.map((user, idx) => {
                  return (
                    <ListGroup.Item key={user} action as="li" onClick={(e) => addUserToArrayId(e, user.id, user.username)}>
                      {user.fullName}
                    </ListGroup.Item>
                  )
                }) 
              }
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



    </div>
  );
}
