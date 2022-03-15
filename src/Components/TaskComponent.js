import React, {useState} from 'react'
import {Card, Button, Modal, Form} from 'react-bootstrap'; 

export default function TaskComponent() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>TaskComponent</div>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>Task Name</Card.Title>
          <Card.Text>
            <p>Task Description</p>
            <p>Due Date:</p>
            <p>Assignee: </p>
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>View/Edit Task</Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
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
                    type="description"
                    placeholder="Description"
                    // value={blogDescription}
                    // onChange={(e) => setBlogDescription(e.target.value)}
                  />
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
    </>

  )
}
