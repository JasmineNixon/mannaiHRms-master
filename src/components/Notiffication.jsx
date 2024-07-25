import React from 'react';
import { Container, Row, Col, Button, Table, Input, Form, FormGroup, Label, } from 'reactstrap';
import './ViewDependentDetails..css'; // Optional: for custom styling
import headimage from '../assets/images/headimage.png'; 
import { useNavigate } from 'react-router-dom';
const Notiffication = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };
  return (
    <Container fluid className="employee-details">
      <div>
        <img src={headimage} alt="Header" className="header-image" />
      </div>
      <Row className="mt-4 align-items-center">
        <Col>
        <strong>Your Request is Submitted for Approval</strong>
        </Col>
        <Col className="d-flex justify-content-end">
       
          <Button color="secondary" className="mx-1 btn-secondary" onClick={handleBackClick}>BACK</Button>
         
        </Col>
      </Row>
      <Row className="m-2 bg-grey  pt-2 mb-0 mt-3">
        <Col md="6">
          <div className="field">
            <div className="field-name">Employee Name:</div>
            <div className="field-value">Thomas, Jasmine</div>
          </div>
        </Col>
        <Col md="6">
          <div className="field">
            <div className="field-name">Organization Email Address:</div>
            <div className="field-value">Jasmine.Thomas@mannai.com.qa</div>
          </div>
        </Col>
      </Row>
      <Row className='bg-grey  m-2 mt-0 '>
        <Col md="6">
          <div className="field">
            <div className="field-name">Employee Number:</div>
            <div className="field-value">17399</div>
          </div>
        </Col>
        <Col md="6">
          <div className="field">
            <div className="field-name">Business Group:</div>
            <div className="field-value">Mannai Corporation</div>
          </div>
        </Col>
      </Row>
      
         
      
     
    </Container>
  );
}

export default Notiffication;
