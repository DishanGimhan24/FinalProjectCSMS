import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Bar } from "react-chartjs-2"; // Change import name to Bar
import "./Allinquiries.css";

export default function Chart() { // Change component name to Chart
  const [showStatistics, setShowStatistics] = useState(false);
  const [categoryTypeCounts, setCategoryTypeCounts] = useState({});
  const [prioritizationCounts, setPrioritizationCounts] = useState({});
  const [inquiries, setInquiries] = useState([]);
  const [uniqueKey, setUniqueKey] = useState(0); // For forcing re-render of charts
  const navigate = useNavigate();
  const [categoryChart, setCategoryChart] = useState(null);
  const [prioritizationChart, setPrioritizationChart] = useState(null);

  // Define default status options
  const statusOptions = ["Pending", "In Progress", "Resolved"];
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/inquiry/ginq")
      .then((response) => {
        setInquiries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inquiries: ", error);
      });
  }, []);

  // Rest of your code...

  if (showStatistics) {
    const categoryChartData = {
      labels: Object.keys(categoryTypeCounts),
      datasets: [
        {
          label: "Category Type Counts",
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF5733",
            "#C70039",
            "#900C3F",
            "#581845",
          ], // Add more colors if needed
          data: Object.values(categoryTypeCounts),
        },
      ],
    };

    return (
      <div>
        <h2>Statistics</h2>
        <div className="chart-container">
          <Bar
            data={categoryChartData}
            options={{
              maintainAspectRatio: false,
            }}
            key={`category-chart-${uniqueKey}`}
            ref={(ref) => setCategoryChart(ref)}
          />
        </div>
        <button onClick={() => setShowStatistics(false)}>Back to Inquiries</button>
      </div>
    );
  }

  // Rest of your code...
}
