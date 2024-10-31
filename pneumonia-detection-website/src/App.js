import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { Upload, ImageIcon, AlertCircle, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/alert.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './components/card.jsx';

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

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.includes('image/')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        setError(null);
      } else {
        setError('Please upload an image file');
      }
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate API call - replace with actual backend call
    setTimeout(() => {
      setResult({
        hasPneumonia: Math.random() > 0.5,
        confidence: (Math.random() * 20 + 80).toFixed(2)
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pneumonia Detection AI</h1>
          <p className="text-lg text-gray-600">Upload a chest X-ray image for instant pneumonia detection</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Upload X-Ray Image</CardTitle>
            <CardDescription>
              Supported formats: JPEG, PNG. For best results, use clear chest X-ray images.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div 
                className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
                onClick={() => document.getElementById('file-upload').click()}
              >
                {preview ? (
                  <img 
                    src={preview} 
                    alt="X-Ray preview" 
                    className="max-h-96 mx-auto"
                  />
                ) : (
                  <div className="space-y-4">
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
                    <div>
                      <p className="text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">SVG, PNG, JPG (max. 10MB)</p>
                    </div>
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept="image/*"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  !selectedFile || isAnalyzing
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Analyze Image
                  </span>
                )}
              </button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant={result.hasPneumonia ? "destructive" : "default"}>
                <div className="flex items-center gap-2">
                  {result.hasPneumonia ? (
                    <AlertCircle className="h-5 w-5" />
                  ) : (
                    <Check className="h-5 w-5" />
                  )}
                  <AlertTitle>
                    {result.hasPneumonia ? "Pneumonia Detected" : "No Pneumonia Detected"}
                  </AlertTitle>
                </div>
                <AlertDescription className="mt-2">
                  Confidence: {result.confidence}%
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default App;
