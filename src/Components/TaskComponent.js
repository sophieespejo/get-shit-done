import React from 'react'
import {Card, Button} from 'react-bootstrap'; 

export default function TaskComponent() {
  return (
    <>
      <div>TaskComponent</div>
      <Card style={{ width: '22rem' }}>
        <Card.Body>
          <Card.Title>Task Name</Card.Title>
          <Card.Text>
            <p>Task Description</p>
            <p>Due Date:</p>
            <p>Assignee: </p>
          </Card.Text>
          <Button variant="primary">View/Edit Task</Button>
        </Card.Body>
      </Card>
    </>

  )
}
