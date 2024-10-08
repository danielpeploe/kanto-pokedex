import useFetchPokemon from '../hooks/useFetchPokemonList';
import { useState } from 'react';
import '../App.css'
import { Pokemon} from '../types';


function PokemonList () {
    const [page, setPage] = useState<number>(1);
    const max = 10;
    const [search, setSearch] = useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");

    const [sort, setSortOption] = useState<string>("number-asc");
    const [sortValue, setSortValue] = useState<string>("number-asc");

    const {pokemon, pagination, loading, error } = useFetchPokemon(page, max, search, sort);

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

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(inputValue);
        setSortOption(sortValue);
        setPage(1);

        console.log(sortValue);
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
        return (
            <div>
                <h1>Kanto Pokémon</h1>
                <div>
                    <form onSubmit={handleSearchSubmit}>
                    <select
                        value={sortValue}
                        onChange={(e) => setSortValue(e.target.value)}>
                        <option value="number-asc">{"Number (ASC)"}</option>
                        <option value="number-dsc">{"Number (DSC)"}</option>
                        <option value="alpha-asc">{"A - Z"}</option>
                        <option value="alpha-dsc">{"Z - A"}</option>
                    </select>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Search Pokémon..."
                        />
                        <button type="submit">Go</button>
                    </form>
                </div>

                <div className='pokemon-list'>
                    <ul className="pokemon-grid">
                        {pokemon.map((pokemon: Pokemon) => (
                            <button>
                                <a href={`/pokemon/${pokemon.name}`}>
                                    <li key={pokemon.number} className="pokemon-item">
                                        <img src={pokemon.sprite} alt={pokemon.name} />
                                        <h2>{pokemon.name} (#{pokemon.number})</h2>
                                        <p>Types: {pokemon.types.join(', ')}</p>
                                        <p>Height: {pokemon.height}</p>
                                        <p>Weight: {pokemon.weight}</p>
                                    </li>
                                </a>
                            </button>
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