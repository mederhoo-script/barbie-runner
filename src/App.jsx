import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Game from './components/Game'
import WalletConnect from './components/WalletConnect'
import GameHUD from './components/GameHUD'
import GameOverScreen from './components/GameOverScreen'
import LoadingScreen from './components/LoadingScreen'
import { GameProvider } from './hooks/useGame.jsx'
import { WalletProvider } from './hooks/useWallet.jsx'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <WalletProvider>
      <GameProvider>
        <div className="app">
          <Canvas
            camera={{ position: [0, 5, 10], fov: 60 }}
            gl={{ antialias: true, alpha: false }}
            onCreated={({ gl }) => {
              gl.setClearColor('#87CEEB')
            }}
          >
            <Game />
          </Canvas>
          
          <div className="ui-overlay">
            <WalletConnect />
            <GameHUD />
            <GameOverScreen />
            
            <div className="controls-info">
              <div>Arrow Keys: Move Car Left/Right</div>
              <div>Space: Jump | Shift: Duck</div>
            </div>
          </div>
        </div>
      </GameProvider>
    </WalletProvider>
  )
}

export default App