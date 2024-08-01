import axios from 'axios';

export const fetchTeamsList = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/teams');
    return response.data; // 返回 data 部分
  } catch (error) {
    console.error('Error fetching teams list:', error);
    throw error;
  }
};