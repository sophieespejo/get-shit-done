import React, {useContext} from "react";
import { Container, Row, Col, Button, Card, ProgressBar } from "react-bootstrap";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TaskComponent from '../Components/TaskComponent';
import ProjectContext from "../Context/ProjectContext";
import TaskContext from "../Context/TaskContext";
import UserContext from '../Context/UserContext';


export default function TaskDashboardPage() {

  let projectData = useContext(ProjectContext);
  console.log(projectData)
  let taskData = useContext(TaskContext);
  let { userId, setUserId, username, setUsername, isAdmin, setIsAdmin, isProjectManager, setIsProjectManager, isSpecialist, setIsSpecialist, fullName, setFullName, userItems, setUserItems } = useContext(UserContext);
  let userData = useContext(UserContext);

  const handleClick = () => {
    console.log("hi")
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
            <Card className="mb-2 pointer"onClick={handleClick} >
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
            { taskData.allTasks.filter((task) => task.status == "To do").map(todoTasks => {
              
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
    </div>
  );
}
