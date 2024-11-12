from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import torch
from torchvision import transforms
from PIL import Image
import io

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # This allows all origins to access all routes

# Load the trained PyTorch model
model = torch.load('path/to/your/saved_model.pth')
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
            predicted_class = output.argmax(dim=1).item()  # Get the class index with the highest probability

        # Placeholder for confidence or detailed response (modify as needed)
        response = {
            "prediction": predicted_class,
            "confidence": "Confidence value can be added here if needed"
        }

        return jsonify(response)

    except Exception as e:
        return make_response(jsonify({"error": str(e)}), 500)

if __name__ == '__main__':
    app.run()
