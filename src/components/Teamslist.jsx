import React, { useState, useEffect } from 'react';
import { fetchTeamsList } from './TeamsApi';

const TeamsList = () => {
  const [teamsList, setTeamsList] = useState([]);
  const [teamName, setTeamName] = useState('USA'); // 默認顯示 USA 隊伍
  const [availableTeams, setAvailableTeams] = useState([]);
  const [columnCount, setColumnCount] = useState(7);

  useEffect(() => {
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

  useEffect(() => {
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

  useEffect(() => {
    const columns = document.querySelectorAll('thead th').length;
    setColumnCount(columns);
  }, []);

  return (
    <div>
      <h1>Team List</h1>
      <select onChange={(e) => setTeamName(e.target.value)} value={teamName}>
        {availableTeams.map((team, index) => (
          <option key={index} value={team}>{team}</option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>背號</th>
            <th>名稱</th>
            <th>位置</th>
            <th>身高</th>
            <th>體重</th>
            <th>年齡</th>
            <th>原隊</th>
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
                <td>{player.Height}</td>
                <td>{player.Weight}</td>
                <td>{player.Age}</td>
                <td>{player.CurrentTeam}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsList;
