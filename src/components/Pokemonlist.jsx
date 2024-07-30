import React, { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from './Api'; // 假設 api 文件名為 api.js

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    const getPokemonList = async () => {
      try {
        const data = await fetchPokemonList();
        setPokemonList(data);
        console.log('Pokemon list fetched:', data);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };
    getPokemonList();
  }, []);

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const details = await Promise.all(
          pokemonList.map(pokemon => fetchPokemonDetails(pokemon.url))
        );
        setPokemonDetails(details);
        console.log('Pokemon details fetched:', details);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };
    if (pokemonList.length > 0) {
      getPokemonDetails();
    }
  }, [pokemonList]);

  const generations = {
    1: { start: 0, end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const totalPages = Object.keys(generations).length;
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button key={i} onClick={() => handlePageChange(i)}>
          {i}
        </button>
      );
    }
    return <div>{buttons}</div>;
  };

  const filteredPokemonList = pokemonDetails.slice(generations[currentPage].start, generations[currentPage].end);

  return (
    <div>
      <h1>Pokemon List</h1>
      {renderPagination()}
      {filteredPokemonList.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>編號</th>
              <th>圖片</th>
              <th>名稱</th>
              <th>身高</th>
              <th>體重</th>
              <th>基礎經驗值</th>
            </tr>
          </thead>
          <tbody>
            {filteredPokemonList.map((pokemon, index) => (
              <tr key={pokemon.id}>
                <td>{pokemon.id}</td>
                <td>{pokemon.sprites?.front_default ? (
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  ) : (
                    'No image'
                  )}</td>
                <td>{pokemon.name}</td>
                <td>{pokemon.height}</td>
                <td>{pokemon.weight}</td>
                <td>{pokemon.base_experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PokemonList;
