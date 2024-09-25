import useFetchPokemonByName from '../hooks/useFetchPokemonByName';
import { useParams } from 'react-router-dom';
import '../App.css'


function PokemonDisplay() {
    const { name } = useParams();

    const { pokemon, loading, error } = useFetchPokemonByName(name || '');
  
    if (loading) {
        return (
            <div>
                <h1>Display Pokémon</h1>
                <div>Loading...</div>
            </div>
            );
    } else if (error) {
        return <div>{error}</div>;
    } else {
        if (!pokemon) {
            return <div>Pokémon not found.</div>;
        }
        return (
            <div>
                <h1>Display Pokémon</h1>
                <button>
                    <a href={`/pokemon/`}>Home</a>
                </button>
                <ul className="pokemon-grid">
                    <li key={pokemon.number} className="pokemon-item">
                        <img src={pokemon.sprite} alt={pokemon.name} />
                        <h2>{pokemon.name} (#{pokemon.number})</h2>
                        <p>Types: {pokemon.types.join(', ')}</p>
                        <p>Height: {pokemon.height}</p>
                        <p>Weight: {pokemon.weight}</p>
                        <p>Abilities: {pokemon.abilities.join(', ')}</p>
                    </li>
                </ul>
                <div className="pokemon-stats">
                    <h2>Base Stats</h2>
                    <ul>
                    <li>HP: {pokemon.base_stats.hp}</li>
                    <li>Attack: {pokemon.base_stats.attack}</li>
                    <li>Defense: {pokemon.base_stats.defense}</li>
                    <li>Special Attack: {pokemon.base_stats['special-attack']}</li>
                    <li>Special Defense: {pokemon.base_stats['special-defense']}</li>
                    <li>Speed: {pokemon.base_stats.speed}</li>
                    </ul>
                </div>
            </div>
          );
    }
  }

export default PokemonDisplay;