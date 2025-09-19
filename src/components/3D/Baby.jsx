import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGame } from '../../hooks/useGame.jsx'

function Baby({ position }) {
  const babyRef = useRef()
  const { babyState } = useGame()
  
  useFrame((state) => {
    if (!babyRef.current) return
    
    const time = state.clock.elapsedTime
    
    switch (babyState) {
      case 'jumping':
        babyRef.current.position.y = position[1] + Math.abs(Math.sin(time * 8)) * 1.5
        break
      case 'ducking':
        babyRef.current.position.y = position[1] - 0.5
        break
      default:
        babyRef.current.position.y = position[1] + Math.sin(time * 3) * 0.1
        break
    }
  })

  return (
    <group ref={babyRef} position={position}>
      {/* Baby head */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial color="#FDBCB4" />
      </mesh>
      
      {/* Baby hair */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.3, 8, 6]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      
      {/* Baby body */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.6]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>
      
      {/* Baby arms */}
      <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4]} />
        <meshStandardMaterial color="#FDBCB4" />
      </mesh>
      <mesh position={[-0.3, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4]} />
        <meshStandardMaterial color="#FDBCB4" />
      </mesh>
      
      {/* Baby legs */}
      <mesh position={[0.1, -0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4]} />
        <meshStandardMaterial color="#FDBCB4" />
      </mesh>
      <mesh position={[-0.1, -0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4]} />
        <meshStandardMaterial color="#FDBCB4" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.1, 0.85, 0.2]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.1, 0.85, 0.2]}>
        <sphereGeometry args={[0.03]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )
}

export default Baby