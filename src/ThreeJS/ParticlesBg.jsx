import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticlesBg() {
  const pointsRef = useRef();
  const count = 1500;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const cyan = new THREE.Color('#06b6d4');
    const purple = new THREE.Color('#8b5cf6');
    const pink = new THREE.Color('#d946ef');
    const colorChoices = [cyan, purple, pink];

    for (let i = 0; i < count; i++) {
      // Box range positions
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;

      // Select a random neon color
      const chosenColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Slow drift rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.015;
      pointsRef.current.rotation.x = time * 0.005;

      // Light parallax based on mouse
      const mouseX = state.pointer.x * 2.5;
      const mouseY = state.pointer.y * 2.5;
      
      pointsRef.current.position.x += (mouseX - pointsRef.current.position.x) * 0.05;
      pointsRef.current.position.y += (mouseY - pointsRef.current.position.y) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
