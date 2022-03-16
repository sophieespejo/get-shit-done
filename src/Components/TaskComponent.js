import React, { useState } from "react";
import { Card, Button, Modal, Form, FloatingLabel, Col, Row, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TaskComponent() {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>Task Name</Card.Title>
          <Card.Text>
            <p>Task Description</p>
            <p>Due Date:</p>
            <p>Assignee: </p>
          </Card.Text>
          <Row>
            <Col>
              <Form.Group>
                <Form.Select
                    aria-label="Default select example"
                    className=""
                    // value={blogCategory}
                    // onChange={({ target: { value } }) => setBlogCategory(value)}
                  >
                    <option>Update Status</option>
                    <option value="ToDo">To-Do</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Done">Done</option>
                  </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Button variant="primary" onClick={handleShow}>
                View/Edit Task
              </Button>
            </Col>
          </Row>
          
        </Card.Body>
      </Card>

      <Modal size="lg" show={show} onHide={handleClose}>
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
                // value={blogTitle}
                // onChange={(e) => setBlogTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="description"
                placeholder="Description"
                // value={blogDescription}
                // onChange={(e) => setBlogDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Row>
                <Col>
                  <Row>
                    <Col>
                  <Form.Label className="mt-3">Due Date: </Form.Label>
                    </Col>
                    <Col>
                  <input className="mt-3" type="date"></input>
                    </Col>
                  </Row>
                </Col>
                <Col>
              <Form.Select
                    aria-label="Default select example"
                    className="mt-2"
                    // value={blogCategory}
                    // onChange={({ target: { value } }) => setBlogCategory(value)}
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
              <Form.Label>Roles Assigned</Form.Label>
              {/* have this option only available for admin, subadmin, and PM? */}
              <Row>
                <Col>
                  <FloatingLabel controlId="floatingRole" label="Name">
                    <Form.Control type="password" placeholder="Assignee" />
                  </FloatingLabel>
                </Col>
                <Col>
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
                </Col>
                <Col xs={2} className="mt-2">
                  <Button>Add</Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
          <Row>
            {/* map thru roles and add to list group, if none then null? */}
          <ListGroup variant="flush">
            <ListGroup.Item>Admin: Cras justo odio</ListGroup.Item>
            <ListGroup.Item>SubAdmin: Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Project Manager: Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Specialist: Porta ac consectetur ac</ListGroup.Item>
          </ListGroup>
          </Row>
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
    </>
  );
}
