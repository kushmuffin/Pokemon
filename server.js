import express from 'express'; // 建立伺服器
import cors from 'cors'; // 中間件，用來解決跨域資源共享問題，允許不同來源的請求訪問您的伺服器。

const app = express();
const port = 3000;

app.use(cors()); // 使用 cors 中間件

const teams = {
  USA:[
    { number: '4', name: 'Stephen Curry', position: 'Guard', Height: '6-2', Weight: '185', Age: '36', CurrentTeam: 'Golden State Warriors'},
    { number: '5', name: 'Anthony Edwards', position: 'Guard', Height: '6-4', Weight: '225', Age: '22', CurrentTeam: 'Minnesota Timberwolves'},
    { number: '6', name: 'LeBron James', position: 'Forward', Height: '6-9', Weight: '250', Age: '39', CurrentTeam: 'Los Angeles Lakers'},
    { number: '7', name: 'Kevin Durant', position: 'Forward', Height: '6-10', Weight: '225', Age: '35', CurrentTeam: 'Phoenix Sun'},
    { number: '8', name: 'Derrick White', position: 'Guard', Height: '6-4', Weight: '190', Age: '30', CurrentTeam: 'Boston Celtic'},
    { number: '9', name: 'Tyrese Haliburton', position: 'Guard', Height: '6-5', Weight: '185', Age: '24', CurrentTeam: 'Indiana Pacer'},
    { number: '10', name: 'Jayson Tatum', position: 'Forward', Height: '6-8', Weight: '205', Age: '26', CurrentTeam: 'Boston Celti'},
    { number: '11', name: 'Joel Embiid', position: 'Center', Height: '7-0', Weight: '280', Age: '30', CurrentTeam: 'Philadelphia Sixer'},
    { number: '12', name: 'Jrue Holiday', position: 'Guard', Height: '6-3', Weight: '229', Age: '34', CurrentTeam: 'Boston Celti'},
    { number: '13', name: 'Bam Adebayo', position: 'Center', Height: '6-9', Weight: '225', Age: '27', CurrentTeam: 'Miami Heat'},
    { number: '14', name: 'Anthony Davis', position: 'Forward', Height: '6-10', Weight: '253', Age: '31', CurrentTeam: 'Los Angeles Lakers'},
    { number: '15', name: 'Devin Booker', position: 'Guard', Height: '6-5', Weight: '206', Age: '27', CurrentTeam: 'Phoenix Sun'},
  ]
};

app.get('/api/teams', (req, res) => {
  res.json(teams);
});

app.get('/api/teams/:teamName', (req, res) => {
  const { teamName } = req.params;
  const teamData = teams[teamName];

  if (teamData) {
    res.json(teamData);
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
});

app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});