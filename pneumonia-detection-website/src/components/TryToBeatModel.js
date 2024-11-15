import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, Modal, Typography } from '@mui/material';
import axios from 'axios';

// Define paths for images stored in the public folder
const normalImages = Array.from({ length: 10 }, (_, i) => `/normal/normal-${i + 1}.jpeg`);
const pneumoniaImages = Array.from({ length: 10 }, (_, i) => `/pneumonia/pneumonia-${i + 1}.jpeg`);

function TryToBeatModel() {
  const [numImages, setNumImages] = useState(5);
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userGuesses, setUserGuesses] = useState([]);
  const [modelResults, setModelResults] = useState([]);
  const [userChoice, setUserChoice] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageSourceLabels, setImageSourceLabels] = useState([]);
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (open) {
      // Randomly select images from the normal and pneumonia folders
      const combinedImages = [];
      const labels = [];

      for (let i = 0; i < numImages; i++) {
        if (Math.random() < 0.5 && normalImages.length > 0) {
          const randomIndex = Math.floor(Math.random() * normalImages.length);
          // Remove the selected image from normalImages to prevent duplicates
          const image = normalImages.splice(randomIndex, 1)[0];
          combinedImages.push(image);
          labels.push('healthy');
        } else if (pneumoniaImages.length > 0) {
          const randomIndex = Math.floor(Math.random() * pneumoniaImages.length);
          // Remove the selected image from pneumoniaImages to prevent duplicates
          const image = pneumoniaImages.splice(randomIndex, 1)[0];
          combinedImages.push(image);
          labels.push('pneumonia');
        }
      }
      setSelectedImages(combinedImages);
      setImageSourceLabels(labels);
    }
  }, [open, numImages]);

  const handleStart = () => {
    setCurrentImageIndex(0);
    setUserGuesses([]);
    setModelResults([]);
    setShowFinalResults(false);
    setShowResult(false);
    setOpen(true);
  };

  const handleUserChoice = (choice) => {
    setUserChoice(choice);
  };

  const handleRunModel = async () => {
    const formData = new FormData();
    const imageSource = selectedImages[currentImageIndex];
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
      if (prediction > 0) {
        prediction = 'pneumonia';
      } else {
        prediction = 'healthy';
      }
      setModelResults([...modelResults, prediction]);
      setShowResult(true);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleNextImage = () => {
    setUserGuesses([...userGuesses, userChoice]);
    setUserChoice(null);
    if (currentImageIndex < numImages - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      
      console.log("Change to false now");
      setShowResult(false);
    } else {
      setShowFinalResults(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setUserGuesses([]);
    setModelResults([]);
    setUserChoice(null);
    setSelectedImages([]);
    setImageSourceLabels([]);
  };

  const renderFinalResults = () => {
    const correctUserGuesses = userGuesses.filter((guess, index) => guess === imageSourceLabels[index]).length;
    const correctModelGuesses = modelResults.filter((result, index) => result === imageSourceLabels[index]).length;

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '600px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>Game Over</Typography>
        <Typography variant="h6" gutterBottom>
          User Correct Guesses: {correctUserGuesses} / {numImages}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Model Correct Guesses: {correctModelGuesses} / {numImages}
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <div>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <Button variant="contained" color="primary" onClick={handleStart}>
          Try to Beat the Model
        </Button>
      </Box>
      <Typography variant="body1">
        Try to beat the model by guessing "pneumonia" or "healthy" for each image.
      </Typography>

      <Modal open={open} onClose={handleClose}>
        {showFinalResults ? (
          renderFinalResults()
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '600px',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              overflowY: 'auto',
            }}
          >
            {selectedImages.length > 0 && (
              <img
                src={selectedImages[currentImageIndex]}
                alt="X-ray"
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}
              />
            )}
            <Box display="flex" justifyContent="center" mb={2}>
              <Button
                variant={userChoice === 'pneumonia' ? 'contained' : 'outlined'}
                color="error"
                onClick={() => handleUserChoice('pneumonia')}
                sx={{ marginRight: '8px' }}
              >
                Pneumonia
              </Button>
              <Button
                variant={userChoice === 'healthy' ? 'contained' : 'outlined'}
                color="success"
                onClick={() => handleUserChoice('healthy')}
              >
                Healthy
              </Button>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRunModel}
              disabled={!userChoice}
              sx={{ marginBottom: '16px' }}
            >
              Run the Model
            </Button>
            {modelResults[currentImageIndex] && (
              <Typography variant="h6" color="textSecondary">
                Model Prediction: {modelResults[currentImageIndex]}
              </Typography>
            )}
            {showResult && imageSourceLabels[currentImageIndex] && (
              <Typography variant="h6" color="textSecondary">
                Actual Result: {imageSourceLabels[currentImageIndex]}
              </Typography>
            )}
            {modelResults.length > currentImageIndex && (
              <Button variant="contained" color="primary" onClick={handleNextImage}>
                {currentImageIndex < numImages - 1 ? 'Next' : 'See Results'}
              </Button>
            )}
          </Box>
        )}
      </Modal>
    </div>
  );
}

export default TryToBeatModel;
