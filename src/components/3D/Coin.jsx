import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Coin({ position }) {
  const coinRef = useRef()
  
  useFrame((state) => {
    if (coinRef.current) {
      coinRef.current.rotation.y = state.clock.elapsedTime * 3
      coinRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.2
    }
  })

  return (
    <group ref={coinRef} position={position}>
      {/* Main coin body */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Coin detail */}
      <mesh position={[0, 0, 0.06]}>
        <cylinderGeometry args={[0.25, 0.25, 0.01]} />
        <meshStandardMaterial color="#FFA500" />
      </mesh>
      
      {/* Sparkle effect */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[0.1, 0.1]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          transparent 
          opacity={0.8}
          emissive="#FFFFFF"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

export default Coin