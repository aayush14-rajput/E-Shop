"use client"
import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';
const Admin = () => {
  return (
    <div>
      <Container className='mt-4'>
        <Row className='flex flex-row justify-center items-center gap-2'>
          <Col>
            <Card style={{ width: '18rem', backgroundColor:'#edc13a' }}>
              <Card.Body>
                <Card.Title>Total Users</Card.Title>
        
                <Card.Text>
                 4
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem', backgroundColor:'#e0c477' }}>
              <Card.Body>
                <Card.Title>Total Revenue</Card.Title>
        
                <Card.Text>
                 $400
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem', backgroundColor:'#426a54' }}>
              <Card.Body>
                <Card.Title>Total Orders</Card.Title>
                <Card.Text>
                 20
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '18rem', backgroundColor:'#8b6948' }}>
              <Card.Body>
                <Card.Title>Total Products</Card.Title>
                <Card.Text>
                 300
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Admin