import React from 'react'
import { useGame } from '../hooks/useGame.jsx'
import { useWallet } from '../hooks/useWallet.jsx'
import TokenContract from '../utils/TokenContract.jsx'

function GameOverScreen() {
  const { gameState, score, distance, coins, dispatch } = useGame()
  const { isConnected, signer } = useWallet()

  const handleRestart = () => {
    dispatch({ type: 'RESTART_GAME' })
  }

  const handleClaimTokens = async () => {
    if (!isConnected || !signer || coins === 0) return

    try {
      const tokenContract = new TokenContract(signer)
      await tokenContract.mintTokens(coins)
      alert(`Successfully minted ${coins} BARBIE tokens!`)
    } catch (error) {
      console.error('Error claiming tokens:', error)
      alert('Error claiming tokens. Please try again.')
    }
  }

  if (gameState !== 'gameOver') {
    return null
  }

  return (
    <div className="game-over-screen">
      <h2>Game Over!</h2>
      <p>Final Score: {score}</p>
      <p>Distance: {Math.floor(distance)}m</p>
      <p>Coins Collected: {coins}</p>
      
      {isConnected && coins > 0 && (
        <button 
          className="restart-button" 
          onClick={handleClaimTokens}
          style={{ marginRight: '10px', background: '#4CAF50' }}
        >
          Claim {coins} BARBIE Tokens
        </button>
      )}
      
      <button className="restart-button" onClick={handleRestart}>
        Play Again
      </button>
      
      {!isConnected && coins > 0 && (
        <p style={{ fontSize: '16px', marginTop: '20px' }}>
          Connect your wallet to claim {coins} BARBIE tokens!
        </p>
      )}
    </div>
  )
}

export default GameOverScreen