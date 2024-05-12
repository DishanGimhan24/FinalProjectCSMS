import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./Css/upload.css";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [showModal, setShowModal] = useState(false);

    const { id } = useParams();
    const location = useLocation();

    const selectedPackage = location.state ? location.state.selectedPackage : null;

    if (!selectedPackage) {
        // Handle the case where selectedPackage is null or undefined
        return <div>No package selected.</div>;
    }

    const upload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post(`http://localhost:8070/uploads/fileUpload/${selectedPackage._id}`, formData);
            setUploadStatus("File uploaded successfully!");
            setShowModal(true); // Open the modal on success
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("Error uploading file. Please try again.");
        }
    };

    return (
        <div className="container" style={{ marginTop: '40px' }}>
            <h3 className="form-title">Selected Package Details:</h3>
            <div className="main-user-info">
                <p><strong>Package Name:</strong> {selectedPackage.packageName}</p>
                <p><strong>Price:</strong> {selectedPackage.price}</p>
                <p><strong>Time Period:</strong> {selectedPackage.timePeriod}</p>
            </div>
            <div className="user-input-box">
                <label htmlFor="file">Select Image:</label>
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="form-submit-btn">
                <button onClick={upload}>Upload</button>
            </div>
            {uploadStatus && <p>{uploadStatus}</p>}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>File has been uploaded successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UploadForm;
