import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Modal,
  Form,
  FloatingLabel,
  Col,
  Row,
  ListGroup,
  ModalBody,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  faMagnifyingGlass,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskContext from "../Context/TaskContext";
import UserContext from "../Context/UserContext";
import {
  updateTaskItem,
  getTaskItemsByProjectID,
  getAllUsers,
  getTaskItemsById,
  deleteTaskItem,
  getProjectItemById
} from "../Services/DataService";

export default function TaskComponent({ task }) {
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

  let taskData = useContext(TaskContext);
  let userData = useContext(UserContext);
  let { allTasks, setAllTasks, setStatusBar } = useContext(TaskContext)
  const [allSpecialist, setAllSpecialist] = useState([]);
  const [projectMembers, setAllProjectMembers] = useState([]);

  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskDueDate, setTaskDueDate] = useState(task.dueDate);
  const [taskPriority, setTaskPriority] = useState(task.priority);
  const [taskStatus, setTaskStatus] = useState(task.status);
  const [taskId, setTaskId] = useState(task.id);
  const [taskAssignees, setTaskAssignees] = useState(task.assignees);
  const [projectId, setProjectId] = useState(task.projectId);
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    console.log(task);
    task.status = taskStatus;
    let result = await updateTaskItem(task);
    let allTasks = await getTaskItemsByProjectID(task.projectId);
    let numOfTotalTasks = 0;
    let numOfTasksToDo = 0;
    numOfTotalTasks = allTasks.filter(task => !task.isDeleted).length;
    numOfTasksToDo = allTasks.filter(task => task.status == "Completed").length;
    let numOfCompleted = (numOfTasksToDo / numOfTotalTasks) * 100;
    setStatusBar(numOfCompleted);
    setAllTasks(allTasks);
  };

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
    e.target.classList.toggle("active");
  };


  // const handleAddMember = (e, id) => {
  //   e.target.classList.toggle("active");
  //   // Add member to project

  //   let splitArr = [];
  //   splitArr = currentClickedProject.membersId.split(",");
  //   console.log(splitArr);
  //   let updatedMembers = splitArr.push(id);
  //   console.log(updatedMembers)

  //   let updatedProject = {
  //     Id: currentClickedProject.id,
  //     UserId: currentClickedProject.userId,
  //     Title: projectTitle,
  //     Description: projectDescription,
  //     DateCreated: currentClickedProject.dateCreated,
  //     DueDate: projectDueDate,
  //     Status: "test",
  //     MembersId: updatedMembers.toString(),
  //     MembersUsername: "test",
  //     IsDeleted: currentClickedProject.isDeleted,
  //   }
  //   updateProjectItem(updatedProject);
  //   handleClose();
  // }

  let listOfAssignees = [];
  const [projectMembersId, setProjectMembersId] = useState([]);
  let splitProjectMembersId = [];

  const handleAddAssignee = async (e, username) => {

    // Get projectId from by
    let currentProject = await getProjectItemById(projectId);
    setProjectMembersId(currentProject.membersId);
    // projectMembersId.split(','); 
    console.log(projectMembersId);

    e.target.classList.toggle("active");
    console.log(username);

    if (taskAssignees == null) {
      listOfAssignees.push(username);
    } else {
      listOfAssignees.push(taskAssignees);
      listOfAssignees.push(username);
      // listOfAssignees.join(',');
    }
  }

  const handleRemoveAssignees = async (e, username) => {

    // Get projectId from by
    let currentProject = await getProjectItemById(projectId);
    setProjectMembersId(currentProject.membersId);
    // projectMembersId.split(','); 
    console.log(projectMembersId);

    e.target.classList.toggle("active");
    console.log(username);

    listOfAssignees.push(taskAssignees);
    listOfAssignees.splice(1, username);
      // listOfAssignees.join(',');
    }




  const handleSubmit = async () => {
    // let oldTask = await getTaskItemsById(task.id);
    // let result = await deleteTaskItem(oldTask)
    
    let updatedTask = {
      Id: task.id,
      ProjectId: task.projectId,
      Title: task.title,
      Description: task.description,
      DateCreated: task.dateCreated,
      DueDate: task.dueDate,
      Priority: task.priority,
      Assignees: listOfAssignees.join(','),
      Status: task.status,
      IsDeleted: task.isDeleted,
    }
    console.log(updatedTask);
    updateTaskItem(updatedTask);
    handleClose();
  };
  
  useEffect(async () => {
    let allFetchedUsers = await getAllUsers();
    setAllSpecialist(allFetchedUsers.filter((user) => user.isSpecialist));
    // setAllSpecialist(allFetchedUsers);
  }, []);

  const { viewIcon } = <FontAwesomeIcon icon={faMagnifyingGlass} />;

  return (
    <>
      <Card style={{ width: "22rem" }} className="mt-2 mb-2 taskCard">
        <Card.Body>
          <Row className="d-flex">
            <Col>
              <Card.Title className="taskTitleTxt text-start">{task.title}</Card.Title>
            </Col>
            <Col className="d-flex justify-content-end taskTxt">
              {userData.userItems.isAdmin ||
              userData.userItems.isProjectManager ? (
              <Button variant="success" onClick={handleShow}>
                Edit Task
              </Button>
              ) : <Button variant="success" onClick={handleShow}>
              View Task
            </Button>}
            </Col>
          </Row>
          <Card.Text className="mb-0">
            <p className="taskTxt text-start">
              Description: {task.description}
            </p>
            <p className="taskTxt text-start">Due Date: {task.dueDate}</p>
            <p className="taskTxt text-start">Assignee: {task.assignees}</p>
          </Card.Text>
          <Row className="mt-0">
            <Col className="taskTxt">
              <Form.Group>
                <Form.Select
                  aria-label="Default select example"
                  className=""
                  // value={blogCategory}
                  onChange={({ target: { value } }) => setTaskStatus(value)}
                  value={taskStatus}
                >
                  <option>Status</option>
                  <option value="To Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Button className="taskTxt" variant="info" onClick={handleClick}>
                Update Status
              </Button>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col></Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal size="lg" show={show} onHide={handleClose}>
        {/* check if user is specialist */}
        {/* return ( {user.isSpecialist ?  (
          <Modal.Header closeButton>
          <Modal.Title>View Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        ): }) */}
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="description"
                placeholder="Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Form.Label className="mt-3">Due Date: </Form.Label>
                      <Form.Control
                        type="date"
                        value={taskDueDate}
                        onChange={(e) => setTaskDueDate(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col>
                <Form.Label>Priority:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="mt-2"
                    value={taskPriority}
                    onChange={({ target: { value } }) => setTaskPriority(value)}
                  >
                    <option>Pick a Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="formGroupPassword">
              <Form.Label>Edit Assignee</Form.Label>
              {/* have this option only available for admin, subadmin, and PM? */}
              <Row>
                <Form.Label>Assign Specialist:</Form.Label>
                <ListGroup as="ul">
                  {allSpecialist.map((user, idx) => {
                    if (taskAssignees.includes(user.username)) {
                      return (
                        <ListGroup.Item
                          key={user}
                          active
                          action
                          as="li"
                          onClick={(e) =>
                            handleAddAssignee(e, user.username)
                          }
                        >
                          {user.fullName}
                        </ListGroup.Item>
                      );
                    } else {
                      return (
                        <ListGroup.Item
                          action
                          as="li"
                          onClick={(e) =>
                            handleRemoveAssignees(e, user.username)
                          }
                        >
                          {user.fullName}
                        </ListGroup.Item>
                      );
                    }
                  })}
                </ListGroup>
                {/* <Col>
                <ListGroup as="ul">
                  {
                    allSpecialist.map((user, idx) => {
                      // debugger
                        if (task.asignees.includes(user.username)) {
                          return (
                            <ListGroup.Item active action as="li" onClick={(e) => handleRemoveMember(e, user.id)}>
                              {user.fullName}
                            </ListGroup.Item>
                          )
                        } else {
                          return (
                            <ListGroup.Item action as="li" onClick={(e) => handleAddMember(e, user.id)}>
                              {user.fullName}
                            </ListGroup.Item>
                          )
                      }
                    })
                  }
                </ListGroup>
                </Col> */}
                {/* <Col>
                  <Form.Select
                    aria-label="Default select example"
                    className="mt-2"
                    // value={blogCategory}
                    // onChange={({ target: { value } }) => setBlogCategory(value)}
                  >
                    <option>Pick a Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Subadmin">Subadmin</option>
                    <option value="PM">Project Manager</option>
                    <option value="Specialist">Specialist</option>
                  </Form.Select>
                </Col> */}
                {/* <Col xs={2} className="mt-2">
                  <Button>Add</Button>
                </Col> */}
              </Row>
            </Form.Group>
          </Form>
          <Row>
            {/* map thru roles and add to list group, if none then null? */}
            {/* <ListGroup variant="flush">
            <ListGroup.Item>Admin: Cras justo odio</ListGroup.Item>
            <ListGroup.Item>SubAdmin: Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Project Manager: Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Specialist: Porta ac consectetur ac</ListGroup.Item>
          </ListGroup> */}
          </Row>
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
    </>
  );
}
