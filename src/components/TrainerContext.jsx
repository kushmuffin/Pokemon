import React, { createContext, useState } from 'react';

export const TrainerContext = createContext();

export const TrainerProvider = ({ children }) => {
  const [addedPokemons, setAddedPokemons] = useState([]); // 確保初始值為空數組

  const addPokemon = (pokemon) => {
    setAddedPokemons([...addedPokemons, pokemon]);
  };

  return (
    <TrainerContext.Provider value={{ addedPokemons, addPokemon }}>
      {children}
    </TrainerContext.Provider>
  );
};
