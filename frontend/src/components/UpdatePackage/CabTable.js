import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import './CabTable.css';

const CabTable = () => {
    const [cabs, setCabs] = useState([]);
    const { id } = useParams(); // Get the id parameter from the URL
    const [editedCab, setEditedCab] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8070/cab")
            .then(response => {
                setCabs(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    function deleteData(id) {
        axios.delete(`http://localhost:8070/cab/delete/${id}`)
            .then(() => {
                alert("Item deleted");
                axios.get("http://localhost:8070/cab")
                    .then(response => {
                        setCabs(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    }

    const handleEdit = (id) => {
        setEditedCab(id);
    };

    const cancelEdit = () => {
        setEditedCab(null);
    };

    const saveEdit = (id, updatedCab) => {
        axios.put(`http://localhost:8070/cab/update/${id}`, updatedCab)
            .then(() => {
                alert("Item updated");
                axios.get("http://localhost:8070/cab")
                    .then(response => {
                        setCabs(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
                setEditedCab(null);
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className="main-container">
            <div className="table">
                <div className="title">
                    <h3>Package Details</h3>
                </div>
                <div className="table__body">
                    <table>
                        <thead>
                            <tr>
                                <th>Package Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Time Period</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cabs.map(cab => (
                                <tr key={cab._id}>
                                    <td>{editedCab === cab._id ? <input type="text" defaultValue={cab.packageName} data-id={`${cab._id}-packageName`} /> : cab.packageName}</td>
                                    <td>{editedCab === cab._id ? <input type="text" defaultValue={cab.description} data-id={`${cab._id}-description`} /> : cab.description}</td>
                                    <td>{editedCab === cab._id ? <input type="text" defaultValue={cab.price} data-id={`${cab._id}-price`} /> : cab.price}</td>
                                    <td>{editedCab === cab._id ? <input type="text" defaultValue={cab.timePeriod} data-id={`${cab._id}-timePeriod`} /> : cab.timePeriod}</td>
                                    <td>
                                        {editedCab === cab._id ? (
                                                <>
                                                    <button onClick={() => saveEdit(cab._id, { packageName: document.querySelector(`input[data-id="${cab._id}-packageName"]`).value, description: document.querySelector(`input[data-id="${cab._id}-description"]`).value, price: document.querySelector(`input[data-id="${cab._id}-price"]`).value, timePeriod: document.querySelector(`input[data-id="${cab._id}-timePeriod"]`).value })}>Save</button>
                                                    <button onClick={cancelEdit}>Cancel</button>
                                                </>
                                            ) : (
                                                <div className="submit-btn">
                                                <button type="submit" className="btn btn-primary" onClick={() => handleEdit(cab._id)}>Edit</button>
                                                </div>
                                        )}
                                        
                                    </td>
                                    <td>
                                                <div className="submit-btn-red">
                                                <button type="submit" className="btn btn-primary" onClick={() => deleteData(cab._id)}>Delete</button>
                                                </div>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CabTable;
