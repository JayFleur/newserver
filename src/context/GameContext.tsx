import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import io, { Socket } from 'socket.io-client';

interface GameContextType {
  socket: Socket | null;
  gameId: string | null;
  setGameId: (id: string) => void;
  playerDecks: string[];
  setPlayerDecks: (decks: string[]) => void;
  opponentDecks: string[];
  setOpponentDecks: (decks: string[]) => void;
  bannedDeck: string | null;
  setBannedDeck: (deck: string) => void;
  isPlayer1: boolean;
  setIsPlayer1: (isPlayer1: boolean) => void;
  player1Ready: boolean;
  setPlayer1Ready: (ready: boolean) => void;
  player2Ready: boolean;
  setPlayer2Ready: (ready: boolean) => void;
  createGame: () => void;
  joinGame: (gameId: string) => void;
  submitDecks: (decks: string[]) => void;
  banDeck: (deck: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider')
  }
  return context
}

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameId, setGameId] = useState<string | null>(null)
  const [playerDecks, setPlayerDecks] = useState<string[]>([])
  const [opponentDecks, setOpponentDecks] = useState<string[]>([])
  const [bannedDeck, setBannedDeck] = useState<string | null>(null)
  const [isPlayer1, setIsPlayer1] = useState<boolean>(true)
  const [player1Ready, setPlayer1Ready] = useState<boolean>(false)
  const [player2Ready, setPlayer2Ready] = useState<boolean>(false)

  useEffect(() => {
    const newSocket = io('https://chimerical-cocada-76fc13.netlify.app');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const createGame = () => {
    if (socket) {
      try {
        const newGameId = 'game-' + Math.random().toString(36).substr(2, 9);
        setGameId(newGameId);
        setIsPlayer1(true);
        socket.emit('createGame', newGameId);
      } catch (error) {
        console.error('Error creating game:', error);
        // Handle the error, maybe show a user-friendly message
      }
    } else {
      console.error('Socket is not initialized');
      // Handle the case when socket is not available
    }
  };

  const joinGame = (gameId: string) => {
    if (socket) {
      setGameId(gameId);
      setIsPlayer1(false);
      socket.emit('joinGame', gameId);
    } else {
      console.error('Socket is not initialized');
      // Handle the case when socket is not available
    }
  };

  const submitDecks = (decks: string[]) => {
    if (socket && gameId) {
      setPlayerDecks(decks);
      socket.emit('submitDecks', { gameId, decks, isPlayer1 });
    } else {
      console.error('Socket or gameId is not initialized');
      // Handle the case when socket or gameId is not available
    }
  };

  const banDeck = (deck: string) => {
    if (socket && gameId) {
      setBannedDeck(deck);
      socket.emit('banDeck', { gameId, bannedDeck: deck, isPlayer1 });
    } else {
      console.error('Socket or gameId is not initialized');
      // Handle the case when socket or gameId is not available
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('gameJoined', (data) => {
        console.log('Game joined:', data);
      });

      socket.on('decksSubmitted', ({ isPlayer1: submittedByPlayer1, decks }) => {
        if (submittedByPlayer1 !== isPlayer1) {
          setOpponentDecks(decks);
          submittedByPlayer1 ? setPlayer1Ready(true) : setPlayer2Ready(true);
        }
      });

      socket.on('deckBanned', ({ isPlayer1: bannedByPlayer1, bannedDeck }) => {
        if (bannedByPlayer1 !== isPlayer1) {
          setBannedDeck(bannedDeck);
        }
      });

      socket.on('playerDisconnected', () => {
        alert('The other player has disconnected. The game will end.');
        // Reset game state or navigate to a new game setup
      });

      socket.on('gameError', (error) => {
        console.error('Game error:', error);
        alert('An error occurred: ' + error);
      });

      // Handle connection errors
      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        alert('Unable to connect to the game server. Please try again later.');
      });
    }
  }, [socket, isPlayer1]);

  return (
    <GameContext.Provider
      value={{
        socket,
        gameId,
        setGameId,
        playerDecks,
        setPlayerDecks,
        opponentDecks,
        setOpponentDecks,
        bannedDeck,
        setBannedDeck,
        isPlayer1,
        setIsPlayer1,
        player1Ready,
        setPlayer1Ready,
        player2Ready,
        setPlayer2Ready,
        createGame,
        joinGame,
        submitDecks,
        banDeck,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}