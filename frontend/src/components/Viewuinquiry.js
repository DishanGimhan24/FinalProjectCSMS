import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [editedEmail, setEditedEmail] = useState(""); // State to store edited email
  const [editId, setEditId] = useState(null); // State to store ID of inquiry being edited
  const [emailError, setEmailError] = useState(""); // State to store email validation error

  useEffect(() => {
    // Fetch inquiries when component mounts
    axios.get("http://localhost:8070/inquiry/ginq")
      .then(response => {
        setInquiries(response.data);
      })
      .catch(error => {
        console.error('Error fetching inquiries: ', error);
      });
  }, []);

  // Function to handle deletion of an inquiry
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8070/inquiry/delete/${id}`)
      .then(response => {
        console.log(response.data);
        // Refresh the inquiries list after deletion
        setInquiries(prevInquiries => prevInquiries.filter(inquiry => inquiry._id !== id));
      })
      .catch(error => {
        console.error('Error deleting inquiry: ', error);
      });
  };

  // Function to handle editing of email
  const handleEditEmail = (id, currentEmail) => {
    // Set the ID of the inquiry being edited and current email
    setEditId(id);
    setEditedEmail(currentEmail); // Set current email as edited email
    setEmailError(""); // Clear any previous email validation error
  };

  // Function to handle submission of edited email
  const handleSubmitEdit = () => {
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(editedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Send a request to your backend to update the email address
    axios.put(`http://localhost:8070/inquiry/update/${editId}`, { personemail: editedEmail })
      .then(response => {
        console.log(response.data);
        // Reset editId and editedEmail states after successful update
        setEditId(null);
        setEditedEmail("");
        // Refresh inquiries list
        axios.get("http://localhost:8070/inquiry/")
          .then(response => {
            setInquiries(response.data);
          })
          .catch(error => {
            console.error('Error fetching inquiries: ', error);
          });
      })
      .catch(error => {
        console.error('Error updating email: ', error);
      });
  };

  return (
    <div className="container">
      <h2 style={{ color: 'white' }}>View Inquiries</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Category</th>
            <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Prioritization</th>
            <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Personum</th>
            <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Inquiry</th>
            <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Date</th> {/* Added Date column */}
            <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={index}>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>{inquiry.inquirycategory}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>{inquiry.inquiryprioritization}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
                {editId === inquiry._id ? (
                  <div>
                    <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ced4da' }} />
                    <button onClick={handleSubmitEdit} style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px', backgroundColor: '#007bff', borderColor: '#007bff', color: '#fff' }}>Save</button>
                    {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {inquiry.personemail}
                    <button onClick={() => handleEditEmail(inquiry._id, inquiry.personemail)} style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginTop: '8px', backgroundColor: '#007bff', borderColor: '#007bff', color: '#fff' }}>Edit Email</button>
                  </div>
                )}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>{inquiry.personum}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>{inquiry.personinquiry}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>{new Date(inquiry.addedDate).toLocaleString()}</td> {/* Display Date */}
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>{inquiry.status}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>
                <button onClick={() => handleDelete(inquiry._id)} style={{ padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
