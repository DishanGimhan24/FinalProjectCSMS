import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./Css/Count.css";

const PackageCounts = () => {
    const [packageCounts, setPackageCounts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8070/cab")
            .then(response => {
                setPackageCounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching package counts:', error);
            });
    }, []);

    const downloadPdf = () => {
        const doc = new jsPDF();

        // Table data
        const tableData = packageCounts.map(({ packageName, userCount, price }) => {
            return [packageName, userCount, `$${price}`, `$${price * userCount}`];
        });

        // Table headers
        const tableHeaders = ['Package Name', 'User Count', 'Price', 'Total Price'];

        // Set table position and styling
        const margin = 10;
        const startY = 30;

        // Add table to the PDF
        doc.autoTable({
            startY: startY,
            head: [tableHeaders],
            body: tableData,
            startY: startY,
            styles: { overflow: 'linebreak' },
            theme: 'striped',
            headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] }, // Header styles
            columnStyles: { 0: { fontStyle: 'bold' } } // Styles for specific columns
        });

        // Add title
        doc.setFontSize(16);
        doc.text('Package Counts', margin, margin);

        // Save the PDF
        doc.save('package_counts.pdf');
    };

    return (
        <div className="main-container">
            <main className="table">

                <div className="title">Package Counts</div>
                <div className="table__header">   
                <div className="submit-btn">
                    <button type="submit" className="btn btn-primary" onClick={downloadPdf}>Download as PDF</button>
                </div>
                </div>

                <div className="table__body">
                
                <table>
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>User Count</th>
                            <th>Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packageCounts.map(({ _id, packageName, userCount, price }) => (
                            <tr key={_id}>
                                <td>{packageName}</td>
                                <td>{userCount}</td>
                                <td>${price}</td>
                                <td>${price * userCount}</td>
                    
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </main>
        </div>
    );
};

export default PackageCounts;
