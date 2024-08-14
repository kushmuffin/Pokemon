import React, { useState } from 'react';
import { addPlayerToTeam } from './TeamsApi';

const AddPlayer = ({ teamName, onPlayerAdded }) => {
  const [playerData, setPlayerData] = useState({
    number: '',
    name: '',
    draft: '',
    pick: '',
    age: '',
    position: '',
    // height: '',
    // weight: '',
    // currentTeam: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPlayer = await addPlayerToTeam(teamName, playerData);
      onPlayerAdded(newPlayer);
      setPlayerData({
        number: '',
        name: '',
        draft: '',
        pick: '',
        age: '',
        position: '',
        // height: '',
        // weight: '',
        // currentTeam: ''
      });
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return (
    <>
      <form className='addForm' onSubmit={handleSubmit}>
        <div className='addArea'>
          <input className='enter' name="number" value={playerData.number} onChange={handleChange} placeholder="背號" required />
          <input className='enter' name="name" value={playerData.name} onChange={handleChange} placeholder="名稱" required />
          <input className='enter' name="draft" value={playerData.draft} onChange={handleChange} placeholder="選秀年分" required />
          <input className='enter' name="pick" value={playerData.pick} onChange={handleChange} placeholder="順位" required />
          <input className='enter' name="age" value={playerData.age} onChange={handleChange} placeholder="年齡" required />
          <input className='enter' name="position" value={playerData.position} onChange={handleChange} placeholder="位置" required />
          {/* <input className='enter' name="height" value={playerData.height} onChange={handleChange} placeholder="身高" required />
          <input className='enter' name="weight" value={playerData.weight} onChange={handleChange} placeholder="體重" required />
          <input className='enter' name="currentTeam" value={playerData.currentTeam} onChange={handleChange} placeholder="所屬球隊" required /> */}
        </div>
        <button className='addButton' type="submit">新增球員</button>
      </form>
    </>
  );
};

export default AddPlayer;
