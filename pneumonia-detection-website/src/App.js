import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardMedia, CardActions } from '@mui/material';
import ImageDropZone from './components/ImageDropZone.js';
import PreloadedImageGallery from './components/PreloadedImageGallery.js';
import ResultDisplay from './components/ResultDisplay.js';
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

  const handleDetect = (image) => {
    // Here, you would normally send the image to the model
    // For now, mock the outcome and confidence level
    setResult({ outcome: 'Pneumonia Detected', confidence: '90%' });
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
          <Button variant="contained" color="primary" onClick={() => handleDetect(uploadedImage)}>
            Detect
          </Button>
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
    </Container>
  );
}

export default App;
