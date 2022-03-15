import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";


export default function TaskDashboardPage() {
  return (
    <div>
      <Container className="mt-3">
        <Row className="mb-3 text-center">
          <h1>Name of the project</h1>
        </Row>
        <Row className="text-center taskContainer">
          <Col className="toDoContainer">
          <h3 >To-Do</h3>
          </Col>
          <Col className="inProgressContainer">
          <h3>In Progress</h3>
          </Col>
          <Col className="completedContainer">
          <h3>Completed</h3>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
