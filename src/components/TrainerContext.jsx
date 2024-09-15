import React, { createContext, useState, useEffect } from 'react';

export const TrainerContext = createContext();

export const TrainerProvider = ({ children }) => {
  const [trainerData, setTrainerData] = useState(() => { // 訓練家資料
    const storedData = localStorage.getItem('trainerData');
    return storedData ? JSON.parse(storedData) : []; // 沒有訓練家先空陣列
  });
  const [addedPokemons, setAddedPokemons] = useState([]); // 寶可夢資料
  const [pokemonId, setPokemonId] = useState(0); // 寶可夢id


  // 在頁面載入或 trainerData 更新後，將訓練家的寶可夢同步到 addedPokemons
  useEffect(() => {
    if (trainerData.length > 0) {
      const currentTrainer = trainerData[trainerData.length - 1];
      setAddedPokemons(currentTrainer.pokemonlist || []); // 如果 pokemons 存在，則同步，否則設為空陣列
    }
  }, [trainerData]);

  const addedTrainer = (trainer) => { // 新增訓練家資料
    const updatedTrainerData = [...trainerData, trainer];
    setTrainerData(updatedTrainerData);
    localStorage.setItem('trainerData', JSON.stringify(updatedTrainerData));
    setAddedPokemons([]);
  };

  const addPokemon = (pokemon) => { // 新增寶可夢
    const currentTrainer = trainerData[trainerData.length - 1]; 
    // 檢查寶可夢是否已經在列表中（根據寶可夢名字）
    if (!addedPokemons.some(p => p.name === pokemon.name)) { 
      // 新增寶可夢的唯一ID
      const updatedPokemons = [...addedPokemons, { ...pokemon, id: pokemonId }]; 
      setPokemonId(pokemonId + 1); // 遞增 id
      // 更新寶可夢列表
      setAddedPokemons(updatedPokemons);
  
      // 更新當前訓練家的資料
      const updatedTrainer = { ...currentTrainer, pokemonlist: updatedPokemons };
      const updatedTrainerData = [
        ...trainerData.slice(0, trainerData.length - 1),
        updatedTrainer
      ];
      setTrainerData(updatedTrainerData);
  
      // 存入 localStorage
      localStorage.setItem('trainerData', JSON.stringify(updatedTrainerData));
      alert(`${pokemon.name} 成功加入`);
    } else {
      alert(`${pokemon.name} 已經在列表中`);
    }
  };

  // const addPokemon = (pokemon) => { // GPT
  //   const currentTrainer = trainerData[trainerData.length - 1]; 
  
  //   // 如果寶可夢已存在，則彈出提示
  //   if (addedPokemons.some(p => p.id === pokemon.id)) {
  //     return alert(`${pokemon.name} 已經在列表中`);
  //   }
  
  //   // 增加寶可夢，並自動遞增 id
  //   const newPokemon = { ...pokemon, id: pokemonId };
  //   const updatedPokemons = [...addedPokemons, newPokemon];
    
  //   // 更新狀態
  //   setPokemonId(pokemonId + 1);
  //   setAddedPokemons(updatedPokemons);
  
  //   // 更新當前訓練家的寶可夢
  //   const updatedTrainerData = trainerData.map((trainer, index) => 
  //     index === trainerData.length - 1 
  //       ? { ...trainer, pokemons: updatedPokemons } 
  //       : trainer
  //   );
    
  //   setTrainerData(updatedTrainerData);
  //   localStorage.setItem('trainerData', JSON.stringify(updatedTrainerData));
  // };

  const updateTrainer = (index, updatedTrainer) => { // 更新訓練家
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
    <TrainerContext.Provider value={{ addedPokemons, addPokemon, trainerData, addedTrainer, updateTrainer, deleteTrainerData }}>
      {children} 
    </TrainerContext.Provider>
  );
};
