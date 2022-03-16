import React from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import { faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'


export default function ProjectCardComponent() {

    let navigate = useNavigate();
    
    const editIcon = <FontAwesomeIcon icon={faEdit} />


  return (
    <div>
        <Card border="danger" style={{ width: '15rem', height: '15rem'}} className="shadow">
            <Card.Body >
                <Card.Title className="d-flex justify-content-between">Project Name <Button className="editBtn">{editIcon}</Button></Card.Title>
                <Card.Text>
                <p>Due Date: <span>whatever</span></p>
                <p>Priority: <span>whateverr</span></p>
                <p>Status: <span>whateverrr</span></p>
                </Card.Text>
                <Button className="editBtn" onClick={() => navigate("/taskDashboard")}>View Project</Button>
            </Card.Body>
        </Card>
    </div>
  )
}
