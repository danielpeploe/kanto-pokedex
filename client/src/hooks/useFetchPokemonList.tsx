import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon, Pagination, PokemonResponse } from '../types';

const useFetchPokemon = (page: number, max: number, search: string) => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        const fetchPokemon = async (): Promise<void> => {
            setLoading(true);
            setError(null);
      
            try {
                const res = await axios.get<PokemonResponse>(`http://localhost:8080/api/pokemon?page=${page}&limit=${max}&search=${search}`);
                
                if (res.status !== 200) {
                    throw new Error(`Error: ${res.status}`);
                }
                
                const data: PokemonResponse = res.data;
                setPokemon(data.data);
                setPagination(data.pagination);
            } catch (err) {
                setError("Error fetching pokemon.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [page, max, search]);
  
    return { pokemon, pagination, loading, error };
};

export default useFetchPokemon;
