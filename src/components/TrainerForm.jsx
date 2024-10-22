import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Input, Select } from 'antd';
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
          addedTrainer, // 新增訓練師資料
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
      console.log(editingTrainer)
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
        pokemonlist: addedPokemons,
      };

      addedTrainer(newTrainer); // 使用 useContext 更新訓練師資料
      setUserName(inputUserName);
      setShowTrainer(true);
      setInputUserName('');
    }
  };

  const getTrainerImage = (gender) => { // 判斷男/女訓練師圖片
    return gender === 'male' ? male_character : female_character;
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
      pokemonlist: trainerData[index].pokemonlist, // 保持寶可夢不變
    };
    updateTrainer(index, updatedTrainer); // 調用 context 提供的函數來更新數據
    setEditingTrainer(null);
    setInputUserName('');
    setGender('');
  };

  const cancelTrainerUpdate = () => { // 取消修改
    setInputUserName(''); 
    setGender(''); 
    setEditingTrainer(null);
  }

  const handleDetailClick = (pokemon) => { // 設定被選中的寶可夢，打開Dialog顯示更多資訊
    setSelectedPokemon(pokemon);
  };

  const handleCloseDialog = () => { // 關閉對話框
    setSelectedPokemon(null);
  };

  // 表格的欄位配置
  const columns = [
    {
      title: '訓練師名稱',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record, index) =>
        editingTrainer === index ? (
          <Input value={inputUserName} onChange={(e) => setInputUserName(e.target.value)} />
        ) : (
          text
        ),
    },
    {
      title: '性別',
      dataIndex: 'gender',
      key: 'gender',
      render: (text, record, index) =>
        editingTrainer === index ? (
          <Select value={gender} onChange={(value) => setGender(value)} style={{ width: 120 }}>
            <Select.Option value="male">男</Select.Option>
            <Select.Option value="female">女</Select.Option>
          </Select>
        ) : (
          <img src={getTrainerImage(record.gender)} alt={record.userName} style={{ width: '50px' }} />
        ),
    },
    {
      title: '寶可夢',
      dataIndex: 'pokemonlist',
      key: 'pokemonlist',
      render: (pokemonlist) =>
        pokemonlist.length === 0 ? (
          <p>尚未添加寶可夢</p>
        ) : (
          pokemonlist.map((pokemon, idx) => (
            <img
              key={idx}
              className="bitimg"
              onClick={() => handleDetailClick(pokemon)}
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: '50px', marginRight: '5px' }}
            />
          ))
        ),
    },
    {
      title: '其他',
      key: 'action',
      render: (text, record, index) =>
        editingTrainer === index ? (
          <>
            <Button onClick={() => handleTrainerUpdate(index)}>保存</Button>
            <Button onClick={cancelTrainerUpdate} style={{ marginLeft: '10px' }}>
              取消
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => handleEditClick(record, index)}>編輯</Button>
            <Button onClick={() => deleteTrainerData(index)} style={{ marginLeft: '10px' }}>
              刪除
            </Button>
          </>
        ),
    },
  ];

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
              style={{ height: '45px' }}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">選擇性別</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
            <button type="submit">{editingTrainer !== null ? '更新' : '確認'}</button>
          </div>
        </form>
      )}
      {showTrainer && (
        <div className='trainer-table'>
          <h3>已提交的訓練師資料</h3>
          <Table className='table-data' columns={columns} dataSource={trainerData} rowKey={(record, index) => index} />
          {/* <table border="1">
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
                    {trainer.pokemonlist.length === 0 ? (
                      <p>尚未添加寶可夢</p>
                    ) : (
                      <div>
                        {trainer.pokemonlist.map((pokemon, idx) => (
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
                        <button onClick={() => cancelTrainerUpdate()}>取消</button>
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
          </table> */}
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
