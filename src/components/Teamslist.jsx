import React, { useState, useEffect } from 'react';
import { fetchTeamsList, deletePlayerFromTeam, updatePlayerInTeam } from './TeamsApi';

import AddPlayer from './AddPlayer';

const TeamsList = () => {
  const [teamsList, setTeamsList] = useState([]); // 管理隊伍列表(球員名單)
  const [teamName, setTeamName] = useState('USA'); // 隊伍默認 USA 隊伍
  const [availableTeams, setAvailableTeams] = useState([]); // 管理下拉選單
  const [editingPlayer, setEditingPlayer] = useState(null); // 修改球員資料
  const [columnCount, setColumnCount] = useState(); // 預設無資料欄位 顯示No Player

  useEffect(() => { //球員名單
    const getTeamsList = async () => {
      try {
        const data = await fetchTeamsList(teamName);
        setTeamsList(data);
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

  useEffect(() => { //
    const columns = document.querySelectorAll('thead th').length;
    setColumnCount(columns);
  }, []);

  const handlePlayerAdded = (newPlayer) => { //新增一筆球員資料並觸發rerender
    const updatedTeamsList = [...teamsList];
    updatedTeamsList.unshift(newPlayer);
    setTeamsList(updatedTeamsList);
    // setTeamsList([...teamsList, newPlayer]) // 加入方式
  };

  const handlePlayerDelete = async (playerName) => {
    try {
      await deletePlayerFromTeam(teamName, playerName);
      setTeamsList(teamsList.filter(player => player.name !== playerName));
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
  };

  const handleSave = async () => {
    try {
      const updatedPlayer = await updatePlayerInTeam(teamName, editingPlayer.name, editingPlayer);
      const updatedTeamsList = teamsList.map(player =>
        player.name === updatedPlayer.name ? updatedPlayer : player
      );
      setTeamsList(updatedTeamsList);
      setEditingPlayer(null); // 保存成功後清空編輯狀態
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingPlayer({
      ...editingPlayer,
      [name]: value
    });
  };

  return (
    <div>
      <h1>NBA player from every nation</h1>
      <select onChange={(e) => setTeamName(e.target.value)} value={teamName}>
        {availableTeams.map((team, index) => (
          <option key={index} value={team}>{team}</option>
        ))}
      </select>
      <AddPlayer teamName={teamName} onPlayerAdded={handlePlayerAdded} />
      <table>
        <thead>
          <tr>
            <th>背號</th>
            <th>名稱</th>
            <th>選秀年分</th>
            <th>順位</th>
            <th>年齡</th>
            <th>位置</th>
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
            teamsList.map((player, index) => (
              <tr key={index}>
                {editingPlayer && editingPlayer.name === player.name ? (
                  <>
                    <td><input name="number" value={editingPlayer.number} onChange={handleChange} /></td>
                    <td><input name="name" value={editingPlayer.name} onChange={handleChange} /></td>
                    <td><input name="draft" value={editingPlayer.draft} onChange={handleChange} /></td>
                    <td><input name="pick" value={editingPlayer.pick} onChange={handleChange} /></td>
                    <td><input name="age" value={editingPlayer.age} onChange={handleChange} /></td>
                    <td><input name="position" value={editingPlayer.position} onChange={handleChange} /></td>
                    {/* <td><input name="height" value={editingPlayer.height} onChange={handleChange} /></td>
                    <td><input name="weight" value={editingPlayer.weight} onChange={handleChange} /></td>
                    <td><input name="currentTeam" value={editingPlayer.currentTeam} onChange={handleChange} /></td> */}
                    <td>
                      <button onClick={handleSave}>保存</button>
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
                      <button onClick={() => handlePlayerDelete(player.name)}>刪除</button>
                      <button onClick={() => handleEdit(player)}>編輯</button>
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

export default TeamsList;
