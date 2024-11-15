import React, { useState } from 'react';
import { Modal, Typography, Button, Box } from '@mui/material';

function ResultDisplay({ prediction, confidence, openModal, setOpenModal }) {
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.paper"
        borderRadius={2}
        p={4}
        m={2}
        boxShadow={24}
        maxWidth={500} // Limits the width of the modal box
        mx="auto" // Centers the box horizontally
      >
        <Typography variant="h6" gutterBottom>
          Detection Result
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Outcome:</strong> {prediction}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Confidence:</strong> {confidence}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCloseModal}
          sx={{ mt: 3 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default ResultDisplay;
