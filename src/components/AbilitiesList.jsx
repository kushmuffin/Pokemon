import React, { useEffect, useState } from 'react';
import { fetchAllAbilities } from './PokemonApi';

const Abilities = () => {
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const getAbilities = async () => {
      const data = await fetchAllAbilities();
      setAbilities(data);
    };
    getAbilities();
  }, []);

  return (
    <div>
      <h1>所有寶可夢特性 (繁體中文)</h1>
      <ul>
        {abilities.map((ability, index) => (
          <li key={index}>
            {ability.name}: {ability.translatedEffect}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Abilities;