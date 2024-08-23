import React, { useState, useEffect, useContext } from 'react';
import { TrainerContext } from './TrainerContext';

// 訓練師圖片
import male_character from '../assets/male_character.png';
import female_character from '../assets/female_character.png';

const TrainerForm = () => {
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [inputUserName, setInputUserName] = useState('');
  const [showTrainer, setShowTrainer] = useState(false); // 控制是否顯示訓練師資料
  const { addedPokemons } = useContext(TrainerContext);

  // 在組件載入時，從 localStorage 中載入資料
  useEffect(() => {
    const storedUserName = localStorage.getItem('trainerName');
    const storedGender = localStorage.getItem('trainerGender');
    const storedShowTrainer = localStorage.getItem('showTrainer') === 'true';

    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedGender) {
      setGender(storedGender);
    }
    setShowTrainer(storedShowTrainer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止頁面刷新
    setUserName(inputUserName);
    setShowTrainer(true); // 提交後顯示訓練師資料
    setInputUserName('');

    // 將資料存儲到 localStorage
    localStorage.setItem('trainerName', inputUserName);
    localStorage.setItem('trainerGender', gender);
    localStorage.setItem('showTrainer', true);
  };

  const getTrainerImage = () => {
    if (gender === 'male') {
      return male_character;
    } else if (gender === 'female') {
      return female_character;
    } else {
      return null;
    }
  };

  return (
    <div style={{ padding: '1rem 0', margin: '0 auto' }}>
      <h2>訓練師資料</h2>
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
        </div>
        <div className='trainerinput'>
          性別:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">選擇性別</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
        <button type="submit">提交</button>
      </form>
      {showTrainer && (
        <div className='trainer'>
          {getTrainerImage() && (
            <div>
              <img src={getTrainerImage()} alt={userName} style={{ width: '100px' }} />
              <span>訓練師名稱: {userName}</span>
            </div>
          )}
          {/* 顯示已添加的寶可夢列表 */}
          <div>
            <h3>已添加的寶可夢列表</h3>
            {addedPokemons.length === 0 ? (
              <p>尚未添加寶可夢</p>
            ) : (
              <ul>
                {addedPokemons.map((pokemon, index) => (
                  <li key={index}>{pokemon.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerForm;
