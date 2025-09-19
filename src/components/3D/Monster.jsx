import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Monster({ position }) {
  const monsterRef = useRef()
  
  useFrame((state) => {
    if (monsterRef.current) {
      // Monster movement and animation
      monsterRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.2
      monsterRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={monsterRef} position={position}>
      {/* Monster body */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.8, 8, 6]} />
        <meshStandardMaterial color="#4B0082" />
      </mesh>
      
      {/* Monster head */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.6]} />
        <meshStandardMaterial color="#483D8B" />
      </mesh>
      
      {/* Monster eyes */}
      <mesh position={[0.2, 2.2, 0.5]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.2, 2.2, 0.5]}>
        <sphereGeometry args={[0.1]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Monster mouth */}
      <mesh position={[0, 1.8, 0.5]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Monster arms */}
      <mesh position={[0.8, 1.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.15, 0.1, 1]} />
        <meshStandardMaterial color="#4B0082" />
      </mesh>
      <mesh position={[-0.8, 1.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.15, 0.1, 1]} />
        <meshStandardMaterial color="#4B0082" />
      </mesh>
      
      {/* Monster legs */}
      <mesh position={[0.3, 0.2, 0]}>
        <cylinderGeometry args={[0.2, 0.15, 0.8]} />
        <meshStandardMaterial color="#4B0082" />
      </mesh>
      <mesh position={[-0.3, 0.2, 0]}>
        <cylinderGeometry args={[0.2, 0.15, 0.8]} />
        <meshStandardMaterial color="#4B0082" />
      </mesh>
      
      {/* Spiky details */}
      <mesh position={[0, 2.6, 0]}>
        <coneGeometry args={[0.2, 0.4]} />
        <meshStandardMaterial color="#483D8B" />
      </mesh>
      <mesh position={[0.3, 2.4, 0]}>
        <coneGeometry args={[0.15, 0.3]} />
        <meshStandardMaterial color="#483D8B" />
      </mesh>
      <mesh position={[-0.3, 2.4, 0]}>
        <coneGeometry args={[0.15, 0.3]} />
        <meshStandardMaterial color="#483D8B" />
      </mesh>
    </group>
  )
}

export default Monster