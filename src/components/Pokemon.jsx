// src/Pokemon.jsx
import React, { useEffect, useState } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from './Api';

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemonData = async () => {
      try {
        const list = await fetchPokemonList();
        const detailsPromises = list.map(pokemon => fetchPokemonDetails(pokemon.url));
        const details = await Promise.all(detailsPromises);
        setPokemonList(details);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        setLoading(false);
      }
    };

    getPokemonData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Base Experience</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.id}</td>
              <td><img src={pokemon.sprites.front_default} /></td>
              <td>{pokemon.name}</td>
              <td>{pokemon.height}</td>
              <td>{pokemon.weight}</td>
              <td>{pokemon.base_experience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pokemon;
