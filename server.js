import express from 'express';

const app = express();
const port = 3000;

const fruits = [
  { name: 'Apple', color: 'Red' },
  { name: 'Banana', color: 'Yellow' },
  { name: 'Grape', color: 'Purple' },
  { name: 'Orange', color: 'Orange' },
  { name: 'Strawberry', color: 'Red' }
];

app.get('/api/fruits', (req, res) => {
  res.json(fruits);
});

app.listen(port, () => {
  console.log(`API server is running at http://localhost:${port}`);
});
