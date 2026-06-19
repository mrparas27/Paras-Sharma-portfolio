import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS_LIST = [
  "Python", "SQL", "Pandas", "NumPy",
  "Machine Learning", "Deep Learning", "PyTorch", "TensorFlow",
  "OpenCV", "YOLO", "Computer Vision", "MongoDB",
  "MySQL", "Git", "React", "AI Pipelines"
];

function SkillTag({ text, position }) {
  const tagRef = useRef();

  return (
    <Html
      position={position}
      center
      distanceFactor={6}
      style={{
        transition: 'all 0.2s ease',
        pointerEvents: 'none'
      }}
    >
      <div className="px-3.5 py-1.5 rounded-lg border border-cyber-cyan/30 bg-cyber-dark/85 backdrop-blur-md text-white font-mono text-[10px] md:text-xs tracking-wider whitespace-nowrap shadow-lg shadow-cyber-cyan/5 hover:border-cyber-pink hover:text-cyber-pink hover:shadow-cyber-pink/20 transition-all select-none">
        {text}
      </div>
    </Html>
  );
}

export default function SkillsGlobe() {
  const groupRef = useRef();

  // Compute uniform distribution of positions on a sphere
  const tags = useMemo(() => {
    const temp = [];
    const count = SKILLS_LIST.length;
    const radius = 3.5; // Radius of sphere

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      temp.push({
        text: SKILLS_LIST[i],
        position: new THREE.Vector3(x, y, z)
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Dynamic rotation speed based on mouse pointer coordinates
      const targetSpeedX = state.pointer.x * 0.4;
      const targetSpeedY = state.pointer.y * 0.4;

      groupRef.current.rotation.y += 0.004 + targetSpeedX * 0.015;
      groupRef.current.rotation.x += 0.002 - targetSpeedY * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Subtle core reference sphere wireframe */}
      <mesh>
        <sphereGeometry args={[2.8, 16, 16]} />
        <meshBasicMaterial
          wireframe={true}
          color="#8b5cf6"
          transparent={true}
          opacity={0.06}
        />
      </mesh>
      
      {/* Map out all tags */}
      {tags.map((tag, idx) => (
        <SkillTag key={idx} text={tag.text} position={tag.position} />
      ))}
    </group>
  );
}
