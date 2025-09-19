import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import Car from './3D/Car'
import Baby from './3D/Baby'
import Monster from './3D/Monster'
import Road from './3D/Road'
import Obstacle from './3D/Obstacle'
import Coin from './3D/Coin'
import Environment3D from './3D/Environment3D'
import { useGame } from '../hooks/useGame.jsx'

function Game() {
  const { 
    gameState, 
    carPosition, 
    obstacles, 
    collectibles, 
    speed, 
    dispatch,
    gameLoopRef 
  } = useGame()
  
  const gameRef = useRef()
  const timeRef = useRef(0)
  const lastObstacleTime = useRef(0)
  const lastCoinTime = useRef(0)

  // Game controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameState !== 'playing') return

      switch (event.code) {
        case 'ArrowLeft':
          dispatch({ type: 'MOVE_CAR', direction: -1 })
          break
        case 'ArrowRight':
          dispatch({ type: 'MOVE_CAR', direction: 1 })
          break
        case 'Space':
          event.preventDefault()
          dispatch({ type: 'BABY_JUMP' })
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          dispatch({ type: 'BABY_DUCK' })
          break
      }
    }

    const handleKeyUp = (event) => {
      if (gameState !== 'playing') return

      switch (event.code) {
        case 'Space':
        case 'ShiftLeft':
        case 'ShiftRight':
          dispatch({ type: 'BABY_NORMAL' })
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameState, dispatch])

  // Game loop
  useFrame((state, delta) => {
    if (gameState !== 'playing') return

    timeRef.current += delta

    // Update distance
    dispatch({ type: 'UPDATE_DISTANCE', delta: delta * speed * 10 })

    // Spawn obstacles
    if (timeRef.current - lastObstacleTime.current > 2 / speed) {
      const lane = Math.floor(Math.random() * 3) - 1 // -1, 0, 1
      const type = Math.random() > 0.5 ? 'barrier' : 'block'
      
      dispatch({
        type: 'ADD_OBSTACLE',
        obstacle: {
          id: Math.random(),
          x: lane * 2,
          y: type === 'barrier' ? 0.5 : 1,
          z: -50,
          type,
          lane
        }
      })
      lastObstacleTime.current = timeRef.current
    }

    // Spawn coins
    if (timeRef.current - lastCoinTime.current > 1.5 / speed) {
      const lane = Math.floor(Math.random() * 3) - 1
      
      dispatch({
        type: 'ADD_COLLECTIBLE',
        collectible: {
          id: Math.random(),
          x: lane * 2,
          y: 2,
          z: -50,
          type: 'coin',
          lane
        }
      })
      lastCoinTime.current = timeRef.current
    }

    // Update obstacles and collectibles
    dispatch({ type: 'UPDATE_OBSTACLES' })
    dispatch({ type: 'UPDATE_COLLECTIBLES' })

    // Check collisions
    obstacles.forEach(obstacle => {
      if (obstacle.z > -2 && obstacle.z < 2 && obstacle.lane === carPosition) {
        dispatch({ type: 'HIT_OBSTACLE' })
      }
    })

    // Check coin collection
    collectibles.forEach(collectible => {
      if (collectible.z > -2 && collectible.z < 2 && collectible.lane === carPosition) {
        dispatch({ type: 'COLLECT_COIN' })
        // Remove collected coin
        dispatch({ 
          type: 'UPDATE_COLLECTIBLES'
        })
      }
    })
  })

  return (
    <group ref={gameRef}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      {/* Environment */}
      <Environment3D />
      
      {/* Road */}
      <Road />
      
      {/* Player car */}
      <Car position={[carPosition * 2, 0, 0]} />
      
      {/* Baby */}
      <Baby position={[carPosition * 2, 1.5, 0]} />
      
      {/* Monster */}
      <Monster position={[0, 0, 15]} />
      
      {/* Obstacles */}
      {obstacles.map(obstacle => (
        <Obstacle
          key={obstacle.id}
          position={[obstacle.x, obstacle.y, obstacle.z]}
          type={obstacle.type}
        />
      ))}
      
      {/* Coins */}
      {collectibles.map(coin => (
        <Coin
          key={coin.id}
          position={[coin.x, coin.y, coin.z]}
        />
      ))}
      
      {/* Camera controls disabled during gameplay */}
    </group>
  )
}

export default Game