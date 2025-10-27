from flask import Flask, jsonify, request
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)

@app.route('/api/get_location_names')
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    return response

@app.route('/api/predict_home_price', methods=['POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.get_estimate_price(location, total_sqft, bath, bhk)
    })
    return response

if __name__ == '__main__':
    print("Starting the server...")
    util.load_saved_artifacts()
    app.run(debug=True)
