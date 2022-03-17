import React, {useState} from 'react'
import {Container, Row, Col, Card, Button, Modal, Form, ListGroup} from 'react-bootstrap'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NewProjectComponent() {

    const plusIcon = <FontAwesomeIcon icon={faPlusCircle} />
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                <Form.Control type="email" placeholder="Enter project title" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>Description: </Form.Label>
                <Form.Control as="textarea" type="text" placeholder="Description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Project Deadline: </Form.Label>
                <Form.Control type="date" placeholder="duedate" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Add Specialists</Form.Label>
                {/* map thru all users.isSpecialist */}
                <Form.Select
                  aria-label="Default select example"
                  className="mt-2"
                // value={blogCategory}
                // onChange={({ target: { value } }) => setBlogCategory(value)}
                >
                  <option>Select a Specialist</option>
                  {}
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
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}
