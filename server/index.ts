import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const games = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('createGame', (gameId: string) => {
    games.set(gameId, { player1: socket.id, player2: null, player1Decks: null, player2Decks: null });
    socket.join(gameId);
    console.log(`Game created: ${gameId}`);
  });

  socket.on('joinGame', (gameId: string) => {
    const game = games.get(gameId);
    if (game && !game.player2) {
      game.player2 = socket.id;
      socket.join(gameId);
      io.to(gameId).emit('gameJoined', { player1: game.player1, player2: game.player2 });
      console.log(`Player 2 joined game: ${gameId}`);
    } else {
      socket.emit('gameError', 'Game not found or already full');
    }
  });

  socket.on('submitDecks', ({ gameId, decks, isPlayer1 }: { gameId: string, decks: string[], isPlayer1: boolean }) => {
    const game = games.get(gameId);
    if (game) {
      if (isPlayer1) {
        game.player1Decks = decks;
      } else {
        game.player2Decks = decks;
      }
      io.to(gameId).emit('decksSubmitted', { isPlayer1, decks });
      console.log(`Decks submitted for game ${gameId} by ${isPlayer1 ? 'Player 1' : 'Player 2'}`);
    }
  });

  socket.on('banDeck', ({ gameId, bannedDeck, isPlayer1 }: { gameId: string, bannedDeck: string, isPlayer1: boolean }) => {
    const game = games.get(gameId);
    if (game) {
      io.to(gameId).emit('deckBanned', { isPlayer1, bannedDeck });
      console.log(`Deck banned in game ${gameId} by ${isPlayer1 ? 'Player 1' : 'Player 2'}: ${bannedDeck}`);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    for (const [gameId, game] of games.entries()) {
      if (game.player1 === socket.id || game.player2 === socket.id) {
        io.to(gameId).emit('playerDisconnected');
        games.delete(gameId);
        console.log(`Game ${gameId} ended due to player disconnection`);
      }
    }
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});