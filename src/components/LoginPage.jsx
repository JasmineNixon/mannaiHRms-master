import React, { useState } from 'react';
import logo from '../assets/images/mannaiwhitelogo.png';
import './Loginstyles.css';
import { useNavigate} from 'react-router-dom';



const LoginPage = ({  }) => {

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
  


  const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z]{3,}$/; // Only letters, at least 3 characters long
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleChangeUsername = (value) => {
    setUsername(value);
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Username is required',
      }));
    } else if (!validateUsername(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Username is not valid',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: '',
      }));
    }
  };

  const handleChangePassword = (value) => {
    setPassword(value);
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password is required',
      }));
    } else if (!validatePassword(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (!validateUsername(username)) {
      newErrors.username = 'Username is not valid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password =
        'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    return newErrors;
  };

  return (
    <div className='container'>
    <div className='row'>
    <div className='col-login'>
    <div>
     <img src={logo} alt="Logo" />
       </div>
      <div className='card'>
      
    <h2 className='border-bottom m0 p-3 card-title'>HRMS</h2>
    <div className='card-body'>
    <div className="login-form">
      <div className="form-group">
        <label className="form-label">Username:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        {/* {errors.username && <div className="error">{errors.username}</div>} */}
      </div>
      <div className="form-group mb-3">
        <label className="form-label">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        {/* {errors.password && <div className="error">{errors.password}</div>} */}
      </div>
      <div className='width100'>
      <span>
      <input type="checkbox" id="exampleCheckbox" name="example" />
      <label for="exampleCheckbox">Remember me</label>
      </span>

      <div className='mb-3 pull-right'>
      {/* <a className='fpass'> Forgot Password</a> */}
      </div>

      </div>
      <button type="button" onClick={handleLogin} className="btn btn-primary">
        Login
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};



export default LoginPage;