import { useEffect, useState } from 'react';
import axios from 'axios';
import Pokemon from '../types';

const useFetchPokemon = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchPokemon = async (): Promise<void> => {
        setLoading(true);
        setError(null);
  
        try {
            const res = await axios.get<Pokemon>('http://localhost:8080/api/pokemon');
            setData(res.data.pokemon);
        } catch (err) {
            setError("Error fetching Pokémon.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
  
    useEffect(() => {
      fetchPokemon();
    }, []);
  
    return { data, loading, error };
};
export default useFetchPokemon;