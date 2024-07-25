import React from 'react';
import { Container, Row, Col, Button, Table, Input, Form, FormGroup, Label, } from 'reactstrap';
import './ViewDependentDetails..css'; // Optional: for custom styling
import headimage from '../assets/images/headimage.png'; 
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate,useLocation } from 'react-router-dom';

const ViewDependentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const{formData ,attachments}= location.state || { formData:{},attachments:[] };


  function submitDet() {
    // Additional logic if needed before navigation
    console.log('Navigating to Dependent Fees');

    // Navigate programmatically
    navigate('/submit-view');
  }


  return (
    <Container fluid className="employee-details">
      <div>
        <img src={headimage} alt="Header" className="header-image" />
      </div>
      <Row className="mt-4 align-items-center">
        <Col>
          <h1>EMPLOYEE DEPENDENT DETAILS</h1>
        </Col>
        <Col className="d-flex justify-content-end">
        <Button color="primary" className="mx-1 btn-primary">CANCEL</Button>
          <Button color="primary" className="mx-1 btn-primary">SAVE FOR LATER</Button>
          <Button color="secondary" className="mx-1 btn-secondary">BACK</Button>
          <Button color="primary" className="mx-1 btn-primary" onClick={submitDet}>SUBMIT</Button>
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
      <Row className="mt-0 pt-2">
        <Col md="12" className='bg-grey'>
          <div tag="h2">ADD DETAILS</div>
          <hr />         
        </Col>       
      
      </Row>
      <Row style={{paddingTop:0}} className='bg-grey detbox'>
   
        <Col md={{ size: 6, offset: 3 }}>
        <Row className="mb-3">
        <Col sm="4">
          <strong>Child1</strong>
        </Col>
        <Col sm="8">
        {formData.child1Select}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm="4">
          <strong>DOB</strong>
        </Col>
        <Col sm="8">
          {formData.child1DOB}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm="4">
          <strong>Description</strong>
        </Col>
        <Col sm="8">
        {formData.child1Description}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm="4">
          <strong>Amount</strong>
        </Col>
        <Col sm="8">
        {formData.child1Amount}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm="4">
          <strong>Child2</strong>
        </Col>
        <Col sm="8">
        {formData.child2Select}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm="4">
          <strong>DOB</strong>
        </Col>
        <Col sm="8">
          01-06-2015
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm="4">
          <strong>Description</strong>
        </Col>
        <Col sm="8">
          {formData.child2Description}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm="4">
          <strong>Amount</strong>
        </Col>
        <Col sm="8">
          {formData.child2Amount}
        </Col>
      </Row>
        </Col>    
        </Row>
        <Row className="mt-4 pt-2 bg-grey">
        <Col>
         
          <div tag="h2">ADDITIONAL INFORMATION</div>
          <hr />   
         <p className="attachtext">To help approvers understand the request, you can attach supporting documents, images, or links to this action.</p>
         <Col sm="4">
        Attachments
        </Col>
        <Col sm="8">
           
        {/* attachment functionality to view attachment */}
        {attachments.map((attachment, index) => (
              <div key={index}>
                {attachment.attachDocs && (
                  <a href={attachment.attachDocs} target="_self" rel="noopener noreferrer">View Docs: {attachment.fileName}</a>
                )}
              </div>
            ))}
        </Col>
        </Col>
      </Row>
      <Row className="mt-4 pt-2 bg-grey">
        <Col>
         
          <div tag="h2">APPROVERS</div>
          <hr />   
          <Table responsive bordered>
        <thead>
          <tr>
            <th>Line No</th>
            <th>Approver</th>
            <th>Approver Type</th>
            <th>Order No</th>
            <th>Category</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Darussalam, Alee</td>
            <td>HR People</td>
            <td>1</td>
            <td>Approver</td>
            <td>
            <FaTrashAlt />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Pillai, Binu</td>
            <td>HR People</td>
            <td>2</td>
            <td>Approver</td>
            <td>
            <FaTrashAlt />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Menon, Vivek</td>
            <td>HR People</td>
            <td>3</td>
            <td>Approver</td>
            <td>
            <FaTrashAlt />
            </td>
          </tr>
        </tbody>
      </Table>
        </Col>
      </Row>
      <Col className="d-flex justify-content-end">
          <Button color="primary" className="mx-1 btn-primary">CANCEL</Button>
          <Button color="primary" className="mx-1 btn-primary">SAVE FOR LATER</Button>
          <Button color="secondary" className="mx-1 btn-secondary">BACK</Button>
          <Button color="primary" className="mx-1 btn-primary" onClick={submitDet}>SUBMIT</Button>
        </Col>
    </Container>
  );
}

export default ViewDependentDetails;