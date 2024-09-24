import requests
import os
from dotenv import load_dotenv
from typing import Optional, Dict, Any, Union

# Load environment variables
# Using .env for good practice even though it's unnecessary for this pokeapi
load_dotenv()
POKEAPI_BASE_URL = os.getenv("POKEAPI_BASE_URL", "https://pokeapi.co/api/v2")

def fetch_pokemon(page: int, limit: int) -> Optional[Dict[str, Union[list, Dict[str, Union[int, Optional[int]]]]]]:
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

    response = requests.get(f"{POKEAPI_BASE_URL}/pokemon/?offset={offset}&limit={limit}")

    if response.status_code == 200:
        pokemon_list = response.json()['results']
        pokemon_data = [detail for pokemon in pokemon_list if (detail := fetch_pokemon_details_by_url(pokemon['url']))]

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

def fetch_pokemon_details_by_url(url: str) -> Optional[Dict[str, Any]]:
    """Fetch details of a pokemon by its URL."""
    try:
        response = requests.get(url)
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
            "sprite": data['sprites']['front_default']
        }
        return pokemon_details
    except requests.RequestException as e:
        print(f"Error fetching details for {url}: {e}")
        return None
