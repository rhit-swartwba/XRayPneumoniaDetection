import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardMedia, CardActions } from '@mui/material';
import axios from 'axios';
import ImageDropZone from './components/ImageDropZone.js';
import PreloadedImageGallery from './components/PreloadedImageGallery.js';
import ResultDisplay from './components/ResultDisplay.js';
import TryToBeatModel from './components/TryToBeatModel';
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
  const [uploadedImage, setUploadedImage] = useState(null);
  const [result, setResult] = useState({ outcome: '', confidence: '' });

  const handleDetect = async () => {
    const formData = new FormData();
    formData.append('file', uploadedImage);

    try {
        const response = await axios.post('http://localhost:5000/predict', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        setResult(response.data);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Pneumonia Detection from Chest X-rays
      </Typography>
      <Box mt={4}>
        <ImageDropZone onImageUpload={setUploadedImage} />
      </Box>
      {uploadedImage && (
        <Box mt={2} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={() => handleDetect()}>
            Detect
          </Button>
          {result && (
                <div>
                    <p>Prediction: {result.prediction}</p>
                    <p>Confidence: {result.confidence}</p>
                </div>
            )}
        </Box>
      )}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Or choose from preloaded images:
        </Typography>
        <PreloadedImageGallery onDetect={handleDetect} />
      </Box>
      {result.outcome && (
        <Box mt={4}>
          <ResultDisplay outcome={result.outcome} confidence={result.confidence} />
        </Box>
      )}
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '80px' }}>
        Beat the Model
      </Typography>
      <TryToBeatModel />
    </Container>
    
  );
}

export default App;
