import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an X-ray image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    setLoading(true);
    try {
      const response = await axios.post('YOUR_API_URL_HERE', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error during prediction:', error);
      setPrediction('Error during prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Pneumonia Detection</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Detecting...' : 'Detect Pneumonia'}
      </button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
}

export default App;
