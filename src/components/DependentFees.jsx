
import React, { useState ,useEffect} from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import "./DependentFees.css"; // Optional: for custom styling
import headimage from "../assets/images/headimage.png";
import { FaPaperclip, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate ,useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const DependentFees = () => { 

  const [empData ,setEmpdata]= useState({});
  
   //varify state to check weather amount is exceeded or not. 
    
  const [isVerified, setIsVerified] = useState(false);

  const [isChild2Visible, setIsChild2Visible] = useState(false);


  // const [attachments, setAttachments] = useState([
  //   { attachDocs: null },
  //   { attachDocs: null },
  // ]);

  const [attachments, setAttachments] = useState([{ file: null, fileName: "" },
    {file:null ,fileName:""}
  ]);



  const [currentFile, setCurrentFile] = useState({
    rowIndex: null,
    fileType: "",
  });

  //setting formdata state for store the value

  const [formData, setFormData] = useState({
    child1Select: "",
    child1DOB: "",
    child1Description: "",
    child1Amount: "",
    child2Select: "",
    child2DOB: "",
    child2Description: "",
    child2Amount: "",
  });

  const navigate = useNavigate();
  
  const location = useLocation();

  const otcsTicket = location.state?.otcsTicket;

  console.log(otcsTicket);
  
  const{childDetails}= location.state || { childDetails:{}};  

  const childData = childDetails.childData || [];

   
   
   // Function to update DOB based on selected child
   const updateChildDOB = (childSelectName, childDOBName, selectedChildID) => {
    if (selectedChildID === "") {
      setFormData((prevData) => ({
        ...prevData,
        [childDOBName]: "",
      }));
      return;
    }

    const selectedChild = childData.find(
      (child) => child.ChildID === parseInt(selectedChildID)
    );
    if (selectedChild) {
      const formattedDOB = selectedChild.ChildDOB.split(" ")[0];
      setFormData((prevData) => ({
        ...prevData,
        [childDOBName]: formattedDOB,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "child1Select") {
      updateChildDOB(name, "child1DOB", value);
    } else if (name === "child2Select") {
      updateChildDOB(name, "child2DOB", value);
    }
  };
   
   //setting value for employee dynamically 
     // Use useEffect to set empData when childDetails changes
  useEffect(() => {
    if (childDetails && childDetails.empData) {
      setEmpdata(childDetails.empData);
    }
  }, [childDetails]);
   
  //
  const viewDependentFees = () => {
    console.log("Navigating to Dependent Fees");
    navigate("/dependent-view", { state: { formData, attachments } });
  };

  const showChild2FormGroup = () => {
    setIsChild2Visible(true);
  };

  const hideChild2FormGroup = () => {
    setIsChild2Visible(false);
  };

 



  //varification function 
  
  const verifyDetails = async () => {
    debugger;
    console.log("Form Data:", formData);
    // Create the request payload
    const requestData = {
      requestID: "", 
      compensation: [
        { childid: formData.child1Select, amount: formData.child1Amount },
        { childid: formData.child2Select, amount: formData.child2Amount }
      ]
    }; 
    console.log(requestData);
  
    try {
      // Make the API call
      const response = await fetch("https://", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });
  
      const responseData = await response.json();
      console.log("API Response:", responseData);
  
      // Check if the request was valid
      if (responseData.compensation.validRequest === "true") {
        Swal.fire("Success", "Verification successful!", "success");
        setIsVerified(true);
        
      } else {
        Swal.fire("Failed", "Verification failed. Amount exceeded.", "error");
        setIsVerified(false);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      Swal.fire("Error", "An error occurred during verification. Please try again.", "error");
      setIsVerified(false);
    }
  }; 


   //upload document functionality 

   const handleFileUpload = (event, index) => {
    const file = event.target.files[0];
    const newAttachments = [...attachments];
    newAttachments[index] = {
      ...newAttachments[index],
      fileName: file.name,
      file: file,
    };
    setAttachments(newAttachments);
  };
   //api call for uploading document 

   const handleUploadDoc = async (file, fileName, index) => {

    if (!file) {
      Swal.fire("Error", "No file selected", "error");
      return;
    }

    const formData = new FormData();
    formData.append("type", "144");
    formData.append("parent_id", "3711589");
    formData.append("name", fileName);
    formData.append("file", file);

    try {
      
      
      if (!otcsTicket) {

       console.log('Authentication error !!');
        return;
      }

      const response = await fetch(
        "http://MANSAGWM01:7777/devgw/eims/v2/nodes",
        {
          method: "POST",
          body: formData,
          headers: {
            // 'x-Gateway-APIKey': '4c061748-39a8-419e-a24b-a63fad422ddc',
            OTCSTicket: otcsTicket,

          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        const fileId = responseData.id;
        Swal.fire("Success", `File uploaded successfully. ID: ${fileId}`, "success");

      } else {
        // Handle error response
        const errorData = await response.json();
        Swal.fire("Error", `Upload failed: ${errorData.error}`, "error");
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error during file upload", error);
      Swal.fire("Error", "File upload failed. Please try again.", "error");
    }
  };

 

  const previousPageNav = () => {
    navigate("/");
  };
  return (
    <Container fluid className="employee-details">
      <div>
        <img src={headimage} alt="Header" className="header-image" />
      </div>
      <Row className="mt-4 align-items-center">
        <Col>
          <h1>EMPLOYEE DEPENDENT REQUEST</h1>
        </Col>
       
      </Row>
      <Row className="m-2 bg-grey pt-2 mb-0 mt-3">
        <Col md="6">
          <div className="field">
            <div className="field-name">Employee Name:</div>
            <div className="field-value">{empData.Name}</div>
          </div>
        </Col>
        <Col md="6">
          <div className="field">
            <div className="field-name">Organization Email Address:</div>
            <div className="field-value">{empData.EmailID}</div>
          </div>
        </Col>
      </Row>
      <Row className="bg-grey m-2 mt-0">
        <Col md="6">
          <div className="field">
            <div className="field-name">Employee Number:</div>
            <div className="field-value">{empData.EmployeeID}</div>
          </div>
        </Col>
        <Col md="6">
          <div className="field">
            <div className="field-name">Business Group:</div>
            <div className="field-value">Mannai Corporation</div>
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md="12" className="bg-grey">
          <div tag="h2">ADD DETAILS</div>
          <hr />
        </Col>
      </Row>
      <Row style={{ paddingTop: 0 }} className="bg-grey">
        <Col md={{ size: 6, offset: 3 }}>
          <Form>
            <FormGroup row style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  width: "127px",
                  right: "-100px",
                }}
              >
                <FaPlus
                  style={{
                    cursor: "pointer",
                    marginLeft: "0%",
                    fontSize: "1.5em",
                    marginRight: "0.5em",
                    color: isChild2Visible ? "#808080" : "#000000",
                  }}
                  onClick={showChild2FormGroup}
                />
                <FaMinus
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5em",
                    color: !isChild2Visible ? "#808080" : "#B22222",
                  }}
                  onClick={hideChild2FormGroup}
                />
              </span>
              <Label for="child1Select" sm={3}>
                Select Child 1
              </Label>
              <Col sm={9}>
                <Input
                  type="select"
                  name="child1Select"
                  id="child1Select"
                  value={formData.child1Select}
                  onChange={handleInputChange}
                >
                  <option value={""}>--Select--</option>
                  {childData.map((child) => (
                    <option key={child.ChildID} value={child.ChildID}>
                      {child.ChildName}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="child1DOB" sm={3}>
                DOB
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="child1DOB"
                  id="child1DOB"
                  readOnly
                 defaultValue={formData.child1DOB}
            
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="child1Description" sm={3}>
                Description
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="child1Description"
                  id="child1Description"
                  value={formData.child1Description}
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="child1Amount" sm={3}>
                Amount
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="child1Amount"
                  id="child1Amount"
                  value={formData.child1Amount}
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>
            {/* {!isChild2Visible && (
              <FormGroup row>
                <Col sm={{ size: 9, offset: 3 }}>
                 
                </Col>
              </FormGroup>
            )} */}

            <hr></hr>
            {isChild2Visible && (
              <>
                <FormGroup row>
                  <Label for="child2Select" sm={3}>
                    Select Child 2
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="select"
                      name="child2Select"
                      id="child2Select"
                      value={formData.child2Select}
                      onChange={handleInputChange}
                    >
                      <option value={""}>--Select--</option>
                      {childData.map((child) => (
                        <option key={child.ChildID} value={child.ChildID}>
                          {child.ChildName}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="child2DOB" sm={3}>
                    DOB
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="text"
                      name="child2DOB"
                      id="child2DOB"
                      readOnly
                      defaultValue={formData.child2DOB}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="child2Description" sm={3}>
                    Description
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="text"
                      name="child2Description"
                      id="child2Description"
                      value={formData.child2Description}
                      onChange={handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="child2Amount" sm={3}>
                    Amount
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="text"
                      name="child2Amount"
                      id="child2Amount"
                      value={formData.child2Amount}
                      onChange={handleInputChange}
                    />
                  </Col>
                </FormGroup>
              </>
            )}
          </Form>
        </Col>
      </Row>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button color="primary" className="mx-1 btn-primary" onClick={verifyDetails}>
          Varify
        </Button>
      </div>
      {/* {isVerified && ( */}
      <Row className="mt-4">
        <Col>
          <div tag="h2">ATTACHMENTS</div>
          <hr />
          <p className="attachtext">
            <FaPaperclip /> TIP: Please attach the copy of supporting documents.
          </p>
          <Table bordered className="attachments-table">
            <thead>
              <tr>
                <th>ATTACH SUPPORTING DOCUMENTS</th>
              </tr>
            </thead>
            <tbody>
              {attachments.map((attachment, index) => (
            <tr key={index}>
              <td>
                <FaPaperclip />
                <input
                  type="file"
                  id={`fileInput${index}`}
                  multiple
                  onChange={(event) => handleFileUpload(event, index)}
                />
                <Button
                  color="primary"
                  onClick={() => handleUploadDoc(attachment.file,attachment.fileName, index)}
                >
                  Add Attachment
                </Button>
              </td>
            </tr>
          ))}
            </tbody>
          </Table>
        </Col>
      </Row> 
      {/* )} */}
      <Col className="d-flex justify-content-end">
        <Button color="primary" className="mx-1 btn-primary">
          CANCEL
        </Button>
        <Button
          color="secondary"
          className="mx-1 btn-secondary"
          onClick={previousPageNav}
        >
          BACK
        </Button>
        <Button color="primary" className="mx-1 btn-primary" onClick={viewDependentFees}>
          SUBMIT
        </Button>
      </Col>
    
    </Container>
  );
};

export default DependentFees;

