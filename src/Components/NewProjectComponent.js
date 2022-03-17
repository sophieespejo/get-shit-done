import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Card, Button, Modal, Form, ListGroup} from 'react-bootstrap'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAllUsers, updateProjectItem } from '../Services/DataService';

export default function NewProjectComponent() {

    const plusIcon = <FontAwesomeIcon icon={faPlusCircle} />
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [allSpecialist, setAllSpecialist] = useState([]);

    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectDueDate, setProjectDueDate] = useState("");
    const [projectMembersId, setProjectMembersId] = useState("");
    // const [projectMembersUsername, setProjectMembersUsername] = useState("");

    let projectMembersUsername = [];

    const addUserToArray = (username) => {
      projectMembersUsername.push(username);
      console.log(projectMembersUsername);
    }

    let updatedProject;

    const handleSubmit = async () => {

      // setProjectMembersUsername(e);
      // console.log(projectMembersUsername);

      updatedProject = {
        Id: 0,
        // UserId: UserId,
        Title: projectTitle,
        Description: projectDescription,
        DateCreated: new Date(),
        DueDate: projectDueDate,
        Status: "",
        MembersId: projectMembersId,
        MembersUsername: projectMembersUsername,
        IsDeleted: false,
        IsArchived: false
      }
    }

    useEffect(async () => {
      let allFetchedUsers = await getAllUsers();
      // console.log(allFetchedUsers)

      setAllSpecialist(allFetchedUsers.filter(user => user.isSpecialist))
      // setAllSpecialist(allFetchedUsers);
    }, [])



  return (
    <div>
         <Card style={{ width: '15rem', height: '15rem'}} className="shadow">
            <Card.Body className="d-flex justify-content-center">
                <Button className="addProjectBtn" onClick={handleShow}>
                    {plusIcon}
                </Button>
            </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Project Title: </Form.Label>
                <Form.Control type="email" placeholder="Enter project title" onChange={({target:{value}}) => setProjectTitle(value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Description: </Form.Label>
                <Form.Control as="textarea" type="text" placeholder="Description" onChange={({target:{value}}) => setProjectDescription(value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Project Deadline: </Form.Label>
                <Form.Control type="date" placeholder="duedate" onChange={({target:{value}}) => setProjectDueDate(value)}/>
              </Form.Group>
            <Form.Label>Add Specialists:</Form.Label>
            <ListGroup as="ul">
              {
                allSpecialist.map((user, idx) => {
                  return (
                    <ListGroup.Item action as="li" onClick={() => addUserToArray(user.username)}>
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
  )
}
