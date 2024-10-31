import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';

function ImageDropZone({ onImageUpload }) {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onImageUpload(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
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
  );
}

export default ImageDropZone;
