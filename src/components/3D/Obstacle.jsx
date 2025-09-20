import React from 'react'

function Obstacle({ position, type }) {
  if (type === 'barrier') {
    return (
      <group position={position}>
        {/* Low barrier */}
        <mesh>
          <boxGeometry args={[1.5, 0.8, 0.3]} />
          <meshStandardMaterial color="#FF4500" />
        </mesh>
        
        {/* Warning stripes */}
        <mesh position={[0, 0, 0.16]}>
          <boxGeometry args={[1.6, 0.2, 0.01]} />
          <meshStandardMaterial color="#FFFF00" />
        </mesh>
        <mesh position={[0, 0.3, 0.16]}>
          <boxGeometry args={[1.6, 0.2, 0.01]} />
          <meshStandardMaterial color="#FFFF00" />
        </mesh>
      </group>
    )
  }
  
  // Block obstacle
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1.5, 2, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Warning sign */}
      <mesh position={[0, 1.5, 0.6]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial color="#FFFF00" />
      </mesh>
      <mesh position={[0, 1.5, 0.61]}>
        <planeGeometry args={[0.6, 0.6]} />
        <meshStandardMaterial color="#FF0000" />
      </mesh>
    </group>
  )
}

export default Obstacle