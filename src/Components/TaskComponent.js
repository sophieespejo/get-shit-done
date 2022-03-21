import React, { useState, useContext, useEffect } from "react";
import { Card, Button, Container, Modal, Form, FloatingLabel, Col, Row, ListGroup, ModalBody } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskContext from "../Context/TaskContext";
import { updateTaskItem, getTaskItemsByProjectID, getAllUsers } from "../Services/DataService";

export default function TaskComponent({task}) {
  
  let taskData = useContext(TaskContext);
  let { allTasks, setAllTasks } = useContext(TaskContext);
  const [allSpecialist, setAllSpecialist] = useState([]);


  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskDueDate, setTaskDueDate] = useState(task.dueDate);
  const [taskPriority, setTaskPriority] = useState(task.priority);
  const [taskStatus, setTaskStatus] = useState(task.status);



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    console.log(task)
    task.status = taskStatus;
    let result = await updateTaskItem(task);
    let allTasks = await getTaskItemsByProjectID(task.projectId);
    setAllTasks(allTasks);
  }
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

  const handleSubmit = () => {
    
  }
  useEffect(async () => {
    let allFetchedUsers = await getAllUsers();
    setAllSpecialist(allFetchedUsers.filter(user => user.isSpecialist))
    // setAllSpecialist(allFetchedUsers);
  }, [])


  const { viewIcon } = <FontAwesomeIcon icon={faMagnifyingGlass} />;

  return (
    <>

        <Card style={{ width: "100%" }} className="mt-2 mb-2">
          <Card.Body>
            <Card.Title>
              {task.title}</Card.Title>
            <Card.Text>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Assignee: {task.assignees}</p>
            </Card.Text>
            <Row>
              <Col className="">
                <Form.Group>
                  <Form.Select
                      aria-label="Default select example"
                      className=""
                      // value={blogCategory}
                      onChange={({ target: { value } }) => setTaskStatus(value)}
                    >
                      <option>Status</option>
                      <option value="To Do">To-Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </Form.Select>
                </Form.Group>
              </Col>
              <Col>
              <Button variant="info" onClick={handleClick}>Update Status</Button>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <Button variant="success" onClick={handleShow}>
                  View/Edit Task
                </Button>
              </Col>
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
                  >
                  </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col>
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
              {
                allSpecialist.map((user, idx) => {
                  if(user.username.includes(task.assignees)) {
                    return (
                    <ListGroup.Item key={user} active action as="li" onClick={(e) => addUserToArrayId(e, user.id, user.username)}>
                      {user.fullName}
                    </ListGroup.Item>
                    )
                  } else {
                    return (
                      <ListGroup.Item action as="li" onClick={(e) => addUserToArrayId(e, user.id, user.username)}>
                      {user.fullName}
                    </ListGroup.Item>
                    )

                  }
                }) 
              }
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
