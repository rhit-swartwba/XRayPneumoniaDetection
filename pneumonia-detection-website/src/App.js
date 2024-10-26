import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB2-lTlTMqkDCmbq5oXHo7wcS5FooeM_g",
  authDomain: "xraypneumoniadetection.firebaseapp.com",
  projectId: "xraypneumoniadetection",
  storageBucket: "xraypneumoniadetection.appspot.com",
  messagingSenderId: "264302956589",
  appId: "1:264302956589:web:8b7524432b79e7e25368a4",
  measurementId: "G-PM90EEEC7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
