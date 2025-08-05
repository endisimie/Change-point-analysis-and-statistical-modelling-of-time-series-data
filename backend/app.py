from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
# Explicitly allow all origins for development. In production, you'd specify your frontend's domain.
CORS(app, resources={r"/api/*": {"origins": "*"}}) 

# --- Mock Data Generation (simulating results from previous tasks) ---
def generate_mock_data():
    """Generates mock historical data and analysis results."""
    
    # Generate historical price data
    start_date = '2014-01-01'
    end_date = '2023-12-31'
    date_range = pd.date_range(start=start_date, end=end_date)
    
    # Create a base price series with a general trend
    base_price = 80 + 0.01 * np.arange(len(date_range)) + np.random.randn(len(date_range)) * 2
    
    # Simulate a significant drop (change point)
    change_point_date = '2018-05-01'
    change_point_index = date_range.get_loc(change_point_date)
    before_change = base_price[:change_point_index]
    after_change = 40 + 0.02 * np.arange(len(date_range) - change_point_index) + np.random.randn(len(date_range) - change_point_index) * 3
    
    prices = np.concatenate([before_change, after_change])
    
    # Generate the DataFrame
    df = pd.DataFrame({
        'Date': date_range.strftime('%Y-%m-%d'),
        'Price': prices
    })
    
    # Generate mock events data
    events = [
        {'date': '2014-06-01', 'type': 'OPEC Policy', 'description': 'OPEC maintains production levels, leading to a major price collapse.'},
        {'date': '2016-01-20', 'type': 'Market Shock', 'description': 'Brent crude prices hit a 12-year low.'},
        {'date': '2018-05-08', 'type': 'Political Decision', 'description': 'U.S. withdraws from Iran nuclear deal.'},
        {'date': '2020-03-01', 'type': 'Economic Shock', 'description': 'COVID-19 pandemic and Saudi-Russia price war begins.'},
        {'date': '2022-02-24', 'type': 'Conflict', 'description': 'Russian invasion of Ukraine.'},
    ]

    # Generate mock analysis results
    analysis_results = {
        'change_point_date': change_point_date,
        'before': {
            'mean_price': float(np.mean(prices[:change_point_index])),
            'volatility': float(np.std(prices[:change_point_index]))
        },
        'after': {
            'mean_price': float(np.mean(prices[change_point_index:])),
            'volatility': float(np.std(prices[change_point_index:]))
        }
    }
    
    return df.to_dict('records'), events, analysis_results

# Load the mock data once on startup
data, events, analysis_results = generate_mock_data()

# Add a new route for the root URL
@app.route('/', methods=['GET'])
def home():
    """Returns a welcome message for the root URL."""
    return "<h1>Flask API is running!</h1><p>Navigate to /api/data or /api/analysis to see the data.</p>"

@app.route('/api/data', methods=['GET'])
def get_data():
    """Endpoint to serve historical price data and events."""
    return jsonify({
        'prices': data,
        'events': events
    })

@app.route('/api/analysis', methods=['GET'])
def get_analysis_results():
    """Endpoint to serve the change point analysis results."""
    return jsonify(analysis_results)

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, port=5000)
