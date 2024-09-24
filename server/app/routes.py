from flask import Blueprint, jsonify

main = Blueprint('main', __name__)

@main.route("/api/pokemon", methods=['GET'])
def pokemon():
    return jsonify(
        {
            "pokemon": [
                'Charmander', 
                'Bulbasaur', 
                'Squirtle'
            ]
        }
    )