import React, { createContext, useContext, useReducer, useRef } from 'react'

const GameContext = createContext()

const initialState = {
  gameState: 'playing', // 'playing', 'gameOver', 'paused'
  score: 0,
  distance: 0,
  speed: 1,
  coins: 0,
  lives: 1,
  carPosition: 0, // -1, 0, 1 for left, center, right lanes
  babyState: 'normal', // 'normal', 'jumping', 'ducking'
  monsterDistance: 50,
  obstacles: [],
  collectibles: []
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'MOVE_CAR':
      return {
        ...state,
        carPosition: Math.max(-1, Math.min(1, state.carPosition + action.direction))
      }
    
    case 'BABY_JUMP':
      return {
        ...state,
        babyState: state.babyState === 'normal' ? 'jumping' : state.babyState
      }
    
    case 'BABY_DUCK':
      return {
        ...state,
        babyState: state.babyState === 'normal' ? 'ducking' : state.babyState
      }
    
    case 'BABY_NORMAL':
      return {
        ...state,
        babyState: 'normal'
      }
    
    case 'COLLECT_COIN':
      return {
        ...state,
        coins: state.coins + 1,
        score: state.score + 10
      }
    
    case 'UPDATE_DISTANCE':
      return {
        ...state,
        distance: state.distance + action.delta,
        speed: Math.min(3, 1 + state.distance * 0.01),
        monsterDistance: Math.max(5, state.monsterDistance - action.delta * 0.1)
      }
    
    case 'HIT_OBSTACLE':
      return {
        ...state,
        gameState: 'gameOver'
      }
    
    case 'MONSTER_CAUGHT':
      return {
        ...state,
        gameState: 'gameOver'
      }
    
    case 'RESTART_GAME':
      return {
        ...initialState,
        gameState: 'playing'
      }
    
    case 'ADD_OBSTACLE':
      return {
        ...state,
        obstacles: [...state.obstacles, action.obstacle]
      }
    
    case 'ADD_COLLECTIBLE':
      return {
        ...state,
        collectibles: [...state.collectibles, action.collectible]
      }
    
    case 'UPDATE_OBSTACLES':
      return {
        ...state,
        obstacles: state.obstacles
          .map(obs => ({ ...obs, z: obs.z + state.speed }))
          .filter(obs => obs.z < 20)
      }
    
    case 'UPDATE_COLLECTIBLES':
      return {
        ...state,
        collectibles: state.collectibles
          .map(col => ({ ...col, z: col.z + state.speed }))
          .filter(col => col.z < 20)
      }
    
    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const gameLoopRef = useRef()

  const value = {
    ...state,
    dispatch,
    gameLoopRef
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}