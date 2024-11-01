import React, { useState } from 'react';
import { Grid, Button, Box, Modal, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// Sample preloaded images (you can add more or update paths as needed)
const preloadedImages = [
  '/X-Ray-1.jfif',
  '/X-Ray-2.jfif',
  '/X-Ray-3.jfif',
  '/X-Ray-4.jfif'
];

function TryToBeatModel() {
  const [numImages, setNumImages] = useState(5);
  const [open, setOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userGuesses, setUserGuesses] = useState([]);
  const [modelResults, setModelResults] = useState([]);
  const [userChoice, setUserChoice] = useState(null);

  const handleNumImagesChange = (event) => {
    setNumImages(event.target.value);
  };

  const handleStart = () => {
    setCurrentImageIndex(0);
    setUserGuesses([]);
    setModelResults([]);
    setOpen(true);
  };

  const handleUserChoice = (choice) => {
    setUserChoice(choice);
  };

  const handleRunModel = () => {
    const modelPrediction = Math.random() > 0.5 ? 'pneumonia' : 'healthy'; // Placeholder for model prediction logic
    setModelResults([...modelResults, modelPrediction]);
  };

  const handleNextImage = () => {
    setUserGuesses([...userGuesses, userChoice]);
    setUserChoice(null);
    if (currentImageIndex < numImages - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setOpen(false);
      // Here you could trigger a final results display if needed
      alert(`Game Over! You guessed ${userGuesses.length} images.`);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setUserGuesses([]);
    setModelResults([]);
    setUserChoice(null);
  };

  return (
    <div>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <Button variant="contained" color="primary" onClick={handleStart}>
          Try to Beat the Model
        </Button>
        <FormControl variant="outlined" style={{ marginLeft: '16px' }}>
          <InputLabel>Number of Images</InputLabel>
          <Select value={numImages} onChange={handleNumImagesChange} label="Number of Images">
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Typography variant="body1">
        Try to beat the model by guessing "pneumonia" or "healthy" for each image.
      </Typography>

      <Modal open={open} onClose={handleClose}>
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
            maxWidth: '600px', // Limit the width of the modal
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: 'auto', // Allow scrolling if content overflows vertically
            }}
        >
            <img
            src={preloadedImages[currentImageIndex % preloadedImages.length]} // Loop through images
            alt="X-ray"
            style={{
                maxWidth: '100%',
                maxHeight: '80vh', // Ensure image does not exceed 80% of viewport height
                objectFit: 'contain',
                borderRadius: '8px',
                marginBottom: '16px',
            }}
            />
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
          {modelResults.length > currentImageIndex && (
            <Button variant="contained" color="primary" onClick={handleNextImage}>
              {currentImageIndex < numImages - 1 ? 'Next' : 'See Results'}
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default TryToBeatModel;
