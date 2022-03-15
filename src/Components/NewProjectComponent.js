import React from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NewProjectComponent() {

    const plusIcon = <FontAwesomeIcon icon={faPlusCircle} />

  return (
    <div>
         <Card style={{ width: '15rem', height: '15rem'}} className="shadow">
            <Card.Body className="d-flex justify-content-center">
                <Button className="addProjectBtn">
                    {plusIcon}
                </Button>
            </Card.Body>
        </Card>
    </div>
  )
}
