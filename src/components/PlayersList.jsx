import React, { useState, useEffect } from 'react';
import { fetchTeamsList, deletePlayerFromTeam, updatePlayerInTeam } from './TeamsApi';

import AddPlayer from './AddPlayer';

const PlayersList = () => {
  const [teamsList, setTeamsList] = useState([]); // 管理隊伍列表(球員名單)
  const [teamName, setTeamName] = useState('Boston_Celtic'); // 默認隊伍
  const [availableTeams, setAvailableTeams] = useState([]); // 管理下拉選單
  const [editingPlayer, setEditingPlayer] = useState(null); // 修改球員資料
  const [columnCount, setColumnCount] = useState(); // 預設無資料欄位 顯示No Player

  useEffect(() => { //球員名單
    const getTeamsList = async () => {
      try {
        const data = await fetchTeamsList(teamName);
        setTeamsList(data.players);
        console.log('Teams list fetched:', data);
      } catch (error) {
        console.error('Error fetching Teams list:', error);
      }
    };
    getTeamsList();
  }, [teamName]);

  useEffect(() => { //下拉選單
    const getAvailableTeams = async () => {
      try {
        const data = await fetchTeamsList();
        setAvailableTeams(Object.keys(data));
      } catch (error) {
        console.error('Error fetching available teams:', error);
      }
    };
    getAvailableTeams();
  }, []);

  useEffect(() => { //表格
    const columns = document.querySelectorAll('thead th').length;
    setColumnCount(columns);
  }, []);

  const handlePlayerAdded = (newPlayer) => {
    setTeamsList([newPlayer, ...teamsList]);
  };

  const handlePlayerDelete = async (playerId) => {
    try {
      await deletePlayerFromTeam(teamName, playerId);
      setTeamsList(teamsList.filter(player => player.id !== playerId));
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
  };

  const handleSave = async () => {
    try {
      await updatePlayerInTeam(teamName, editingPlayer.id, editingPlayer);
      
      // 强制重新获取最新的球员数据
      const refreshedList = await fetchTeamsList(teamName);
      setTeamsList(refreshedList.players);
      
      setEditingPlayer(null);
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };
  

  const handleCancel = () => {
    setEditingPlayer(null); // 觸發setEditingPlayer重置以退出
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Field changed: ${name}, New value: ${value}`); // test
    setEditingPlayer({
      ...editingPlayer,
      [name]: value
    });
  };

  return (
    <div>
      <h1>NBA player from every nation</h1>
      <div className='addPlayer'>
        <div className='addForm'>
          <div className="dropdown nation_list">
            <button className="dropdown-toggle nation_list_button" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {teamName}
            </button>
            <ul className="dropdown-menu nation_list_ul" aria-labelledby="dropdownMenuButton1">
              {availableTeams.map((team, player) => (
                <li
                  className="dropdown-item nation_list_li"
                  key={player.id}
                  onClick={() => setTeamName(team)} // 當選擇該選項時，更新 teamName
                >
                  <a href="#">{team}</a>
                </li>
              ))}
            </ul>
          </div>
        <AddPlayer teamName={teamName} onPlayerAdded={handlePlayerAdded} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{width: '10%'}}>Number</th>
            <th style={{width: '20%'}}>Name</th>
            <th style={{width: '10%'}}>Draft</th>
            <th style={{width: '10%'}}>Pick</th>
            <th style={{width: '10%'}}>Age</th>
            <th style={{width: '20%'}}>Position</th>
            {/* <th>身高</th>
            <th>體重</th>
            <th>所屬球隊</th> */}
            <th>操作</th>{/* 新增操作欄位 */}
          </tr>
        </thead>
        <tbody>
          {teamsList.length === 0 ? (
            <tr>
              <td colSpan={columnCount}>No Player Available</td>
            </tr>
          ) : (
            teamsList.map((player) => (
              <tr key={player.id}>
                {editingPlayer && editingPlayer.id === player.id ? (
                  <>
                    <td><input className='edit_input' name="number" value={editingPlayer.number} onChange={handleChange} /></td>
                    <td><input className='edit_input' name="name" value={editingPlayer.name} onChange={handleChange} /></td>
                    <td><input className='edit_input' name="draft" value={editingPlayer.draft} onChange={handleChange} /></td>
                    <td><input className='edit_input' name="pick" value={editingPlayer.pick} onChange={handleChange} /></td>
                    <td><input className='edit_input' name="age" value={editingPlayer.age} onChange={handleChange} /></td>
                    <td><input className='edit_input' name="position" value={editingPlayer.position} onChange={handleChange} /></td>
                    {/* <td><input name="height" value={editingPlayer.height} onChange={handleChange} /></td>
                    <td><input name="weight" value={editingPlayer.weight} onChange={handleChange} /></td>
                    <td><input name="currentTeam" value={editingPlayer.currentTeam} onChange={handleChange} /></td> */}
                    <td>
                      <button onClick={handleSave}>保存</button>{' '}
                      <button onClick={handleCancel}>取消</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{player.number}</td>
                    <td>{player.name}</td>
                    <td>{player.draft}</td>
                    <td>{player.pick}</td>
                    <td>{player.age}</td>
                    <td>{player.position}</td>
                    {/* <td>{player.height}</td>
                    <td>{player.weight}</td>
                    <td>{player.currentTeam}</td> */}
                    <td> {/* 刪除&編輯球員 */}
                      <button className='edit_btn' onClick={() => handleEdit(player)}>編輯</button>{' '}
                      <button className='delete_btn' onClick={() => handlePlayerDelete(player.id)}>刪除</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersList;
