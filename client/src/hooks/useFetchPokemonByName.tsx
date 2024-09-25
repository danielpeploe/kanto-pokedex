import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon } from '../types';

const useFetchPokemonByName = (name: string) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        const fetchPokemonByName = async (): Promise<void> => {
            setLoading(true);
            setError(null);
      
            try {
                const res = await axios.get<Pokemon>(`http://localhost:8080/api/display?name=${name}`);
                
                if (res.status !== 200) {
                    throw new Error(`Error: ${res.status}`);
                }
                
                const data: Pokemon = res.data;
                setPokemon(data);
            } catch (err) {
                setError("Error fetching pokemon.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonByName();
    }, []);
  
    return { pokemon, loading, error };
};

export default useFetchPokemonByName;
