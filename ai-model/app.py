from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model
model = joblib.load('model/ensemble_offerPrice.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_values = list(data.values())
        input_array = np.array([input_values])
        prediction = model.predict(input_array)[0]
        return jsonify({'prediction': float(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5001, debug=True)
