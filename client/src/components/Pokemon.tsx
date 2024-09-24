import useFetchPokemon from '../hooks/useFetchPokemon';

function Pokemon () {
    const { data: pokemon, loading, error } = useFetchPokemon();
    if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error}</div>;
    } else {
        console.log(pokemon)
        return (
            <div>Hello World</div>
        )
    }
    
}
  export default Pokemon;