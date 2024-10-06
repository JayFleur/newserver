import express, { Router } from 'express';
import serverless from 'serverless-http';

const api = Router();

api.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

api.post('/createGame', (req, res) => {
  // Implement game creation logic
  res.json({ gameId: 'game-' + Math.random().toString(36).substr(2, 9) });
});

api.post('/joinGame', (req, res) => {
  // Implement game joining logic
  res.json({ message: 'Joined game successfully' });
});

api.post('/submitDecks', (req, res) => {
  // Implement deck submission logic
  res.json({ message: 'Decks submitted successfully' });
});

api.post('/banDeck', (req, res) => {
  // Implement deck banning logic
  res.json({ message: 'Deck banned successfully' });
});

const app = express();
app.use('/api/', api);

export const handler = serverless(app);