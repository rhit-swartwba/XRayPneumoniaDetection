import React from 'react';
import { Box, Typography } from '@mui/material';

function ResultDisplay({ outcome, confidence }) {
  return (
    <Box textAlign="center" p={3} bgcolor="#e0f7fa" borderRadius="8px">
      <Typography variant="h6">Detection Result</Typography>
      <Typography variant="body1">Outcome: {outcome}</Typography>
      <Typography variant="body1">Confidence: {confidence}</Typography>
    </Box>
  );
}

export default ResultDisplay;
