// import express from 'express'; // 建立伺服器
// import cors from 'cors'; // 中間件，用來解決跨域資源共享問題，允許不同來源的請求訪問伺服器。
// import bodyParser from 'body-parser';

// const app = express();
// const port = 3000;

// app.use(cors()); // 使用 cors 中間件
// app.use(bodyParser.json()); // 新增這行來解析 JSON 請求

// const teams = {
//   Boston_Celtic: {
//     conference: 'Eastern',
//     division: 'Atlantic',
//     arena: 'TD Garden',
//     location: 'Boston, Massachusetts',
//     owner: [
//       'Boston Basketball Partners',
//     ],
//     general: 'Brad Stevens',
//     head_coach: 'Joe Mazzulla',
//     championships: 18,
//     players: [
//       { id: 1, number: '7', name: 'Jaylen Brown', draft: '2016', pick: '3', age: '27', position: 'Guard', height: '6-6', weight: '223' },
//       { id: 2, number: '4', name: 'Jrue Holiday', draft: '2009', pick: '17', age: '34', position: 'Guard', height: '6-3', weight: '229' },
//       { id: 3, number: '9', name: 'Derrick White', draft: '2017', pick: '29', age: '30', position: 'Guard', height: '6-4', weight: '190' },
//       { id: 4, number: '0', name: 'Jayson Tatum', draft: '2017', pick: '3', age: '26', position: 'Forward', height: '6-8', weight: '205' },
//       { id: 5, number: '42', name: 'Al Horford', draft: '2007', pick: '3', age: '38', position: 'Center', height: '6-9', weight: '240' },
//     ],
//   },
//   Los_Angeles_Lakers: {
//     conference: 'Western',
//     division: 'Pacific',
//     arena: 'Crypto.com Arena',
//     location: 'Los Angeles, California',
//     owner: [
//       'Jeanie Buss', 'Buss Family Trusts', 
//     ],
//     general: 'Rob Pelinka',
//     head_coach: 'JJ Redick',
//     championships: 17,
//     players: [
//       { id: 1, number: '1', name: 'DAngelo Russell', draft: '2015', pick: '2', age: '28', position: 'Guard', height: '6-3', weight: '193' },
//       { id: 2, number: '15', name: 'Austin Reaves', draft: 'undraft', pick: 'undraft', age: '26', position: 'Guard', height: '6-5', weight: '206' },
//       { id: 3, number: '28', name: 'Rui Hachimura', draft: '2019', pick: '9', age: '26', position: 'Forward', height: '6-8', weight: '250' },
//       { id: 4, number: '6', name: 'LeBron James', draft: '2003', pick: '1', age: '39', position: 'Forward', height: '6-9', weight: '250' },
//       { id: 5, number: '3', name: 'Anthony Davis', draft: '2012', pick: '1', age: '31', position: 'Forward', height: '6-10', weight: '253' },
//     ],
//   },
// };

// //建立路由 .get(Path, (Request, Response))
// app.get('/api/teams', (req, res) => { 
//   res.json(teams); //以json格式回傳
// });

// //取出整支球隊
// app.get('/api/teams/:teamName', (req, res) => { 
//   const { teamName } = req.params;
//   const teamData = teams[teamName];

//   if (teamData) {
//     res.json(teamData);
//   } else {
//     res.status(404).json({ message: 'Team not found' });
//   }
// });

// let nextId = 0;
// //新增球員
// app.post('/api/teams/:teamName/players', (req, res) => { 
//   const { teamName } = req.params;
//   const teamData = teams[teamName];

//   if (teamData) {
//     const newPlayer = req.body;
//     newPlayer.id = nextId++; // 分配新的 id
//     teamData.players.push(newPlayer); //新加入的球員
//     res.status(201).json(newPlayer);
//   } else {
//     res.status(404).json({ message: 'Team not found' });
//   }
// })

// //刪除球員
// app.delete('/api/teams/:teamName/players/:playerId', (req, res) => { 
//   const { teamName, playerId } = req.params;

//   if (!teams[teamName]) {
//     return res.status(404).json({ message: 'Team not found' });
//   }

//   const updatedPlayers = teams[teamName].players.filter(player => player.id !== parseInt(playerId)); // 過濾掉要刪除的球員
//   teams[teamName].players = updatedPlayers; // 更新球員陣列
//   res.json({ message: 'Player deleted successfully' });
// });

// //更新球員資料
// app.put('/api/teams/:teamName/players/:playerId', (req, res) => {
//   const { teamName, playerId } = req.params;
//   const { number, name, draft, pick, age, position } = req.body; // 提取所有需要更新的屬性

//   const team = teams[teamName];
//   if (!team) {
//     return res.status(404).json({ message: 'Team not found' });
//   }

//   const playerIndex = team.players.findIndex(player => player.id === parseInt(playerId));
//   if (playerIndex === -1) {
//     return res.status(404).json({ message: 'Player not found' });
//   }

//   // 更新球員資料
//   team.players[playerIndex] = {
//     ...team.players[playerIndex],
//     number,
//     name,
//     draft,
//     pick,
//     age,
//     position
//   };

//   res.json({ message: 'Player updated successfully', player: team.players[playerIndex] });
// });


// app.listen(port, () => {
//   console.log(`API server is running at http://localhost:${port}`);
// });