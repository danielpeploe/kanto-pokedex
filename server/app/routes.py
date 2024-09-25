from flask import Blueprint, jsonify, request
from .services import fetch_pokemon, fetch_pokemon_details_by_name
from typing import Union, Dict, Any

main = Blueprint('main', __name__)

@main.route("/api/pokemon", methods=['GET'])
def pokemon() -> Union[Dict[str, Any], tuple[Dict[str, Any], int]]:
    # Get the page and limit parameters from the query string
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
    except ValueError:
        return jsonify({"error": "Invalid page or limit parameter"}), 400

    # Fetch pokemon data and handle response
    pokemon_data = fetch_pokemon(page, limit)

    if pokemon_data is not None:
        return jsonify(pokemon_data), 200
    else:
        return jsonify({"error": "Failed to fetch data from API"}), 500
    

@main.route("/api/display", methods=['GET'])
def display_pokemon():
    # Get the name parameter from the query string
    try:
        name = str(request.args.get('name', ''))
    except ValueError:
        return jsonify({"error": "Invalid page or limit parameter"}), 400
    
    pokemon_data = fetch_pokemon_details_by_name(name)
    
    return jsonify(pokemon_data), 200