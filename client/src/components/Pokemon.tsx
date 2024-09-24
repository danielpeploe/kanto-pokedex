import useFetchPokemon from '../hooks/useFetchPokemon';
import { useState } from 'react';
import '../App.css'
import { Pokemon} from '../types';


function PokemonList () {
    const [page, setPage] = useState<number>(1);
    const max = 10;

    const {pokemon, pagination, loading, error } = useFetchPokemon(page, max);

    const handleNextPage = () => {
        if (pagination?.next_page) {
          setPage(pagination.next_page);
        }
      };
    
      const handlePreviousPage = () => {
        if (pagination?.previous_page) {
          setPage(pagination.previous_page);
        }
      };
    
    if (loading) {
        return (
            <div>
                <h1>Kanto Pokémon</h1>
                <div>Loading...</div>
            </div>
            );
    } else if (error) {
        return <div>{error}</div>;
    } else {
        console.log(pokemon)
        return (
            <div>
                <h1>Kanto Pokémon</h1>
                <div className='pokemon-list'>
                    <ul className="pokemon-grid">
                        {pokemon.map((pokemon: Pokemon) => (
                            <li key={pokemon.number} className="pokemon-item">
                                <img src={pokemon.sprite} alt={pokemon.name} />
                                <h2>{pokemon.name} (#{pokemon.number})</h2>
                                <p>Types: {pokemon.types.join(', ')}</p>
                                <p>Height: {pokemon.height}</p>
                                <p>Weight: {pokemon.weight}</p>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <button onClick={handlePreviousPage} disabled={!pagination?.previous_page}>
                            Previous
                        </button>
                        <span> Page {pagination?.page} </span>
                        <button onClick={handleNextPage} disabled={!pagination?.next_page}>
                            Next
                        </button>
                    </div>
                </div>
            </div>

          );
    }
}

export default PokemonList;