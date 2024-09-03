import React, { createContext, useState } from 'react';

export const TrainerContext = createContext();

export const TrainerProvider = ({ children }) => {
  const [trainerData, setTrainerData] = useState(() => {
    const storedData = localStorage.getItem('trainerData');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [addedPokemons, setAddedPokemons] = useState([]);

  const addTrainer = (trainer) => {
    const updatedTrainerData = [...trainerData, trainer];
    setTrainerData(updatedTrainerData);
    localStorage.setItem('trainerData', JSON.stringify(updatedTrainerData));
    setAddedPokemons([]);
  };

  const addPokemon = (pokemon) => {
    const currentTrainer = trainerData[trainerData.length - 1];

    if (!addedPokemons.find(p => p.id === pokemon.id)) {
      const updatedPokemons = [...addedPokemons, pokemon];
      setAddedPokemons(updatedPokemons);

      const updatedTrainer = { ...currentTrainer, pokemons: updatedPokemons };
      const updatedTrainerData = [
        ...trainerData.slice(0, trainerData.length - 1),
        updatedTrainer
      ];

      setTrainerData(updatedTrainerData);
      localStorage.setItem('trainerData', JSON.stringify(updatedTrainerData));
    } else {
      alert(`${pokemon.name} 已經在列表中`);
    }
  };

  const updateTrainer = (index, updatedTrainer) => {
    const updatedTrainerData = [...trainerData];
    updatedTrainerData[index] = updatedTrainer;
    setTrainerData(updatedTrainerData);
    localStorage.setItem('trainerData', JSON.stringify(updatedTrainerData));
  };

  return (
    <TrainerContext.Provider value={{ addedPokemons, addPokemon, trainerData, addTrainer, updateTrainer }}>
      {children}
    </TrainerContext.Provider>
  );
};
