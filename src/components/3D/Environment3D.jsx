import React from 'react'

function Environment3D() {
  return (
    <group>
      {/* City buildings */}
      {Array.from({ length: 20 }, (_, i) => (
        <group key={i}>
          {/* Left side buildings */}
          <mesh position={[-15 + Math.random() * 5, 2 + Math.random() * 8, -100 + i * 10]}>
            <boxGeometry args={[3 + Math.random() * 2, 4 + Math.random() * 8, 3 + Math.random() * 2]} />
            <meshStandardMaterial color={`hsl(${300 + Math.random() * 60}, 70%, ${60 + Math.random() * 20}%)`} />
          </mesh>
          
          {/* Right side buildings */}
          <mesh position={[15 + Math.random() * 5, 2 + Math.random() * 8, -100 + i * 10]}>
            <boxGeometry args={[3 + Math.random() * 2, 4 + Math.random() * 8, 3 + Math.random() * 2]} />
            <meshStandardMaterial color={`hsl(${300 + Math.random() * 60}, 70%, ${60 + Math.random() * 20}%)`} />
          </mesh>
        </group>
      ))}
      
      {/* Palm trees */}
      {Array.from({ length: 15 }, (_, i) => (
        <group key={`tree-${i}`} position={[8 + Math.random() * 4, 0, -80 + i * 12]}>
          {/* Tree trunk */}
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 4]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          
          {/* Palm leaves */}
          {Array.from({ length: 6 }, (_, j) => (
            <mesh 
              key={j} 
              position={[Math.cos(j) * 1.5, 4.5, Math.sin(j) * 1.5]}
              rotation={[0, j, Math.PI / 6]}
            >
              <planeGeometry args={[2, 0.5]} />
              <meshStandardMaterial color="#228B22" side={2} />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Decorative elements */}
      {Array.from({ length: 10 }, (_, i) => (
        <group key={`decor-${i}`}>
          {/* Street lamps */}
          <mesh position={[5, 0, -50 + i * 20]}>
            <cylinderGeometry args={[0.1, 0.1, 3]} />
            <meshStandardMaterial color="#696969" />
          </mesh>
          <mesh position={[5, 3.2, -50 + i * 20]}>
            <sphereGeometry args={[0.3]} />
            <meshStandardMaterial color="#FFFFE0" emissive="#FFFFE0" emissiveIntensity={0.3} />
          </mesh>
          
          <mesh position={[-5, 0, -50 + i * 20]}>
            <cylinderGeometry args={[0.1, 0.1, 3]} />
            <meshStandardMaterial color="#696969" />
          </mesh>
          <mesh position={[-5, 3.2, -50 + i * 20]}>
            <sphereGeometry args={[0.3]} />
            <meshStandardMaterial color="#FFFFE0" emissive="#FFFFE0" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}
      
      {/* Floating balloons */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh 
          key={`balloon-${i}`} 
          position={[
            -10 + Math.random() * 20, 
            8 + Math.random() * 5, 
            -60 + i * 15
          ]}
        >
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial color={`hsl(${Math.random() * 360}, 80%, 70%)`} />
        </mesh>
      ))}
      
      {/* Ground grass patches */}
      {Array.from({ length: 30 }, (_, i) => (
        <mesh 
          key={`grass-${i}`}
          position={[
            -12 + Math.random() * 24, 
            0.05, 
            -100 + i * 6
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1 + Math.random(), 1 + Math.random()]} />
          <meshStandardMaterial color="#90EE90" />
        </mesh>
      ))}
    </group>
  )
}

export default Environment3D