import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';

const BanPhase: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { opponentDecks, bannedDeck, banDeck, isPlayer1 } = useGameContext();
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (bannedDeck) {
      navigate(`/results/${gameId}`);
    }
  }, [bannedDeck, gameId, navigate]);

  const handleBan = async () => {
    if (selectedDeck) {
      banDeck(selectedDeck);
      setIsWaiting(true);
    }
  };

  if (isWaiting) {
    return <div className="text-center text-white">Waiting for opponent to ban...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Select a deck to ban:</h2>
      {opponentDecks.map((deck, index) => (
        <button
          key={index}
          onClick={() => setSelectedDeck(deck)}
          className={`w-full p-2 text-left border rounded ${
            selectedDeck === deck ? 'bg-red-900 border-red-500' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
          } text-white`}
        >
          {deck}
        </button>
      ))}
      <button
        onClick={handleBan}
        disabled={!selectedDeck}
        className="btn btn-primary w-full"
      >
        Ban Selected Deck
      </button>
    </div>
  );
};

export default BanPhase;