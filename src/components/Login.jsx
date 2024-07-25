import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import logo from '../assets/images/mannaiwhitelogo.png';
import './Loginstyles.css';

import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';


const Forms = () => {

  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otcsTicket, setOTCSTicket] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
        
    e.preventDefault();
  
    const apiUrl = 'http://MANSAGWM01:7777/devgw/eims/v1/auth';
    const headers = {
      // 'x-Gateway-APIKey': '4c061748-39a8-419e-a24b-a63fad422ddc'
    };
  
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
  
    try {

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers, 
        body: formData,   
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const data = await response.json();
      if (data.ticket) {
        setOTCSTicket(data.ticket);
        console.log('OTCSTicket:', data.ticket);
        navigate("/employeeDetails",{state:{ otcsTicket: data.ticket }});
      } else {
        throw new Error('Authentication failed: No ticket in response');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container logstyle">
      <Row>
        <Col className="col-login">
        <div style={{textAlign:'center'}}>
     <img src={logo} alt="Logo" />
       </div>
          <Card>
            <CardTitle tag="h2" className="border-bottom p-3 mb-0">
              <i className="bi bi-people me-2"></i>
             HRMS
            </CardTitle>
            <CardBody>
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Enter the username"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Enter the password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup check>
                  <Input type="checkbox" /> <Label check>Remember me</Label>
                </FormGroup>
                <FormGroup className="textCenter">
                  <Button type="submit">Login</Button>
                </FormGroup>
                {error && <div style={{ color: 'red' }}>{error}</div>}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Forms;
