import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'

function Car({ position }) {
  const carRef = useRef()
  
  useFrame((state) => {
    // Gentle hover animation
    if (carRef.current) {
      carRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={carRef} position={position}>
      {/* Car body - pink convertible */}
      <Box args={[1.5, 0.8, 3]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#FF69B4" />
      </Box>
      
      {/* Car hood */}
      <Box args={[1.3, 0.3, 1]} position={[0, 0.85, 1]}>
        <meshStandardMaterial color="#FF1493" />
      </Box>
      
      {/* Windshield */}
      <Box args={[1.2, 0.8, 0.1]} position={[0, 1.2, 0.5]}>
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
      </Box>
      
      {/* Wheels */}
      <group>
        {/* Front wheels */}
        <mesh position={[0.8, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2]} />
          <meshStandardMaterial color="#2C2C2C" />
        </mesh>
        <mesh position={[-0.8, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2]} />
          <meshStandardMaterial color="#2C2C2C" />
        </mesh>
        
        {/* Back wheels */}
        <mesh position={[0.8, 0, -1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2]} />
          <meshStandardMaterial color="#2C2C2C" />
        </mesh>
        <mesh position={[-0.8, 0, -1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2]} />
          <meshStandardMaterial color="#2C2C2C" />
        </mesh>
      </group>
      
      {/* Headlights */}
      <mesh position={[0.4, 0.6, 1.6]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#FFFFE0" emissive="#FFFFE0" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.4, 0.6, 1.6]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#FFFFE0" emissive="#FFFFE0" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

export default Car