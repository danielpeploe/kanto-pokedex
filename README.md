# Kanto Pokedex

A Kanto Pokedex web application utlising React for client and Flask for the server. Consumes the PokéAPI.

https://pokeapi.co/docs/v2

## How to run

### Prerequisites

- Node.js
- npm
- Python

### Setup

1. Create venv:
   ```sh
   python -m venv venv
   ```
2. Activate the virtual environment:
   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```
3. Install the dependencies:
   ```sh
   pip install -r requirements.txt
   ```

### Run Server

1. Navigate to server dir:
   ```sh
   cd server
   ```
2. Run:
   - App:
     ```sh
     python run.py
     ```
   - Tests:
     ```sh
     cd tests
     pytest
     ```

### Run Client

1. Navigate to server dir:
   ```sh
   cd client
   ```
1. Install dependencies:
   ```sh
   npm install
   ```
1. Start dev server:
   ```sh
   npm run dev
   ```
