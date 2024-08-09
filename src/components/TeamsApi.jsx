import axios from 'axios';

export const fetchTeamsList = async (teamName) => { //以國家取得球員資料
  try {
    const url = teamName ? `http://localhost:3000/api/teams/${teamName}` : 'http://localhost:3000/api/teams';
    const response = await axios.get(url);
    return response.data; // 返回 data 部分
  } catch (error) {
    console.error('Error fetching Teams list:', error);
    throw error;
  }
};

export const addPlayerToTeam = async (teamName, playerData) => { //返回新增球員
  try {
    const url = `http://localhost:3000/api/teams/${teamName}/players`;
    const response = await axios.post(url, playerData);
    return response.data;
  } catch (error) {
    console.error('Error adding player to team:', error);
    throw error;
  }
};

export const deletePlayerFromTeam = async (teamName, playerName) => { // 刪除球員
  try {
    const url = `http://localhost:3000/api/teams/${teamName}/players/${playerName}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error('Error deleting player from team:', error);
    throw error;
  }
};
