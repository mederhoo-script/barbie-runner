import React from 'react'
import { Plane } from '@react-three/drei'

function Road() {
  return (
    <group>
      {/* Main road */}
      <Plane args={[8, 200]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -50]}>
        <meshStandardMaterial color="#2C2C2C" />
      </Plane>
      
      {/* Road markings */}
      {Array.from({ length: 40 }, (_, i) => (
        <group key={i}>
          {/* Center line */}
          <Plane 
            args={[0.2, 2]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -0.05, -100 + i * 5]}
          >
            <meshStandardMaterial color="#FFFF00" />
          </Plane>
          
          {/* Lane separators */}
          <Plane 
            args={[0.1, 1]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[2, -0.05, -100 + i * 5]}
          >
            <meshStandardMaterial color="#FFFFFF" />
          </Plane>
          <Plane 
            args={[0.1, 1]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[-2, -0.05, -100 + i * 5]}
          >
            <meshStandardMaterial color="#FFFFFF" />
          </Plane>
        </group>
      ))}
      
      {/* Road edges */}
      <Plane args={[0.5, 200]} rotation={[-Math.PI / 2, 0, 0]} position={[4.25, -0.05, -50]}>
        <meshStandardMaterial color="#FFFFFF" />
      </Plane>
      <Plane args={[0.5, 200]} rotation={[-Math.PI / 2, 0, 0]} position={[-4.25, -0.05, -50]}>
        <meshStandardMaterial color="#FFFFFF" />
      </Plane>
      
      {/* Sidewalks */}
      <Plane args={[4, 200]} rotation={[-Math.PI / 2, 0, 0]} position={[6, 0, -50]}>
        <meshStandardMaterial color="#C0C0C0" />
      </Plane>
      <Plane args={[4, 200]} rotation={[-Math.PI / 2, 0, 0]} position={[-6, 0, -50]}>
        <meshStandardMaterial color="#C0C0C0" />
      </Plane>
    </group>
  )
}

export default Road