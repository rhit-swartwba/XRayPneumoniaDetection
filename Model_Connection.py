import torch
from torchvision import models, transforms
from PIL import Image
from flask import Flask, request, jsonify

# Initialize the Flask app
app = Flask(__name__)

# Define and load the model architecture
#model = models.resnet50(pretrained=False)
#model.fc = torch.nn.Linear(model.fc.in_features, 2)  # Assuming binary classification (pneumonia vs. no pneumonia)

# Load the state dictionary into the model
#model.load_state_dict(torch.load("./resnet50_pneumonia.pth"))
#model.eval()

# Define image preprocessing
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
])

# Define prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    image = Image.open(file.stream).convert('RGB')
    
    # Apply preprocessing
    input_tensor = preprocess(image).unsqueeze(0)
    
    # Perform prediction
    #with torch.no_grad():
        #output = model(input_tensor)
    #prediction = torch.argmax(output, dim=1).item()
    #confidence = torch.nn.functional.softmax(output, dim=1).max().item()
    prediction = "definitely pneumonia"
    confidence = 90
    
    # Return prediction result as JSON
    return jsonify({'prediction': prediction, 'confidence': confidence})

# Run the app on localhost:5000
if __name__ == '__main__':
    app.run(debug=True)
