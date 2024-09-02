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
    const currentTrainer = trainerData[trainerData.length - 1]; // 假設只有一個訓練師

    if (!addedPokemons.find(p => p.id === pokemon.id)) {
      const updatedPokemons = [...addedPokemons, pokemon];
      setAddedPokemons(updatedPokemons);

      // 更新當前訓練師的寶可夢列表
      const updatedTrainer = { ...currentTrainer, pokemons: updatedPokemons };
      const updatedTrainerData = [
        ...trainerData.slice(0, trainerData.length - 1),
        updatedTrainer
      ];

      setTrainerData(updatedTrainerData);
      // 將更新後的訓練師數據保存到 localStorage
      localStorage.setItem('trainerData', JSON.stringify(updatedTrainerData));
    } else {
      alert(`${pokemon.name} 已經在列表中`);
    }
  };

  return (
    <TrainerContext.Provider value={{ addedPokemons, addPokemon, trainerData, addTrainer }}>
      {children}
    </TrainerContext.Provider>
  );
};
