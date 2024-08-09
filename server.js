import express from 'express'; // 建立伺服器
import cors from 'cors'; // 中間件，用來解決跨域資源共享問題，允許不同來源的請求訪問伺服器。
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors()); // 使用 cors 中間件
app.use(bodyParser.json()); // 新增這行來解析 JSON 請求

const teams = {
  USA:[
    { number: '0', name: 'Tyrese Haliburton', position: 'Guard', height: '6-5', weight: '185', age: '24', currentTeam: 'Indiana Pacer'},
    { number: '1', name: 'Devin Booker', position: 'Guard', height: '6-5', weight: '206', age: '27', currentTeam: 'Phoenix Sun'},
    { number: '4', name: 'Jrue Holiday', position: 'Guard', height: '6-3', weight: '229', age: '34', currentTeam: 'Boston Celtic'},
    { number: '5', name: 'Anthony Edwards', position: 'Guard', height: '6-4', weight: '225', age: '22', currentTeam: 'Minnesota Timberwolves'},
    { number: '9', name: 'Derrick White', position: 'Guard', height: '6-4', weight: '190', age: '30', currentTeam: 'Boston Celtic'},
    { number: '30', name: 'Stephen Curry', position: 'Guard', height: '6-2', weight: '185', age: '36', currentTeam: 'Golden State Warriors'},
    { number: '0', name: 'Jayson Tatum', position: 'Forward', height: '6-8', weight: '205', age: '26', currentTeam: 'Boston Celtic'},
    { number: '3', name: 'Anthony Davis', position: 'Forward', height: '6-10', weight: '253', age: '31', currentTeam: 'Los Angeles Lakers'},
    { number: '6', name: 'LeBron James', position: 'Forward', height: '6-9', weight: '250', age: '39', currentTeam: 'Los Angeles Lakers'},
    { number: '35', name: 'Kevin Durant', position: 'Forward', height: '6-10', weight: '225', age: '35', currentTeam: 'Phoenix Sun'},
    { number: '13', name: 'Bam Adebayo', position: 'Center', height: '6-9', weight: '225', age: '27', currentTeam: 'Miami Heat'},
    { number: '21', name: 'Joel Embiid', position: 'Center', height: '7-0', weight: '280', age: '30', currentTeam: 'Philadelphia Sixer'},
  ],
  Serbia:[
    { number: '13', name: 'Bogdan Bogdanović', position: 'Guard', height: '6-5', weight: '220', age: '31', currentTeam: 'Atlanta Hawks'},
    { number: '15', name: 'Nikola Jokić', position: 'Center', height: '6-11', weight: '284', age: '29', currentTeam: 'Denver Nuggets'},
    
  ],
  Germany:[
    { number: '17', name: 'Dennis Schröder', position: 'Guard', height: '6-1', weight: '172', age: '30', currentTeam: 'Brooklyn Nets'},
    { number: '22', name: 'Franz Wagner', position: 'Forward', height: '6-10', weight: '225', age: '22', currentTeam: 'Orlando Magic'},
    { number: '10', name: 'Daniel Theis', position: 'Center', height: '6-8', weight: '245', age: '32', currentTeam: 'New Orleans Pelicans'},
    { number: '21', name: 'Moritz Wagner', position: 'Center', height: '6-11', weight: '245', age: '27', currentTeam: 'Orlando Magic'},

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

app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});