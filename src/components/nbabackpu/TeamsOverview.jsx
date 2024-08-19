import React, { useState, useEffect } from 'react';
import { fetchTeamsList } from './TeamsApi'; // 引入已存在的 API 調用函數

const TeamsOverview = () => {
  const [teamsList, setTeamsList] = useState([]); // 管理隊伍列表(球員名單)
  const [teamName, setTeamName] = useState('Boston_Celtic'); // 默認隊伍
  const [teamData, setTeamData] = useState(null); // 儲存選擇的隊伍資料

  useEffect(() => {
    // 獲取所有隊伍的名稱
    const fetchData = async () => {
      try {
        const data = await fetchTeamsList();
        setTeamsList(Object.keys(data));
        // 默認載入第一個隊伍的資料
        setTeamData(data[teamName]);
      } catch (error) {
        console.error('Error fetching teams list:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // 當選擇的隊伍變更時，獲取該隊伍的資料
    const fetchSelectedTeamData = async () => {
      try {
        const data = await fetchTeamsList(teamName);
        setTeamData(data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };
    if (teamName) {
      fetchSelectedTeamData();
    }
  }, [teamName]);

  return (
    <div>
      <h1>Teams Overview</h1>
      <div>
        <select
          id="teamSelect"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        >
          {teamsList.map((team) => (
            <option key={team} value={team}>
              {team.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      {teamData && (
        <div>
          <h2 style={{'text-align': 'justify'}}>{teamName.replace('_', ' ')}</h2>
          <p className='team_content'><strong>Conference:</strong> {teamData.conference}</p>
          <p className='team_content'><strong>Division:</strong> {teamData.division}</p>
          <p className='team_content'><strong>Arena:</strong> {teamData.arena}</p>
          <p className='team_content'><strong>Location:</strong> {teamData.location}</p>
          <p className='team_content'><strong>Owner:</strong> {teamData.owner.join(', ')}</p>
          <p className='team_content'><strong>General Manager:</strong> {teamData.general}</p>
          <p className='team_content'><strong>Head Coach:</strong> {teamData.head_coach}</p>
          <p className='team_content'><strong>Championships:</strong> {teamData.championships}</p>
          
          <h3>Players</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {teamData.players.map((player) => (
                <tr key={player.id}>
                  <td>{player.number}</td>
                  <td>{player.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeamsOverview;
