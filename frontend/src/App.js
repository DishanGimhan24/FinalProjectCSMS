import './AdminApp.css';
import React from "react";
import AdminHeader from './components/AdminHeader';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
import Addsystemusers from './components/Addsystemusers';
import Allsystemusers from './components/AllsystemUsers';
import AddSalary from './components/AddSalary';
import AllSalaries from './components/AllSalaries';
import Analysis from './components/Analysis';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        
        
        
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/add" element={<Addsystemusers />} />
          <Route path="/update" element={<Allsystemusers />} />
          <Route path="/salary/add" element={<AddSalary/>}/>
          <Route path="/salary/update" element={<AllSalaries/>}/>
          <Route path="/analytics" element={<Analysis/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
