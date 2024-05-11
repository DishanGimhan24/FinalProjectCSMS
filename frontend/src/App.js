import React from "react";
import './App.css';
import Allinquiries from "./components/Allinquiries"; // Updated import for AllInquiries
import Viewuinquiry from './components/Viewuinquiry'; // Updated import for ViewInquiry
import AddInquiry from './components/AddInquiry';
import EditInquiry from './components/EditInquiry'; // Updated import for EditInquiry
import Head from './components/Head';
import StatisticsPage from './components/StatisticsPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Head/>
        <Routes>
          <Route path="/ginq" element={<Allinquiries />} />
          <Route path="/addinq" element={<AddInquiry />} />
          <Route path="/view-inquiries" element={<Viewuinquiry />} />
          <Route path="/edit/:id" element={<EditInquiry />} />
          
          <Route path="/categoryTypeCounts" element={<StatisticsPage />} />
          <Route path="/prioritizationCounts" element={<StatisticsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
