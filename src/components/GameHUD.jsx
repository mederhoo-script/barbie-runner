import React from 'react'
import { useGame } from '../hooks/useGame.jsx'

function GameHUD() {
  const { score, distance, coins, speed, monsterDistance, gameState } = useGame()

  if (gameState !== 'playing') {
    return null
  }

  return (
    <div className="game-hud">
      <div>Score: {score}</div>
      <div>Distance: {Math.floor(distance)}m</div>
      <div>Coins: {coins}</div>
      <div>Speed: {speed.toFixed(1)}x</div>
      <div>Monster: {Math.floor(monsterDistance)}m behind</div>
    </div>
  )
}

export default GameHUD