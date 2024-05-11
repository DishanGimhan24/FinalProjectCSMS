import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import "./Css/View.css"; 

const ViewForm = () => {
    const [cabs, setCabs] = useState([]);
    const [filteredCabs, setFilteredCabs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [file] = useState(null);
    const [setUploadStatus] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:8070/cab")
            .then(response => {
                setCabs(response.data); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        const filtered = cabs.filter(cab =>
            cab.packageName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCabs(filtered);
    }, [cabs, searchTerm]);

    const handlePackageSelection = (packageName) => {
        const selected = filteredCabs.find(cab => cab.packageName === packageName);
        setSelectedPackage(selected);
        axios.post("http://localhost:8070/cab/select", { packageName })
        .then(response => {
            // Navigate to another page with form
            navigate('/form', { state: { selectedPackage: selected } });
        })
        .catch(error => {
            console.error('Error selecting package:', error);
        });
    };

    const upload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log("cab id " + selectedPackage._id);
            await axios.post("http://localhost:8070/uploads/fileUpload/" + selectedPackage._id, formData);
            setUploadStatus("File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("Error uploading file. Please try again.");
        }
    };

    return (
        <main className="table"> 
            <div className="table__header">
                <h3>Package Details</h3>
                <input
                    type="text"
                    placeholder="Search by package name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="table__body">
                <table>
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Time Period</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCabs.map(cab => (
                            <tr key={cab._id}>
                                <td>{cab.packageName}</td>
                                <td>{cab.description}</td>
                                <td>{cab.price}</td>
                                <td>{cab.timePeriod}</td>
                                <td>
                                    <button onClick={() => handlePackageSelection(cab.packageName)}>Select</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default ViewForm;
