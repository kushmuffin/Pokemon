import express from 'express'; // 建立伺服器
import cors from 'cors'; // 中間件，用來解決跨域資源共享問題，允許不同來源的請求訪問伺服器。
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors()); // 使用 cors 中間件
app.use(bodyParser.json()); // 新增這行來解析 JSON 請求

const teams = {
  USA:{
    players: [
    { id: 1, number: '0', name: 'Tyrese Haliburton', draft: '2020', pick: '12', age: '24', position: 'Guard', height: '6-5', weight: '185', currentTeam: 'Indiana Pacer'},
    { id: 2, number: '1', name: 'Devin Booker', draft: '2015', pick: '13', age: '27', position: 'Guard', height: '6-5', weight: '206', currentTeam: 'Phoenix Sun'},
    { id: 3, number: '4', name: 'Jrue Holiday', draft: '2009', pick: '17', age: '34', position: 'Guard', height: '6-3', weight: '229', currentTeam: 'Boston Celtic'},
    { id: 4, number: '5', name: 'Anthony Edwards', draft: '2020', pick: '1', age: '22', position: 'Guard', height: '6-4', weight: '225', currentTeam: 'Minnesota Timberwolves'},
    { id: 5, number: '9', name: 'Derrick White', draft: '2017', pick: '29', age: '30', position: 'Guard', height: '6-4', weight: '190', currentTeam: 'Boston Celtic'},
    { id: 6, number: '30', name: 'Stephen Curry', draft: '2009', pick: '7', age: '36', position: 'Guard', height: '6-2', weight: '185', currentTeam: 'Golden State Warriors'},
    { id: 7, number: '0', name: 'Jayson Tatum', draft: '2017', pick: '3', age: '26', position: 'Forward', height: '6-8', weight: '205', currentTeam: 'Boston Celtic'},
    { id: 8, number: '3', name: 'Anthony Davis', draft: '2012', pick: '1', age: '31', position: 'Forward', height: '6-10', weight: '253', currentTeam: 'Los Angeles Lakers'},
    { id: 9, number: '6', name: 'LeBron James', draft: '2003', pick: '1', age: '39', position: 'Forward', height: '6-9', weight: '250', currentTeam: 'Los Angeles Lakers'},
    { id: 10, number: '35', name: 'Kevin Durant', draft: '2007', pick: '2', age: '35', position: 'Forward', height: '6-10', weight: '225', currentTeam: 'Phoenix Sun'},
    { id: 11, number: '13', name: 'Bam Adebayo', draft: '2017', pick: '14', age: '27', position: 'Center', height: '6-9', weight: '225', currentTeam: 'Miami Heat'},
    { id: 12, number: '21', name: 'Joel Embiid', draft: '2014', pick: '3', age: '30', position: 'Center', height: '7-0', weight: '280', currentTeam: 'Philadelphia Sixer'},
    ],
  },
  Serbia: {
    players: [
      { id: 1, number: '13', name: 'Bogdan Bogdanović', draft: '2014', pick: '27', age: '31', position: 'Guard', height: '6-5', weight: '220',   currentTeam: 'Atlanta Hawks'},
      { id: 2, number: '15', name: 'Nikola Jokić', draft: '2014', pick: '41', age: '29', position: 'Center', height: '6-11', weight: '284', currentTeam: 'Denver Nuggets'},
    ],
  },
  Germany: {
    players: [
      { id: 1, number: '17', name: 'Dennis Schröder', draft: '2013', pick: '17', age: '30', position: 'Guard', height: '6-1', weight: '172',   currentTeam: 'Brooklyn Nets'},
      { id: 2, number: '22', name: 'Franz Wagner', draft: '2021', pick: '8', age: '22', position: 'Forward', height: '6-10', weight: '225', currentTeam: 'Orlando Magic'},
      { id: 3, number: '10', name: 'Daniel Theis', draft: '2013', pick: 'undraft', age: '32', position: 'Center', height: '6-8', weight: '245',  currentTeam: 'New Orleans Pelicans'},
      { id: 4, number: '21', name: 'Moritz Wagner', draft: '2018', pick: '25', age: '27', position: 'Center', height: '6-11', weight: '245',   currentTeam: 'Orlando Magic'},
    ],
  },
  Greece:{
    players:[

    ],
  },
};

//建立路由 .get(Path, (Request, Response))
app.get('/api/teams', (req, res) => { 
  res.json(teams); //以json格式回傳
});

//取出整支球隊
app.get('/api/teams/:teamName', (req, res) => { 
  const { teamName } = req.params;
  const teamData = teams[teamName];

  if (teamData) {
    res.json(teamData);
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
});

let nextId = 0;
//新增球員
app.post('/api/teams/:teamName/players', (req, res) => { 
  const { teamName } = req.params;
  const teamData = teams[teamName];

  if (teamData) {
    const newPlayer = req.body;
    newPlayer.id = nextId++; // 分配新的 id
    teamData.players.push(newPlayer); //新加入的球員
    res.status(201).json(newPlayer);
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
})

//刪除球員
app.delete('/api/teams/:teamName/players/:playerId', (req, res) => { 
  const { teamName, playerId } = req.params;

  if (!teams[teamName]) {
    return res.status(404).json({ message: 'Team not found' });
  }

  const updatedPlayers = teams[teamName].players.filter(player => player.id !== parseInt(playerId)); // 過濾掉要刪除的球員
  teams[teamName].players = updatedPlayers; // 更新球員陣列
  res.json({ message: 'Player deleted successfully' });
});

//更新球員資料
app.put('/api/teams/:teamName/players/:playerId', (req, res) => {
  const { teamName, playerId } = req.params;
  const { number, name, draft, pick, age, position } = req.body; // 提取所有需要更新的屬性

  const team = teams[teamName];
  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }

  const playerIndex = team.players.findIndex(player => player.id === parseInt(playerId));
  if (playerIndex === -1) {
    return res.status(404).json({ message: 'Player not found' });
  }

  // 更新球員資料
  team.players[playerIndex] = {
    ...team.players[playerIndex],
    number,
    name,
    draft,
    pick,
    age,
    position
  };

  res.json({ message: 'Player updated successfully', player: team.players[playerIndex] });
});


app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});