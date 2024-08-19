import axios from 'axios';

// 取得球隊資料
export const fetchTeamsList = async (teamName) => {
  try {
    const url = teamName ? `http://localhost:3000/api/teams/${teamName}` : 'http://localhost:3000/api/teams';
    const response = await axios.get(url);
    return response.data; // 返回 data 部分
  } catch (error) {
    console.error('Error fetching Teams list:', error);
    throw error;
  }
};

// 新增球員到球隊
export const addPlayerToTeam = async (teamName, playerData) => {
  try {
    const url = `http://localhost:3000/api/teams/${teamName}/players`;
    const response = await axios.post(url, playerData);
    return response.data;
  } catch (error) {
    console.error('Error adding player to team:', error);
    throw error;
  }
};

// 刪除球員
export const deletePlayerFromTeam = async (teamName, playerId) => {
  try {
    const url = `http://localhost:3000/api/teams/${teamName}/players/${playerId}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error('Error deleting player from team:', error);
    throw error;
  }
};

// 更新球員資料
export const updatePlayerInTeam = async (teamName, playerId, playerData) => {
  try {
    const url = `http://localhost:3000/api/teams/${teamName}/players/${playerId}`;
    const response = await axios.put(url, playerData);
    return response.data;
  } catch (error) {
    console.error('Error updating player:', error);
    throw error;
  }
};