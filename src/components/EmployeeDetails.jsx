import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Table, Input } from "reactstrap";
import "./EmployeeDetails.css"; // Optional: for custom styling
import headimage from "../assets/images/headimage.png";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [employeeData, setEmployeeData] = useState(null);
  const [reqData, setReqData] = useState([]);
  const [error, setError] = useState(null);

  // Extract OTCS ticket from location state
  const otcsTicket = location.state?.otcsTicket;

  const [childDetails, setChildDetails] = useState([]);

  const [retryCount, setRetryCount] = useState(0);

  const hasFetchedData = useRef(false);
  const isRetrying = useRef(false);

  const fetchEmployeeData = async () => {
    if (!otcsTicket) {
      setError("Authentication failed !!");
      return;
    }

    const apiUrl = "http://MANSAGWM01:7777/devgtw/manapp/employee";
    const headers = {
      "x-Gateway-APIKey": "98376315-6f9b-4c80-964e-4d11560a379c",
      "Content-Type": "application/json",
      OTCSTicket: otcsTicket,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
      });

      if (response.status === 500) {
        throw new Error("Server error (500)");
      }

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      if (response.status === 200) {
        const empData = await response.json();
        console.log(empData);

        setEmployeeData(empData.empData);
        setReqData(empData.reqData);
        setChildDetails(empData);
        setRetryCount(0); // Reset the count
        isRetrying.current = false; // Reset the retry flag
      } else if (response.status === 204) {
        // Handle 204 No Content response appropriately
        console.log("No content available");
        Swal.fire("Employee is not registerd !!");
        setRetryCount(0); // Reset the count
        isRetrying.current = false;
      }
    } catch (error) {
      if (retryCount < 4) {
        setRetryCount((prev) => prev + 1);
        isRetrying.current = true;
        setTimeout(() => fetchEmployeeData(), 1000); // Retry after 1 second
      } else {
        setError(error.message);
        isRetrying.current = false;
        navigate("/"); // Navigate to login page after 5 failed attempts
      }
    }
  };

  useEffect(() => {
    if (!hasFetchedData.current && otcsTicket && !isRetrying.current) {
      fetchEmployeeData();
      hasFetchedData.current = true;
    }
  }, [otcsTicket]);

  function handleNavigateToDependentFees() {
    // Additional logic if needed before navigation
    console.log("Navigating to Dependent Fees");

    // Navigate programmatically
    navigate("/dependent-fees", { state: { childDetails, otcsTicket } });
  }

  //const tableHeaders = reqData.length > 0 ? Object.keys(reqData[0]) : [];
  // console.log(tableHeaders);

  const headersToShow = [
    "RequestID",
    "RequestDate",
    "Number of Child",
    "RequestStatus",
    "updateDate",
  ];

  return (
    <Container fluid className="employee-details">
      <div>
        <img src={headimage} alt="Header" className="header-image" />
      </div>
      <Row className="mt-4 align-items-center">
        <Col>
          <h1>GENERAL REQUEST SUMMARY</h1>
        </Col>
      </Row>

      <Row className="m-2 bg-grey  pt-2 mb-0 mt-3">
        <Col md="6">
          <div className="field">
            <div className="field-name">Employee Name:</div>
            <div className="field-value">
              {employeeData ? employeeData.Name : "Loading ..."}
            </div>
          </div>
        </Col>
        <Col md="6">
          <div className="field">
            <div className="field-name">Organization Email Address:</div>
            <div className="field-value">
              {employeeData ? employeeData.EmailID : "Loading ..."}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="bg-grey  m-2 mt-0 ">
        <Col md="6">
          <div className="field">
            <div className="field-name">Employee Number:</div>
            <div className="field-value">
              {employeeData ? employeeData.EmployeeID : "Loading ..."}
            </div>
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
          <div tag="h2">EMPLOYEE DETAILS</div>
          <hr />
        </Col>
        <Col md="6" className=" bg-grey">
          <Button
            color="secondary"
            className="btn btn-secondary"
            style={{ marginBottom: 10 }}
            onClick={handleNavigateToDependentFees}
          >
            CREATE A NEW GENERAL REQUEST
          </Button>
        </Col>
        <Col
          md="6"
          className="d-flex justify-content-end bg-grey "
          style={{ fontSize: 13 }}
        >
          Rows 1 to 12
        </Col>
      </Row>
      <Row style={{ paddingTop: 0 }}>
        <Col className="bg-grey">
          <div>
            {error && <p>{error}</p>}
            <Table responsive className="bg-grey">
              <thead>
                <tr>
                  <th>SELECT</th>
                  {headersToShow.map((header, index) => (
                    <th key={index}>
                      {header.toUpperCase().replace("_", " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reqData.map((request, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      <Input type="radio" name="requestSelect" />
                    </td>
                    {headersToShow.map((header, idx) => (
                      <td key={idx}>
                        {header === "Number of Child"
                          ? request.childCnt
                          : request[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Col className="d-flex justify-content-end">
        <Button color="secondary" className="mx-1 btn-secondary">
          CANCEL
        </Button>
        {/* <Button color="secondary" className="mx-1 btn-secondary">SAVE FOR LATER</Button> */}
        <Button
          color="primary"
          className="mx-1 btn-primary"
          disabled={location.pathname === "/"}
        >
          BACK
        </Button>
        <Button color="primary" className="mx-1 btn-primary">
          NEXT
        </Button>
      </Col>
    </Container>
  );
};

export default EmployeeDetails;
