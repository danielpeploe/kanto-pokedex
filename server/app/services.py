import requests
import os
from dotenv import load_dotenv
from typing import Optional, Dict, Any, Union

# Load environment variables
load_dotenv()
POKEAPI_BASE_URL = os.getenv("POKEAPI_BASE_URL", "https://pokeapi.co/api/v2")

def fetch_pokemon(page: int, limit: int, search_string: str) -> Optional[Dict[str, Union[list, Dict[str, Union[int, Optional[int]]]]]]:
    """Fetch pokemon data with pagination."""
    # Calculate how many to skip
    offset = (page - 1) * limit

    if offset >= 151:
        return {
            "data": [],
            "pagination": {
                "page": page,
                "limit": limit,
                "total": 151,
                "next_page": None,
                "previous_page": None
            }
        }
    
    response = requests.get(f"{POKEAPI_BASE_URL}/pokemon/?limit={151}")

    if response.status_code == 200:
        pokemon_list = response.json()['results']

        # Nested function for handling search
        def handle_search():
            """Handles the search string and filters the pokemon list."""
            nonlocal pokemon_list

            if search_string.isdigit():
                if int(search_string) <= 151:
                    pokemon_list = [pokemon_list[int(search_string) - 1]]
            else:
                pokemon_list = [pokemon for pokemon in pokemon_list if search_string.lower() in pokemon["name"].lower()]

        if search_string != '':
            handle_search()

        pokemon_list = pokemon_list[offset:(page * 10)]
        pokemon_data = [detail for pokemon in pokemon_list if (detail := fetch_pokemon_details_by_name(pokemon['name']))]

        pagination_info = {
            "page": page,
            "limit": limit,
            "total": 151,
            "next_page": page + 1 if offset + limit < 151 else None,
            "previous_page": page - 1 if page > 1 else None
        }

        return {"data": pokemon_data, "pagination": pagination_info}
    else:
        return None

def fetch_pokemon_details_by_name(name: str) -> Optional[Dict[str, Any]]:
    """Fetch details of a pokemon by its name."""
    try:
        response = requests.get(f"{POKEAPI_BASE_URL}/pokemon/{name}")
        response.raise_for_status()  # Raise an error for bad responses
        data = response.json()
        
        # Check if the pokemon is from Kanto dex
        pokemon_id = data.get('id')
        if pokemon_id is None or pokemon_id > 151:
            return None
        
        pokemon_details = {
            "number": data['id'],
            "name": data['name'],
            "types": [t['type']['name'] for t in data['types']],
            "height": data['height'],
            "weight": data['weight'],
            "sprite": data['sprites']['front_default'],
            "abilities": [a['ability']['name'] for a in data['abilities']],
            "base_stats":  {stat['stat']['name']: stat['base_stat'] for stat in data['stats']}
        }
        return pokemon_details
    except requests.RequestException as e:
        print(f"Error fetching details for {name}: {e}")
        return None
