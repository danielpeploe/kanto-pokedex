import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import unittest
from unittest.mock import patch
from flask import Flask
from app import create_app

class TestPokemonAPI(unittest.TestCase):

    def setUp(self):
        """Set up the test client"""
        self.app = create_app()
        self.client = self.app.test_client()
        self.app.testing = True 

    @patch('app.services.fetch_pokemon')
    def test_pokemon_success(self, mock_fetch_pokemon):
        """Test the pokemon endpoint with valid data."""
        mock_data = {
            "data": [
                {"number": 1, "name": "bulbasaur", "types": ["grass", "poison"], "height": 7, "weight": 69, "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"}
            ],
            "pagination": {"page": 1, "limit": 1, "total": 151, "next_page": 2, "previous_page": None}
        }
        mock_fetch_pokemon.return_value = mock_data
        response = self.client.get('/api/pokemon?page=1&limit=1')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, mock_data)

    def test_invalid_page_param(self):
        """Test the pokemon endpoint with an invalid page parameter."""
        response = self.client.get('/api/pokemon?page=invalid&limit=10')

        self.assertEqual(response.status_code, 400)

    def test_page_out_of_bounds(self):
        """Test the pokemon endpoint with a page number"""
        with patch('app.services.fetch_pokemon') as mock_fetch_pokemon:
            mock_fetch_pokemon.return_value = {
                "data": [],
                "pagination": {"page": 100, "limit": 10, "total": 151, "next_page": None, "previous_page": 99}
            }
            response = self.client.get('/api/pokemon?page=100&limit=10')

            # Assert a 200 response but with empty data
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json['data'], [])

if __name__ == "__main__":
    unittest.main()
