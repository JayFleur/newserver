import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';

const WaitingRoom: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { 
    isPlayer1, 
    player1Ready, 
    player2Ready,
  } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (player1Ready && player2Ready) {
      navigate(`/ban/${gameId}`);
    }
  }, [gameId, player1Ready, player2Ready, navigate]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-white">Waiting Room</h2>
      <p className="text-gray-300">
        {isPlayer1
          ? player2Ready
            ? "Player 2 has submitted their decks. Waiting to start the ban phase..."
            : "Waiting for Player 2 to submit their decks..."
          : player1Ready
          ? "Player 1 has submitted their decks. Waiting to start the ban phase..."
          : "Waiting for Player 1 to submit their decks..."}
      </p>
    </div>
  );
};

export default WaitingRoom;