import React, { useState, useEffect, useContext } from 'react';
import { TrainerContext } from './TrainerContext';

// 訓練師圖片
import male_character from '../assets/male_character.png';
import female_character from '../assets/female_character.png';

const TrainerForm = () => {
  // const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const [inputUserName, setInputUserName] = useState('');
  const [showTrainer, setShowTrainer] = useState(false);
  const [trainerData, setTrainerData] = useState([]); // 新增的 State 用來保存所有訓練師資料
  const { addedPokemons } = useContext(TrainerContext);

  useEffect(() => {
    const storedTrainerData = JSON.parse(localStorage.getItem('trainerData')) || []; // 讀取訓練師暫存
    setTrainerData(storedTrainerData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTrainer = {
      userName: inputUserName,
      gender: gender,
      pokemons: addedPokemons,
    };

    const updatedTrainerData = [...trainerData, newTrainer];
    setTrainerData(updatedTrainerData);
    setUserName(inputUserName);
    setShowTrainer(true);
    setInputUserName('');

    localStorage.setItem('trainerData', JSON.stringify(updatedTrainerData)); // 訓練師暫存
  };

  const getTrainerImage = (gender) => {
    return gender === 'male' ? male_character : female_character;
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
            <button type="submit">提交</button>
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
              </tr>
            </thead>
            <tbody>
              {trainerData.map((trainer, index) => (
                <tr key={index}>
                  <td>{trainer.userName}</td>
                  <td>
                    <img
                      src={getTrainerImage(trainer.gender)}
                      alt={trainer.userName}
                      style={{ width: '50px' }}
                    />
                  </td>
                  <td>
                    {trainer.pokemons.length === 0 ? (
                      <p>尚未添加寶可夢</p>
                    ) : (
                      <ul>
                        {trainer.pokemons.map((pokemon, idx) => (
                          <li key={idx}>{pokemon.name}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrainerForm;
