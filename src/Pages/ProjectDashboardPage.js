import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import ProjectCardComponent from '../Components/ProjectCardComponent';
import NewProjectComponent from '../Components/NewProjectComponent';

export default function ProjectDashboardPage() {
  return (
    <>
        <Container className="mt-5">
            <h4 className="headerTxt">Your Current Projects:</h4>
            <Row xs={4} lg={4} className="g-3">
                {Array.from({ length: 7 }).map((_, idx) => (
                    < ProjectCardComponent /> ))}
                    < NewProjectComponent />
            </Row>
        </Container>
        <Container>
            <h4 className="headerTxt mt-5">Archived Projects</h4>
        </Container>
    </>
  )
}
