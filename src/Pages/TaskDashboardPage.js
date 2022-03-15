import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";


export default function TaskDashboardPage() {
  return (
    <div>
      <Container className="mt-3">
        <Row className="mb-3 text-center">
          <h1>Name of the project</h1>
          <h3>Due Date:</h3>
          <h3>Status: </h3>
        </Row>
        <Row className="text-center taskContainer">
          <Col className="toDoContainer">
          <h3 className="headerTxt mt-2">To-Do</h3>
          </Col>
          <Col className="inProgressContainer">
          <h3 className="headerTxt mt-2">In Progress</h3>
          </Col>
          <Col className="completedContainer">
          <h3 className="headerTxt mt-2">Completed</h3>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
