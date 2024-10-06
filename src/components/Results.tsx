import React from 'react'
import { useGameContext } from '../context/GameContext'

const Results: React.FC = () => {
  const { playerDecks, opponentDecks, bannedDeck, isPlayer1 } = useGameContext()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Game Results</h2>
      <div>
        <h3 className="font-medium text-white">Your Decks:</h3>
        <ul className="list-disc list-inside text-gray-300">
          {playerDecks.map((deck, index) => (
            <li key={index} className={isPlayer1 ? (bannedDeck === deck ? 'line-through text-red-500' : '') : ''}>
              {deck} {isPlayer1 ? (bannedDeck === deck && '(Banned by opponent)') : ''}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-medium text-white">Opponent's Decks:</h3>
        <ul className="list-disc list-inside text-gray-300">
          {opponentDecks.map((deck, index) => (
            <li key={index} className={!isPlayer1 ? (bannedDeck === deck ? 'line-through text-red-500' : '') : ''}>
              {deck} {!isPlayer1 ? (bannedDeck === deck && '(Banned by opponent)') : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Results