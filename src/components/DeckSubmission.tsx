import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGameContext } from '../context/GameContext'
import { Share2 } from 'lucide-react'

const DeckSubmission: React.FC = () => {
  const [decks, setDecks] = useState(['', '', ''])
  const {
    gameId,
    setGameId,
    isPlayer1,
    setIsPlayer1,
    createGame,
    joinGame,
    submitDecks,
  } = useGameContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [shareableLink, setShareableLink] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const gameIdFromUrl = params.get('gameId')
    if (gameIdFromUrl) {
      setGameId(gameIdFromUrl)
      setIsPlayer1(false)
      joinGame(gameIdFromUrl)
    } else {
      createGame()
    }
  }, [location, setGameId, setIsPlayer1, createGame, joinGame])

  useEffect(() => {
    if (gameId) {
      const link = `${window.location.origin}?gameId=${gameId}`
      setShareableLink(link)
    }
  }, [gameId])

  const handleDeckChange = (index: number, value: string) => {
    const newDecks = [...decks]
    newDecks[index] = value
    setDecks(newDecks)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (decks.every(deck => deck.trim() !== '')) {
      submitDecks(decks)
      navigate(`/waiting/${gameId}`)
    } else {
      alert('Please fill in all deck names')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink)
    alert('Link copied to clipboard!')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {isPlayer1 ? "Player 1: Submit Your Decks" : "Player 2: Submit Your Decks"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {decks.map((deck, index) => (
          <input
            key={index}
            type="text"
            value={deck}
            onChange={(e) => handleDeckChange(index, e.target.value)}
            placeholder={`Deck ${index + 1}`}
            className="input w-full"
            required
          />
        ))}
        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Submit Decks
        </button>
      </form>
      {isPlayer1 && shareableLink && (
        <div className="mt-6 p-4 bg-gray-700 border border-gray-600 rounded">
          <h3 className="text-lg font-semibold mb-2 text-white">Share with Opponent</h3>
          <p className="mb-2 text-gray-300">Use this link to invite your opponent to the game:</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shareableLink}
              readOnly
              className="input flex-grow"
            />
            <button
              onClick={copyToClipboard}
              className="btn btn-secondary flex items-center"
            >
              <Share2 className="w-5 h-5 mr-1" />
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeckSubmission