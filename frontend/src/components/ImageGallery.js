import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CabGallery = () => {
  const [cabs, setCabs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the cab data on component mount
  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const response = await axios.get('http://localhost:8070/uploads/cabs');
        if (response.data.success) {
          setCabs(response.data.cabs);
        } else {
          setError(response.data.message || 'Failed to load cabs.');
        }
      } catch (err) {
        setError('An error occurred while fetching cabs.');
      }
    };

    fetchCabs();
  }, []);

  // Handle image deletion
  const handleDelete = async (cabId, filePath) => {
    try {
      const response = await axios.delete(`http://localhost:8070/uploads/fileUpload/${cabId}`, {
        data: { filePath }, // Send filePath in the request body
      });

      if (response.data.success) {
        setCabs((prevCabs) => {
          // Remove the deleted image from the state
          return prevCabs.map((cab) => {
            if (cab.id === cabId) {
              return {
                ...cab,
                images: cab.images.filter((image) => image.fileName !== filePath.split('/').pop()),
              };
            }
            return cab;
          });
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred while deleting the image.');
    }
  };

  return (
    <div className="container mt-6">
      <h2>Cab Gallery</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {cabs.length > 0 ? (
          cabs.map((cab) => (
            <div key={cab.id} className="col-md-6 mb-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Cab ID: {cab.id}</h5>
                  <div>
                    {cab.images.map((image) => (
                      <div key={image.fileName} className="mb-3">
                        <img
                          src={image.url}
                          alt={image.fileName}
                          className="img-fluid"
                        />
                        <p>{image.fileName}</p>
                        <button
                          onClick={() => handleDelete(cab.id, image.fileName)}
                          className="btn btn-danger"
                        >
                          Delete Image
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No cabs available.</p>
        )}
      </div>
    </div>
  );
};

export default CabGallery;
