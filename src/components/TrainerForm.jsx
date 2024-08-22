import React, { useState, useEffect } from 'react';
import male_character from '../assets/male_character.png';
import female_character from '../assets/female_character.png';

const TrainerForm = () => {
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [inputUserName, setInputUserName] = useState('');

  // 在組件載入時，從 localStorage 中載入資料
  useEffect(() => {
    const storedUserName = localStorage.getItem('trainerName');
    const storedGender = localStorage.getItem('trainerGender');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedGender) {
      setGender(storedGender);
    }
  }, []);

  const sendUserData = (e) => {
    e.preventDefault(); // 阻止頁面刷新
    setUserName(inputUserName);
    setInputUserName('');

    // 將資料存儲到 localStorage
    localStorage.setItem('trainerName', inputUserName);
    localStorage.setItem('trainerGender', gender);
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
    <div style={{ padding: '1rem 0', maxWidth: '300px', margin: '0 auto' }}>
      <h2>訓練師資料</h2>
      <form>
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
        <button onClick={sendUserData}>提交</button>
      </form>
      <div>
        <div className='trainer'>
          <span>訓練師名稱: {userName}</span>
          {getTrainerImage() && (
            <img src={getTrainerImage()} alt={userName} style={{ width: '40px' }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerForm;
