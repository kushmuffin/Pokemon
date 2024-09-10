import React, { createContext, useState, useEffect } from 'react';

export const TrainerContext = createContext();

export const TrainerProvider = ({ children }) => {
  const [trainerData, setTrainerData] = useState(() => { // 訓練家資料
    const storedData = localStorage.getItem('trainerData');
    return storedData ? JSON.parse(storedData) : []; // 沒有訓練家先空陣列
  });
  const [addedPokemons, setAddedPokemons] = useState([]); // 寶可夢資料

  // 在頁面載入或 trainerData 更新後，將最新訓練家的寶可夢同步到 addedPokemons
  useEffect(() => {
    if (trainerData.length > 0) {
      const currentTrainer = trainerData[trainerData.length - 1];
      setAddedPokemons(currentTrainer.pokemons || []); // 如果 pokemons 存在，則同步，否則設為空陣列
    }
  }, [trainerData]);

  const addTrainer = (trainer) => { // 新增訓練家資料
    const updatedTrainerData = [...trainerData, trainer];
    setTrainerData(updatedTrainerData);
    localStorage.setItem('trainerData', JSON.stringify(updatedTrainerData));
    setAddedPokemons([]);
  };

  const addPokemon = (pokemon) => { // 新增寶可夢
    const currentTrainer = trainerData[trainerData.length - 1]; 
    if (!addedPokemons.find(p => p.id === pokemon.id)) { // 不要攜帶重複的寶可夢
      const updatedPokemons = [...addedPokemons, { ...pokemon, id: Date.now() }]; // 添加 id
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

  const deleteTrainerData = () => {
    setTrainerData([]); // 清空訓練家
    setAddedPokemons([]); // 清空寶可夢
    localStorage.removeItem('trainerData'); // 刪除 localStorage 中的資料
    alert(`已刪除訓練家資料!`);
  };

  return (
    <TrainerContext.Provider value={{ addedPokemons, addPokemon, trainerData, addTrainer, updateTrainer, deleteTrainerData }}>
      {children} 
    </TrainerContext.Provider>
  );
};
