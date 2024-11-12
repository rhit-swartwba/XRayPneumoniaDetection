from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows all origins to access all routes

@app.route('/predict', methods=['POST'])
def predict():
    print(request)
    print(request.files)
    if 'file' not in request.files:
        return make_response(jsonify({"error": "No file part in the request"}), 402)

    file = request.files['file']
    if file.filename == '':
        return make_response(jsonify({"error": "No selected file"}), 401)

    # Placeholder response for testing
    response = {
        "prediction": "This is a placeholder prediction",
        "confidence": "N/A"
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run()
