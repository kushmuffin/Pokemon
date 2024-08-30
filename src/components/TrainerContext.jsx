import React, { createContext, useState } from 'react';

export const TrainerContext = createContext();

export const TrainerProvider = ({ children }) => {
  const [trainerData, setTrainerData] = useState(()=>{ // 渲染時從 localStorage 加載訓練師數據
    const storedData = localStorage.getItem('trainerData');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [addedPokemons, setAddedPokemons] = useState([]);

  const addTrainer = (trainer) => {
    const updatedTrainerData = [...trainerData, trainer];
    setTrainerData(updatedTrainerData);
    // 將更新後的訓練師數據保存到 localStorage
    localStorage.setItem('trainerData', JSON.stringify(updatedTrainerData));
    setAddedPokemons([]);
  };

  const addPokemon = (pokemon) => {
    setAddedPokemons([...addedPokemons, pokemon]);
  };

  return (
    <TrainerContext.Provider value={{ addedPokemons, addPokemon, trainerData, addTrainer }}>
      {children}
    </TrainerContext.Provider>
  );
};
