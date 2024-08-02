# File: api.py (Place this in the root directory of your project)

from flask import Flask, request, jsonify
from flask_cors import CORS
from rag_pipeline import answer_query

app = Flask(__name__)
CORS(app)

@app.route('/api/query', methods=['POST'])
def process_query():
    data = request.json
    query = data.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400
    
    try:
        answer = answer_query(query)
        return jsonify({'answer': answer})
    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True, port=5000)