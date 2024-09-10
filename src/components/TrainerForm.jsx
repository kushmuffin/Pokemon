import React, { useState, useEffect, useContext } from 'react';
import { TrainerContext } from './TrainerContext';
import PokemonDetailDialog from './PokemonDetailDialog';

// 訓練師圖片
import male_character from '../assets/male_character.png';
import female_character from '../assets/female_character.png';

const TrainerForm = () => {
  const [userName, setUserName] = useState(''); // 訓練師名稱
  const [gender, setGender] = useState(''); // 性別
  const [inputUserName, setInputUserName] = useState(''); // 訓練師名稱輸入框
  const [showTrainer, setShowTrainer] = useState(false); // 訓練師資料顯示 預設不顯示
  const [editingTrainer, setEditingTrainer] = useState(null); // 用於存儲當前正在編輯的訓練師 預設為空
  const [selectedPokemon, setSelectedPokemon] = useState(null); // 用於儲存被選中的寶可夢

  const { addedPokemons, // 新增訓練師的寶可夢列表
          addTrainer, // 新增訓練師資料
          trainerData, // 儲存訓練師資料的列表
          updateTrainer, // 更新指定索引的訓練師資料
          deleteTrainerData // 刪除訓練師的資料
        } = useContext(TrainerContext);

  useEffect(() => { // 依訓練師資料呈現畫面
    if (trainerData.length > 0) {
      setShowTrainer(true);
    } else {
      setShowTrainer(false);
    }
  }, [trainerData]);

  useEffect(() => { // 編輯訓練師資料時 自動帶入
    if (editingTrainer !== null) {
      const trainer = trainerData[editingTrainer];
      setInputUserName(trainer.userName);
      setGender(trainer.gender);
    }
  }, [editingTrainer]);

  const handleSubmit = (e) => { // 表單功能
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
    }
  };

  const getTrainerImage = (gender) => { // 判斷男/女訓練師圖片
    return gender === 'male' ? male_character : female_character;
  };

  const handleDetailClick = (pokemon) => { // 設定被選中的寶可夢，打開Dialog顯示更多資訊
    setSelectedPokemon(pokemon);
  };
  
  const handleCloseDialog = () => { // 關閉對話框
    setSelectedPokemon(null);
  };

  const handleEditClick = (trainer, index) => { //開啟編輯訓練家資料
    setEditingTrainer(index);
    setInputUserName(trainer.userName);
    setGender(trainer.gender);
  };

  const handleTrainerUpdate = (index) => { // 更新訓練師資料
    const updatedTrainer = {
      ...trainerData[index],
      userName: inputUserName,
      gender: gender,
      pokemons: trainerData[index].pokemons, // 保持寶可夢不變
    };

    updateTrainer(index, updatedTrainer); // 調用 context 提供的函數來更新數據
    setEditingTrainer(null);
    setInputUserName('');
    setGender('');
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
                      <>
                        <button onClick={() => handleTrainerUpdate(index)}>保存</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(trainer, index)}>編輯</button>
                        <button onClick={() => deleteTrainerData()}>刪除</button>
                      </>
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
