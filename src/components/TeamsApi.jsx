import axios from 'axios';

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