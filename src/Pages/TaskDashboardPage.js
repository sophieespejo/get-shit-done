import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TaskComponent from '../Components/TaskComponent';


export default function TaskDashboardPage() {

  const plusIcon = <FontAwesomeIcon icon={faPlusCircle} />

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
            <Card className="mb-2">
              <Card.Body>{plusIcon}</Card.Body>
            </Card>
          <TaskComponent />
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
  );
}
