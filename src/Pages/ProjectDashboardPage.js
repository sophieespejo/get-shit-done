import React, { useState } from 'react'
import { Container, Row, Col, Accordion, ListGroup, Button } from "react-bootstrap";
import ProjectCardComponent from '../Components/ProjectCardComponent';
import NewProjectComponent from '../Components/NewProjectComponent';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";

export default function ProjectDashboardPage() {

  let navigate = useNavigate();

  const [blogItems, setBlogItems] = useState([ {
    Id: 1,
    isArchived: true,
    isPublished: true,
    Title: "Growing Tomatos",
    Publisher: "Walaa AlSalmi",
    Date: "01-12-2022",
    Text: "Devote a prime, sunny spot to growing tomatoes. Tomatoes need at least 6 to 8 hours of sun to bring out their best flavors. You will need to stake, trellis, or cage most tomato plants to keep them off the ground. Decide on a support plan before you set out your plants, then add that support directly after planting. You will need to stake, trellis, or cage most tomato plants to keep them off the ground. Decide on a support plan before you set out your plants.",
    Image:
      "https://www.almanac.com/sites/default/files/styles/landscape/public/image_nodes/tomatoes_helios4eos_gettyimages-edit.jpeg?itok=m9c3T-XV",
  },
  
  {
    Id: 2,
    isArchived: true,
    isPublished: true,
    Title: "Growing Peppers",
    Date: "01-06-2022",
    Publisher: "Tom Finland",
    Text: "Set pepper plant seedlings out after the last spring frost. They grow well in raised beds, containers, and in-ground gardens. Plant them 18 to 24 inches apart in a sunny, well-drained spot. Pepper plants need at least 6-8 hours of sunlight per day. They grow well in raised beds, containers, and in-ground gardens. Plant them 18 to 24 inches apart in a sunny, well-drained spot. Pepper plants need at least 6-8 hours of sunlight per day.",
    Image:
      "https://www.farmersalmanac.com/wp-content/uploads/2020/11/Planting-Guide-Bell-Peppers-A105431708.jpg",
  },
  {
    Id: 3,
    isArchived: true,
    isPublished: false,
    Title: "Growing Eggplants",
    Publisher: "Sam Bilton",
    Date: "12-24-2021",
    Text: "Start eggplant seeds indoors up to 10 weeks before the last frost date. Plant the seeds 1/4inch deep, water after planting and cover loosely with plastic to retain moisture. Transplant the seedlings to the garden when soil temperatures reach 60 degrees. Transplant the seedlings to the garden when soil temperatures reach 60 degrees.",
    Image:
      "https://cleangreensimple.com/wp-content/uploads/2020/05/growing-eggplant.jpg",
  },
  {
    Id: 4,
    isArchived: true,
    isPublished: false,
    Title: "Growing Zucchinis",
    Publisher: "Tina Freedman",
    Date: "12-15-2021",
    Text: "Zucchini needs full sun (at least 6 to 8 hours) and consistently moist soil that is high in organic matter. Some zucchini varieties are vining types that require a trellis or a lot of room to sprawl. There are also bush types suitable for container gardening and small space gardening. There are also bush types suitable for container gardening and small space gardening.",
    Image:
      "https://greenhouseemporium.com/wp-content/uploads/2020/02/How_to_Grow_Zucchini_2.jpg",
  }])

  const {viewIcon} = <FontAwesomeIcon icon={faMagnifyingGlass} />
  return (
    <>
        <Container className="mt-5">
            <h4 className="headerTxt">Your Current Projects:</h4>
            <Row xs={2} lg={4} className="g-3">
              {/* Map thru current projects here */}
                {Array.from({ length: 6 }).map((_, idx) => (
                    < ProjectCardComponent /> ))}
                    < NewProjectComponent />
            </Row>
        </Container>
        <Container>
            <Row className="mt-5">
              {/* Map thru archived projects here */}
              <Accordion defaultActiveKey="1">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Archived Projects{viewIcon}</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    {blogItems.map((item, i) => {
                      return (
                        <>
                          {item.isArchived ? (
                            <ListGroup.Item key={i} className="d-flex">
                              <Col>{item.Title}</Col>
                              <Col className=" d-flex justify-content-end">
                                <Button className="editBtn" onClick={() => navigate("/taskDashboard")}>View Project {viewIcon}</Button>
                              </Col>
                            </ListGroup.Item>
                          ) : null}
                        </>
                      );
                    })}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              </Accordion>
            </Row>
        </Container>

        {/* see all users and roles */}
        <Container>
            <Row className="mt-5">
              <h3>All Staff</h3>
              {/* Map thru archived projects here */}
              <Accordion defaultActiveKey="1">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Admin {viewIcon}</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    {/* map thru all users */}
                    {blogItems.map((item, i) => {
                      return (
                        <>
                            <ListGroup.Item key={i} className="d-flex">
                              {/* user.FullName */}
                              <Col>{item.Title}</Col>
                        {/* check to see if user.isAdmin */}
                          {item.isArchived && item.isPublished ? (
                            <Col className=" d-flex justify-content-end">
                                <Button variant = "danger" className="">Delete user</Button>
                                <Button variant = "info" className="">Change role</Button>
                              </Col>
                          ) : null}
                          </ListGroup.Item>
                        </>
                      );
                    })}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Project Managers</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    {/* map thru all users */}
                    {blogItems.map((item, i) => {
                      return (
                        <>
                        <ListGroup.Item key={i} className="d-flex">
                        {/* check to see if the user.isProjectManager */}
                          {item.isPublished ? (
                            <>
                              {/* user.FullName */}
                              <Col>{item.Title}</Col>
                            </>
                          ) : null }
                        {/* check to see if user.isAdmin */}
                          {item.isArchived && item.isPublished ? (
                            <Col className=" d-flex justify-content-end">
                                <Button variant = "danger" className="">Delete user</Button>
                                <Button variant = "info" className="">Change role</Button>
                              </Col>
                          ) : null}
                          </ListGroup.Item>
                        </>
                      );
                    })}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Specialists</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    {/* map thru all users */}
                    {blogItems.map((item, i) => {
                      return (
                        <>
                            <ListGroup.Item key={i} className="d-flex">
                              {/* user.FullName */}
                              <Col>{item.Title}</Col>
                        {/* check to see if user.isAdmin */}
                          {item.isArchived ? (
                            <Col className=" d-flex justify-content-end">
                                <Button variant = "danger" className="">Delete user</Button>
                                <Button variant = "info" className="">Change role</Button>
                              </Col>
                          ) : null}
                          </ListGroup.Item>
                        </>
                      );
                    })}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
                    
              </Accordion>
            </Row>
        </Container>
    </>
  )
}
