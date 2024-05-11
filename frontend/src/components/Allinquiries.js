import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Pie, Bar } from "react-chartjs-2";
import "./Allinquiries.css";

export default function AllInquiries() {
  const [showStatistics, setShowStatistics] = useState(false);
  const [categoryTypeCounts, setCategoryTypeCounts] = useState({});
  const [prioritizationCounts, setPrioritizationCounts] = useState({});
  const [inquiries, setInquiries] = useState([]);
  const [uniqueKey, setUniqueKey] = useState(0);
  const navigate = useNavigate();
  const [categoryChart, setCategoryChart] = useState(null);
  const [prioritizationChart, setPrioritizationChart] = useState(null);
  const statusOptions = ["Pending", "In Progress", "Resolved"];
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/inquiry/ginq")
      .then((response) => {
        setInquiries(response.data);
        calculateCategoryTypeCounts(response.data);
        calculatePrioritizationCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inquiries: ", error);
      });
  }, []);

  const calculateCategoryTypeCounts = (data) => {
    const counts = {};
    data.forEach((inquiry) => {
      counts[inquiry.inquirycategory] = (counts[inquiry.inquirycategory] || 0) + 1;
    });
    setCategoryTypeCounts(counts);
  };

  const calculatePrioritizationCounts = (data) => {
    const counts = {};
    data.forEach((inquiry) => {
      counts[inquiry.inquiryprioritization] = (counts[inquiry.inquiryprioritization] || 0) + 1;
    });
    setPrioritizationCounts(counts);
  };

  const generateCategoryPieChartData = () => {
    return {
      labels: Object.keys(categoryTypeCounts),
      datasets: [
        {
          data: Object.values(categoryTypeCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
        },
      ],
    };
  };

  const generatePrioritizationBarChartData = () => {
    return {
      labels: Object.keys(prioritizationCounts),
      datasets: [
        {
          label: "Prioritization Counts",
          backgroundColor: ["rgba(255,99,132,0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
          borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
          borderWidth: 1,
          data: Object.values(prioritizationCounts),
        },
      ],
    };
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/inquiry/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setInquiries((prevInquiries) =>
          prevInquiries.filter((inquiry) => inquiry._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting inquiry: ", error);
      });
  };

  const handleStatusChange = (id, newStatus) => {
    axios
      .put(`http://localhost:8070/inquiry/updateStatus/${id}`, { status: newStatus })
      .then((response) => {
        console.log(response.data);
        setInquiries((prevInquiries) =>
          prevInquiries.map((inquiry) => {
            if (inquiry._id === id) {
              return { ...inquiry, status: newStatus };
            }
            return inquiry;
          })
        );
      })
      .catch((error) => {
        console.error("Error updating inquiry status: ", error);
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const columns = ["Category", "Prioritization", "Email", "Personum", "Inquiry"];
    const data = inquiries.map((inquiry) => [
      inquiry.inquirycategory,
      inquiry.inquiryprioritization,
      inquiry.personemail,
      inquiry.personum,
      inquiry.personinquiry,
    ]);

    const footer = (data) => {
      const categoryCounts = {};
      const prioritizationCounts = {};
      inquiries.forEach((inquiry) => {
        const category = inquiry.inquirycategory;
        const prioritization = inquiry.inquiryprioritization;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        prioritizationCounts[prioritization] = (prioritizationCounts[prioritization] || 0) + 1;
      });

      const categoryFooter = Object.entries(categoryCounts).map(([category, count]) => [
        `${category} Count:`,
        count,
      ]);
      const prioritizationFooter = Object.entries(prioritizationCounts).map(([prioritization, count]) => [
        `${prioritization} Count:`,
        count,
      ]);

      const totalCount = data.length;
      const footerData = [
        ["Category Type Counts:", ...categoryFooter],
        ["Prioritization Counts:", ...prioritizationFooter],
        ["Total Inquiries:", totalCount],
      ];
      return footerData;
    };

    doc.autoTable({
      head: [columns],
      body: data,
      foot: footer(data),
    });
    doc.save("inquiries.pdf");
  };

  const handleSearch = () => {
    // Convert search term to lowercase
    const searchTermLower = searchTerm.toLowerCase();
    // Check if the search term is valid
    if (!["special", "urgent", "normal"].includes(searchTermLower)) {
      alert("Invalid search term. Please enter 'Special', 'Urgent', or 'Normal'.");
      return;
    }

    axios
      .get(`http://localhost:8070/inquiry/search?priority=${searchTermLower}`)
      .then((response) => {
        setInquiries(response.data);
      })
      .catch((error) => {
        console.error("Error searching inquiries: ", error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchTerm.trim() === "") {
        // If search term is empty, reload all inquiries
        axios
          .get("http://localhost:8070/inquiry/ginq")
          .then((response) => {
            setInquiries(response.data);
          })
          .catch((error) => {
            console.error("Error fetching inquiries: ", error);
          });
      } else {
        // If search term is not empty, perform search
        handleSearch();
      }
    }
  };

  const handleReply = (id, email) => {
    const subject = encodeURIComponent("Reply to your inquiry");
    const body = encodeURIComponent("Please enter your reply here...");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
    handleStatusChange(id, "Resolved");
  };

  useEffect(() => {
    if (!showStatistics && categoryChart && prioritizationChart) {
      categoryChart.destroy();
      prioritizationChart.destroy();
    }
  }, [showStatistics]);

  if (showStatistics) {
    const categoryPieChartData = generateCategoryPieChartData();
    const prioritizationBarChartData = generatePrioritizationBarChartData();
    return (
      <div>
        <h2>Statistics</h2>
        <div className="chart-container">
          <Pie
            data={categoryPieChartData}
            options={{
              maintainAspectRatio: false,
            }}
            key={`category-chart-${uniqueKey}`}
            ref={(ref) => setCategoryChart(ref)}
          />
          <Bar
            data={prioritizationBarChartData}
            options={{
              maintainAspectRatio: false,
            }}
            key={`prioritization-chart-${uniqueKey}`}
            ref={(ref) => setPrioritizationChart(ref)}
          />
        </div>
        <button onClick={() => setShowStatistics(false)}>Back to Inquiries</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h3>Category Type Counts:</h3>
        <ul>
          <li>Booking: {categoryTypeCounts["Booking"] || 0}</li>
          <li>Payment: {categoryTypeCounts["Payment"] || 0}</li>
          <li>Complaints: {categoryTypeCounts["Complaints"] || 0}</li>
          <li>General: {categoryTypeCounts["General"] || 0}</li>
        </ul>
      </div>
      <div>
        <h3>Prioritization Counts:</h3>
        <ul>
          <li>Urgent: {prioritizationCounts["Urgent"] || 0}</li>
          <li>Special: {prioritizationCounts["Special"] || 0}</li>
          <li>Normal: {prioritizationCounts["Normal"] || 0}</li>
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Prioritization Type"
          className="transparent-placeholder"
        />
        <button onClick={handleSearch} className="search-btn">
          Search by Prioritization
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Prioritization</th>
            <th scope="col">Email</th>
            <th scope="col">Personum</th>
            <th scope="col">Inquiry</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={index}>
              <td>{inquiry.inquirycategory}</td>
              <td>{inquiry.inquiryprioritization}</td>
              <td>{inquiry.personemail}</td>
              <td>{inquiry.personum}</td>
              <td>{inquiry.personinquiry}</td>
              <td>{new Date(inquiry.addedDate).toLocaleString()}</td>
              <td>
                <select
                  value={inquiry.status}
                  onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                  className="form-control"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(inquiry._id)} className="btn btn-danger">
                  Delete
                </button>
                <button onClick={() => handleReply(inquiry._id, inquiry.personemail)} className="btn btn-primary">
                  Reply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={generatePDF} className="btn btn-primary">
        Download PDF
      </button>
      <button onClick={() => setShowStatistics(true)}>Statistics</button>
    </div>
  );
}
