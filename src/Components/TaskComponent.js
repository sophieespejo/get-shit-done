import React, {useState} from 'react'
import {Card, Button, Modal} from 'react-bootstrap'; 

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
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
