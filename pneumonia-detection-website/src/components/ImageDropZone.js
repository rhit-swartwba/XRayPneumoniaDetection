import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Grid, Card, CardMedia, CardActions, Button, Modal } from '@mui/material';

function ImageDropZone({ onImageUpload, onDetect }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedImage(file);
      onImageUpload(file);
    }
  };

  useEffect(() => {
    if (uploadedImage) {
      const url = URL.createObjectURL(uploadedImage);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [uploadedImage]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <>
      <Box
        {...getRootProps()}
        border="2px dashed #4a4a4a"
        p={4}
        textAlign="center"
        bgcolor="#f9f9f9"
        borderRadius="8px"
      >
        <input {...getInputProps()} />
        <Typography variant="body1">
          Drag & drop an X-ray image here, or click to select a file
        </Typography>
      </Box>

      {uploadedImage && imageUrl && (
        <Box mt={4}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Uploaded Image"
                  height="200"
                  image={imageUrl}
                  title="Uploaded Image"
                />
                <CardActions>
                  <Button variant="contained" color="primary" onClick={() => onDetect(uploadedImage)}>
                    Detect
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={handleOpen}>
                    Expand
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Modal open={open} onClose={handleClose}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="rgba(0, 0, 0, 0.8)"
              position="fixed"
              top={0}
              left={0}
              width="100%"
              height="100%"
              zIndex={1300}
            >
              <img
                src={imageUrl}
                alt="Expanded Uploaded Image"
                style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: '8px' }}
              />
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
        </Box>
      )}
    </>
  );
}

export default ImageDropZone;
