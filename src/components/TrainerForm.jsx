import React, { useState, useEffect, useContext } from 'react';
import { TrainerContext } from './TrainerContext';
import PokemonDetailDialog from './PokemonDetailDialog';

// 訓練師圖片
import male_character from '../assets/male_character.png';
import female_character from '../assets/female_character.png';

const TrainerForm = () => {
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [inputUserName, setInputUserName] = useState('');
  const [showTrainer, setShowTrainer] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null); // 用於存儲當前正在編輯的訓練師
  const { addedPokemons, addTrainer, trainerData, updateTrainer } = useContext(TrainerContext);

  const [selectedPokemon, setSelectedPokemon] = useState(null); // 用於儲存被選中的寶可夢

  useEffect(() => {
    if (trainerData.length > 0) {
      setShowTrainer(true);
    }
  }, [trainerData]);

  useEffect(() => {
    if (editingTrainer !== null) {
      const trainer = trainerData[editingTrainer];
      setInputUserName(trainer.userName);
      setGender(trainer.gender);
    }
  }, [editingTrainer, trainerData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTrainer !== null) {
      handleTrainerUpdate(editingTrainer); // 如果正在編輯，調用更新函式
    } else {
      const newTrainer = {
        userName: inputUserName,
        gender: gender,
        pokemons: addedPokemons,
      };

      addTrainer(newTrainer); // 使用 useContext 更新訓練師資料
      setUserName(inputUserName);
      setShowTrainer(true);
      setInputUserName('');

      // 不需要再存储在 localStorage，因为 addTrainer 已经处理
    }
  };

  const getTrainerImage = (gender) => {
    return gender === 'male' ? male_character : female_character;
  };

  const handleDetailClick = (pokemon) => {
    setSelectedPokemon(pokemon); // 設定被選中的寶可夢，打開Dialog顯示更多資訊
  };
  
  const handleCloseDialog = () => {
    setSelectedPokemon(null); // 關閉對話框
  };

  const handleTrainerUpdate = (index) => {
    const updatedTrainer = {
      ...trainerData[index],
      userName: inputUserName,
      gender: gender,
      pokemons: trainerData[index].pokemons, // 保持已有的寶可夢不變
    };

    updateTrainer(index, updatedTrainer); // 调用 context 提供的函数来更新数据
    setEditingTrainer(null);
    setInputUserName('');
    setGender('');
  };

  const handleEditClick = (trainer, index) => {
    setEditingTrainer(index);
    setInputUserName(trainer.userName);
    setGender(trainer.gender);
  };

  return (
    <div className='context'>
      <h1>訓練師資料</h1>
      {!showTrainer && (
        <form onSubmit={handleSubmit}>
          <div className='trainerinput'>
            <span>名稱:</span>
            <input
              type="text"
              className='enter'
              value={inputUserName}
              onChange={(e) => setInputUserName(e.target.value)}
              placeholder="Trainer Name"
              required
            />
            <span>性別:</span>
            <select className='enter'
              style={{ height: '44px' }}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">選擇性別</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
            <button type="submit">{editingTrainer !== null ? '更新' : '提交'}</button>
          </div>
        </form>
      )}
      {showTrainer && (
        <div className='trainer'>
          <h3>已提交的訓練師資料</h3>
          <table border="1">
            <thead>
              <tr>
                <th>訓練師名稱</th>
                <th>性別</th>
                <th>寶可夢</th>
                <th>其他</th>
              </tr>
            </thead>
            <tbody>
              {trainerData.map((trainer, index) => (
                <tr key={index}>
                  <td>
                    {editingTrainer === index ? (
                      <input
                        className='enter'
                        type="text"
                        value={inputUserName}
                        onChange={(e) => setInputUserName(e.target.value)}
                      />
                    ) : (
                      trainer.userName
                    )}
                  </td>
                  <td>
                    {editingTrainer === index ? (
                      <select
                        className='enter'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        style={{padding: '0.4rem'}}
                      >
                        <option value="male">男</option>
                        <option value="female">女</option>
                      </select>
                    ) : (
                      <img
                        src={getTrainerImage(trainer.gender)}
                        alt={trainer.userName}
                        style={{ width: '50px' }}
                      />
                    )}
                  </td>
                  <td>
                    {trainer.pokemons.length === 0 ? (
                      <p>尚未添加寶可夢</p>
                    ) : (
                      <div>
                        {trainer.pokemons.map((pokemon, idx) => (
                          <img
                            className='bitimg'
                            onClick={() => handleDetailClick(pokemon)}
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            key={idx}
                          />
                        ))}
                      </div>
                    )}
                  </td>
                  <td>
                    {editingTrainer === index ? (
                      <button onClick={() => handleTrainerUpdate(index)}>保存</button>
                    ) : (
                      <button onClick={() => handleEditClick(trainer, index)}>編輯</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* 新增 PokemonDetailDialog */}
      {selectedPokemon && (
        <PokemonDetailDialog 
          pokemon={selectedPokemon} 
          onClose={handleCloseDialog} 
        />
      )}
    </div>
  );
};

export default TrainerForm;
