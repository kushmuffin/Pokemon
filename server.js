import express from 'express'; // 建立伺服器
import cors from 'cors'; // 中間件，用來解決跨域資源共享問題，允許不同來源的請求訪問伺服器。
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors()); // 使用 cors 中間件
app.use(bodyParser.json()); // 新增這行來解析 JSON 請求

const teams = {
  USA:[
    { number: '0', name: 'Tyrese Haliburton', draft: '2020', pick: '12', age: '24', position: 'Guard', height: '6-5', weight: '185', currentTeam: 'Indiana Pacer'},
    { number: '1', name: 'Devin Booker', draft: '2015', pick: '13', age: '27', position: 'Guard', height: '6-5', weight: '206', currentTeam: 'Phoenix Sun'},
    { number: '4', name: 'Jrue Holiday', draft: '2009', pick: '17', age: '34', position: 'Guard', height: '6-3', weight: '229', currentTeam: 'Boston Celtic'},
    { number: '5', name: 'Anthony Edwards', draft: '2020', pick: '1', age: '22', position: 'Guard', height: '6-4', weight: '225', currentTeam: 'Minnesota Timberwolves'},
    { number: '9', name: 'Derrick White', draft: '2017', pick: '29', age: '30', position: 'Guard', height: '6-4', weight: '190', currentTeam: 'Boston Celtic'},
    { number: '30', name: 'Stephen Curry', draft: '2009', pick: '7', age: '36', position: 'Guard', height: '6-2', weight: '185', currentTeam: 'Golden State Warriors'},
    { number: '0', name: 'Jayson Tatum', draft: '2017', pick: '3', age: '26', position: 'Forward', height: '6-8', weight: '205', currentTeam: 'Boston Celtic'},
    { number: '3', name: 'Anthony Davis', draft: '2012', pick: '1', age: '31', position: 'Forward', height: '6-10', weight: '253', currentTeam: 'Los Angeles Lakers'},
    { number: '6', name: 'LeBron James', draft: '2003', pick: '1', age: '39', position: 'Forward', height: '6-9', weight: '250', currentTeam: 'Los Angeles Lakers'},
    { number: '35', name: 'Kevin Durant', draft: '2007', pick: '2', age: '35', position: 'Forward', height: '6-10', weight: '225', currentTeam: 'Phoenix Sun'},
    { number: '13', name: 'Bam Adebayo', draft: '2017', pick: '14', age: '27', position: 'Center', height: '6-9', weight: '225', currentTeam: 'Miami Heat'},
    { number: '21', name: 'Joel Embiid', draft: '2014', pick: '3', age: '30', position: 'Center', height: '7-0', weight: '280', currentTeam: 'Philadelphia Sixer'},
  ],
  Serbia:[
    { number: '13', name: 'Bogdan Bogdanović', draft: '2014', pick: '27', age: '31', position: 'Guard', height: '6-5', weight: '220', currentTeam: 'Atlanta Hawks'},
    { number: '15', name: 'Nikola Jokić', draft: '2014', pick: '41', age: '29', position: 'Center', height: '6-11', weight: '284', currentTeam: 'Denver Nuggets'},
    
  ],
  Germany:[
    { number: '17', name: 'Dennis Schröder', draft: '2013', pick: '17', age: '30', position: 'Guard', height: '6-1', weight: '172', currentTeam: 'Brooklyn Nets'},
    { number: '22', name: 'Franz Wagner', draft: '2021', pick: '8', age: '22', position: 'Forward', height: '6-10', weight: '225', currentTeam: 'Orlando Magic'},
    { number: '10', name: 'Daniel Theis', draft: '2013', pick: 'undraft', age: '32', position: 'Center', height: '6-8', weight: '245', currentTeam: 'New Orleans Pelicans'},
    { number: '21', name: 'Moritz Wagner', draft: '2018', pick: '25', age: '27', position: 'Center', height: '6-11', weight: '245', currentTeam: 'Orlando Magic'},

  ],
  Greece:[
    
  ]
};

app.get('/api/teams', (req, res) => { //建立路由 .get(Path, (Request, Response))
  res.json(teams); //以json格式回傳
});

app.get('/api/teams/:teamName', (req, res) => { //取出整支球隊
  const { teamName } = req.params;
  const teamData = teams[teamName];

  if (teamData) {
    res.json(teamData);
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
});

app.post('/api/teams/:teamName/players', (req, res) => { //新增球員
  const { teamName } = req.params;
  const teamData = teams[teamName];

  if (teamData) {
    const newPlayer = req.body;
    teamData.push(newPlayer);
    res.status(201).json(newPlayer);
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
})

app.delete('/api/teams/:teamName/players/:playerName', (req, res) => { //刪除球員
  const { teamName, playerName } = req.params;
  
  if (!teams[teamName]) { // 確保該隊伍存在
    return res.status(404).json({ message: 'Team not found' });
  }
  const updatedPlayers = teams[teamName].filter(player => player.name !== playerName); // 過濾掉要刪除的球員
  teams[teamName] = updatedPlayers;
  res.json({ message: 'Player deleted successfully' });
})

app.put('/api/teams/:teamName/players/:playerName', (req, res) => {
  const { teamName, playerName } = req.params;
  const { newPlayerName, newPlayerPosition } = req.body;
  
  const team = teams[teamName];
  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }
  
  const playerIndex = team.findIndex(player => player.name === playerName);
  if (playerIndex === -1) {
    return res.status(404).json({ message: 'Player not found' });
  }

  team[playerIndex] = {
    ...team[playerIndex],
    name: newPlayerName,
    position: newPlayerPosition
  };
  
  res.json({ message: 'Player updated successfully', player: team[playerIndex] });
});

app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});