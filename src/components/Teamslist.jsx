import React, { useState, useEffect } from 'react';
import { fetchTeamsList, deletePlayerFromTeam } from './TeamsApi';

import AddPlayer from './AddPlayer';

const TeamsList = () => {
  const [teamsList, setTeamsList] = useState([]); // 管理隊伍列表(球員名單)
  const [teamName, setTeamName] = useState('USA'); // 隊伍默認 USA 隊伍
  const [availableTeams, setAvailableTeams] = useState([]); // 管理下拉選單
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
            <th>位置</th>
            <th>身高</th>
            <th>體重</th>
            <th>年齡</th>
            <th>所屬球隊</th>
            <th>操作</th> {/* 新增操作欄位 */}
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
                <td>{player.number}</td>
                <td>{player.name}</td>
                <td>{player.position}</td>
                <td>{player.height}</td>
                <td>{player.weight}</td>
                <td>{player.age}</td>
                <td>{player.currentTeam}</td>
                <td>
                  <button onClick={() => handlePlayerDelete(player.name)}>刪除</button> {/* 刪除按鈕 */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsList;
