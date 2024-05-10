import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './ImageGallery.css';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:8070/uploads/getAllImages');
            console.log('Response from server:', response.data);
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index === selectedImageIndex ? null : index);
    };

    const handleDownload = (url) => {
        // Create a temporary link element to download the image
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image'; // You can specify the filename here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const handleApprove = async (packageName) => {
        // Implement your logic for approving an image
        try {
            const response = await axios.post("http://localhost:8070/cab/select", { packageName });
            console.log(response.data.message); // Log the response message
            // You can handle success actions here, such as showing a success message to the user
        } catch (error) {
            console.error('Error selecting package:', error);
            // You can handle error actions here, such as showing an error message to the user
        }
    };

    return (
        <div className="image-gallery">
            {images.length === 0 ? (
                <p>No images available</p>
            ) : (
                images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => handleImageClick(index)}
                        className={`image-container ${selectedImageIndex === index ? 'selected' : ''}`}
                    >
                        <img src={image.url} alt={`Image ${index}`} className="content-image" />
                        <button onClick={() => handleDownload(image.url)} className="download-button">Download</button>
                        <button onClick={() => handleApprove(image.packageName)} className="approve-button">Approve</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default ImageGallery;
