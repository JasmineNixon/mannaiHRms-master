import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeDetails from './components/EmployeeDetails';
import DependentFees from './components/DependentFees';
import ViewDependentDetails from './components/ViewDependentDetails';
import Notiffication from './components/Notiffication';
import Login from './components/Login';
import LoginPage from './components/LoginPage';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
    
          <Route path="/" element={<Login />} />
          <Route path="/LoginPage" element={<LoginPage/>} />
          <Route path="/employeeDetails" element={<EmployeeDetails />} />
          <Route path="/dependent-fees" element={<DependentFees />} />
          <Route path="/dependent-view" element={<ViewDependentDetails/>} />
          <Route path="/submit-view" element={<Notiffication/>} />
        </Routes>
     
      </div>
    </Router>
  );
}

export default App;
