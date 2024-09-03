import React, { useEffect, useState } from 'react';
import { fetchAllMove } from './PokemonApi';

const Moves = () => {
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    const getMoves = async () => {
      const data = await fetchAllMove();
      setMoves(data);
    };
    getMoves();
  }, []);

  return (
    <div>
      <h1>所有寶可夢招式 (繁體中文)</h1>
      <ul>
        {moves.map((move, index) => (
          <li key={index}>
            {move.name}: {move.translatedEffect}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Moves;