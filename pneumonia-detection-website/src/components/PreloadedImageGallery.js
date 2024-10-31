import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardActions, Button, Modal, Box } from '@mui/material';

const preloadedImages = [
  '/X-Ray-1.jfif',
  '/X-Ray-2.jfif',
  '/X-Ray-3.jfif',
  '/X-Ray-4.jfif'
];

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1300,
};

const imageStyle = {
  maxWidth: '90%',
  maxHeight: '90%',
  objectFit: 'contain',
  borderRadius: '8px',
};

function PreloadedImageGallery({ onDetect }) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Grid container spacing={2}>
        {preloadedImages.map((img, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                image={img}
                alt={`Preloaded X-ray ${index + 1}`}
                style={{
                  objectFit: 'contain',
                  height: 200,
                  width: '100%'
                }}
              />
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => onDetect(img)}
                >
                  Detect
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => handleOpen(img)}
                >
                  Expand
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <img src={selectedImage} alt="Expanded X-ray" style={imageStyle} />
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
            style={{ position: 'absolute', top: 20, right: 20 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default PreloadedImageGallery;
