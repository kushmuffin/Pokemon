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
      <h1>寶可夢招式</h1>
      <table>
        <thead>
            <tr>
              <th>招式</th>
              <th>說明</th>
            </tr>
          </thead>
        <tbody>
          {moves.map((move, index) => (
            <tr key={index}>
              <td>{move.name}</td>
              <td>{move.translatedEffect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Moves;