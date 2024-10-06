import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DeckSubmission from './components/DeckSubmission'
import WaitingRoom from './components/WaitingRoom'
import BanPhase from './components/BanPhase'
import Results from './components/Results'
import { GameProvider } from './context/GameContext'
import ParallelLogo from './components/ParallelLogo'

function App() {
  return (
    <Router>
      <GameProvider>
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center mb-6">
              <ParallelLogo className="mr-2" />
              <h1 className="text-2xl font-bold text-white">Parallel Stats</h1>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-center mb-6 text-white">Ban Tool</h2>
              <Routes>
                <Route path="/" element={<DeckSubmission />} />
                <Route path="/waiting/:gameId" element={<WaitingRoom />} />
                <Route path="/ban/:gameId" element={<BanPhase />} />
                <Route path="/results/:gameId" element={<Results />} />
              </Routes>
            </div>
          </div>
        </div>
      </GameProvider>
    </Router>
  )
}

export default App