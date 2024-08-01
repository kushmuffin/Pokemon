import React, { useState, useEffect } from 'react';
import { fetchTeamsList } from './TeamsApi';

const TeamsList = () => {
  const [teamsList, setTeamsList] = useState([]); // 確保初始值為空陣列
  const [columnCount, setColumnCount] = useState(0);

  useEffect(() => {
    const getTeamsList = async () => {
      try {
        const data = await fetchTeamsList();
        setTeamsList(data);
        console.log('Teams list fetched:', data);
      } catch (error) {
        console.error('Error fetching Teams list:', error);
      }
    };
    getTeamsList();
  }, []);

  useEffect(() => {
    // Calculate the number of columns dynamically based on the <thead> or the data
    const columns = document.querySelectorAll('thead th').length;
    setColumnCount(columns);
  }, []);

  return (
    <div>
      <h1>Team List</h1>
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
            teamsList.map((team, index) => (
              <tr key={index}>
                <td>{team.number}</td>
                <td>{team.name}</td>
                <td>{team.position}</td>
                <td>{team.Height}</td>
                <td>{team.Weight}</td>
                <td>{team.Age}</td>
                <td>{team.CurrentTeam}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsList;
