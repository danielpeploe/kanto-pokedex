from flask import Flask, jsonify
from flask_cors import CORS

def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app, origins='*')
    
    # Import routes
    from .routes import main
    app.register_blueprint(main)
    return app