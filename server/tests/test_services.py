import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app.services import fetch_pokemon, fetch_pokemon_details_by_name
from unittest.mock import patch, Mock

import requests


# Mock test data
mock_pokemon_response = {
    "id": 1,
    "name": "bulbasaur",
    "types": [{"type": {"name": "grass"}}, {"type": {"name": "poison"}}],
    "height": 7,
    "weight": 69,
    "sprites": {"front_default": "https://pokeapi.co/media/sprites/pokemon/1.png"},
}

mock_pokemon_list_response = {
    "results": [
        {"url": "https://pokeapi.co/api/v2/pokemon/1/"},
        {"url": "https://pokeapi.co/api/v2/pokemon/2/"}
    ]
}

def test_fetch_pokemon_details_by_name_success(mocker):
    mocker.patch('requests.get', return_value=Mock(status_code=200, json=lambda: mock_pokemon_response))

    result = fetch_pokemon_details_by_name("bulbasaur")
    
    assert result is not None
    assert result["number"] == 1
    assert result["name"] == "bulbasaur"
    assert result["types"] == ["grass", "poison"]
    assert result["height"] == 7
    assert result["weight"] == 69
    assert result["sprite"] == "https://pokeapi.co/media/sprites/pokemon/1.png"

def test_fetch_pokemon_details_by_name_not_found(mocker):
    mock_response = Mock(status_code=404)
    mock_response.json.return_value = {}
    mocker.patch('requests.get', return_value=mock_response)

    result = fetch_pokemon_details_by_name("https://pokeapi.co/api/v2/pokemon/00000/")
    
    assert result is None

def test_fetch_pokemon_details_by_name_invalid(mocker):
    mocker.patch('requests.get', side_effect=requests.exceptions.RequestException)

    result = fetch_pokemon_details_by_name("https://pokeapi.co/api/v2/pokemon/1/")
    
    assert result is None


def test_fetch_pokemon_success(mocker):
    mocker.patch('requests.get', side_effect=[
        Mock(status_code=200, json=lambda: mock_pokemon_list_response),
        Mock(status_code=200, json=lambda: mock_pokemon_response),
        Mock(status_code=200, json=lambda: mock_pokemon_response)
    ])

    result = fetch_pokemon(1, 2)

    assert result is not None
    assert len(result["data"]) == 2
    assert result["pagination"]["page"] == 1
    assert result["pagination"]["limit"] == 2
    assert result["pagination"]["total"] == 151
    assert result["pagination"]["next_page"] == 2
    assert result["pagination"]["previous_page"] is None

def test_fetch_pokemon_no_results(mocker):
    mock_response = Mock(status_code=200)
    mock_response.json.return_value = {"results": []}
    mocker.patch('requests.get', return_value=mock_response)

    result = fetch_pokemon(2, 10)

    assert result is not None
    assert len(result["data"]) == 0


def test_fetch_pokemon_api_error(mocker):
    mocker.patch('requests.get', return_value=Mock(status_code=500))

    result = fetch_pokemon(1, 10)

    assert result is None
