import React, { useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './AddPackage.css';

export default function AddPackage() {
    const [packageName, setPackageName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [timePeriod, setTimePeriod] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [priceError, setPriceError] = useState("");
    const [durationError, setDurationError] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newPackage = {
            packageName,
            description,
            price,
            timePeriod
        };

        axios.post("http://localhost:8070/cab/add", newPackage)
            .then(() => {
                setShowModal(true);
                setPackageName("");
                setDescription("");
                setPrice("");
                setTimePeriod("");
                setPriceError("");
                setDurationError("");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="container">
            <form onSubmit={sendData}>
                <div className="mb-1">
                    <label htmlFor="packageName" className="form-label">Package Name</label>
                    <input type="text" className="form-control" id="packageName" placeholder='Enter Package name'
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" placeholder='Enter Package Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        placeholder='Enter Package price'
                        value={price}
                        onChange={(e) => {
                            const inputPrice = parseFloat(e.target.value);

                            if (!isNaN(inputPrice) && inputPrice > 0) {
                                setPrice(inputPrice);
                                setPriceError('');
                            } else {
                                setPrice('');
                                setPriceError('Please enter a valid positive number');
                            }
                        }}
                    />
                    {priceError && <p style={{ color: 'red' }}>{priceError}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="timePeriod" className="form-label">Duration</label>
                    <input type="text" className="form-control" id="timePeriod" placeholder='Enter Package Duration'
                        value={timePeriod}
                        onChange={(e) => {
                            const inputDuration = parseFloat(e.target.value);

                            if (!isNaN(inputDuration) && inputDuration > 0) {
                                setTimePeriod(inputDuration);
                                setDurationError('');
                            } else {
                                setTimePeriod('');
                                setDurationError('Please enter a valid positive number');
                            }
                        }}
                    />
                    {durationError && <p style={{ color: 'red' }}>{durationError}</p>}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Package Added</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your package has been successfully added!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
