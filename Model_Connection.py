from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import torch
from torchvision import transforms, models
from PIL import Image
import io
import torch.nn as nn

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # This allows all origins to access all routes

# Load the trained PyTorch model
model = models.resnet50(pretrained=False)  # Replace with your model architecture
num_ftrs = model.fc.in_features
model.fc = nn.Sequential(
    nn.Dropout(p=0.5),  # Dropout layer for regularization
    nn.Linear(num_ftrs, 2)  # Binary classification layer
)
# Load the model's state_dict and map to the correct device (CPU/GPU)
model.load_state_dict(torch.load('resnet50_pneumonia.pth'), strict=False)
model.eval()  # Set the model to evaluation mode

# Define image preprocessing transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Adjust this size based on your model's input requirements
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Standard ImageNet normalization
])

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return make_response(jsonify({"error": "No file part in the request"}), 400)

    file = request.files['file']
    if file.filename == '':
        return make_response(jsonify({"error": "No selected file"}), 400)

    try:
        # Read the image file as a PIL image
        image = Image.open(io.BytesIO(file.read())).convert('RGB')

        # Preprocess the image
        image_tensor = transform(image).unsqueeze(0)  # Add batch dimension

        # Run the model for prediction
        with torch.no_grad():  # Disable gradient calculation for inference
            output = model(image_tensor)
            print(output)
            
            # For binary classification, output contains logits for two classes
            probabilities = torch.softmax(output, dim=1)
            predicted_class = torch.argmax(probabilities, dim=1).item()  # Get the predicted class index
            confidence = probabilities[0, predicted_class].item()  # Confidence score of the predicted class

        response = {
            "prediction": predicted_class,  # 0 or 1 for binary classification
            "confidence": f"{confidence:.2f}"  # Confidence value as a percentage
        }

        return jsonify(response)

    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 500)

if __name__ == '__main__':
    app.run()
