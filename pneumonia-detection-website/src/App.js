import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardMedia, CardActions, Modal } from '@mui/material';
import axios from 'axios';
import ImageDropZone from './components/ImageDropZone.js';
import PreloadedImageGallery from './components/PreloadedImageGallery.js';
import ResultDisplay from './components/ResultDisplay.js';
import TryToBeatModel from './components/TryToBeatModel';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDB2-lTlTMqkDCmbq5oXHo7wcS5FooeM_g",
  authDomain: "xraypneumoniadetection.firebaseapp.com",
  projectId: "xraypneumoniadetection",
  storageBucket: "xraypneumoniadetection.appspot.com",
  messagingSenderId: "264302956589",
  appId: "1:264302956589:web:8b7524432b79e7e25368a4",
  measurementId: "G-PM90EEEC7Y"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [result, setResult] = useState({ prediction: '', confidence: '' });
  const [openModal, setOpenModal] = useState(false);

  const handleDetect = async (imageSource = uploadedImage) => {
    const formData = new FormData();
    try {
      if (imageSource instanceof File) {
        formData.append('file', imageSource);
      } else {
        const response = await fetch(imageSource);
        const blob = await response.blob();
        formData.append('file', blob, 'preloaded-image.jpg');
      }

      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      let { prediction, confidence } = response.data;
      if (prediction === 1) {
        prediction = 'bacterial pneumonia';
      } else if (prediction === 2) {
        prediction = 'viral pneumonia';
      } else if (prediction === 0) {
        prediction = 'healthy';
      }
      confidence = (confidence * 100) + '%';
      setResult({ prediction, confidence });
      setOpenModal(true);
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
        <ImageDropZone onImageUpload={(file) => setUploadedImage(file)} onDetect={(image) => handleDetect(image)} />
      </Box>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Or choose from preloaded images:
        </Typography>
        <PreloadedImageGallery onDetect={(imagePath) => handleDetect(imagePath)} />
      </Box>
      <ResultDisplay prediction={result.prediction} 
                     confidence={result.confidence} 
                     openModal={openModal}
                     setOpenModal={setOpenModal}/>
      <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '80px' }}>
        Beat the Model
      </Typography>
      <TryToBeatModel />
    </Container>
  );
}

export default App;
