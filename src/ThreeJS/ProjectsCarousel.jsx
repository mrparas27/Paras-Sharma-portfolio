import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function ProjectsCarousel({ projects, activeIndex, setActiveIndex }) {
  const groupRef = useRef();
  const radius = 5.2; // Radius of circular carousel wheel
  const count = projects.length;

  useFrame(() => {
    if (groupRef.current) {
      // Calculate target rotation to bring the active card to the front (0 rotation)
      const targetRotationY = -activeIndex * ((2 * Math.PI) / count);
      
      // Smooth interpolation (lerp)
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {projects.map((project, idx) => {
        // Distribute cards evenly in a circle
        const theta = (idx * (2 * Math.PI)) / count;
        const x = radius * Math.sin(theta);
        const z = radius * Math.cos(theta);

        const isActive = activeIndex === idx;

        return (
          <group 
            key={project.id} 
            position={[x, 0, z]} 
            rotation={[0, theta, 0]}
          >
            {/* The 3D Glass Card Container */}
            <mesh>
              <boxGeometry args={[3.2, 2.2, 0.05]} />
              <meshPhysicalMaterial
                color={isActive ? "#0d0a18" : "#050308"}
                roughness={0.1}
                metalness={0.9}
                clearcoat={1.0}
                transparent={true}
                opacity={0.4}
                transmission={0.6}
                thickness={0.5}
                border={isActive ? "1px solid cyan" : "none"}
              />
            </mesh>

            {/* Inner HTML details wrapper */}
            <Html
              transform
              distanceFactor={3.6}
              position={[0, 0, 0.03]}
              className="pointer-events-auto"
            >
              <div 
                onClick={() => setActiveIndex(idx)}
                className={`w-96 h-64 rounded-2xl flex flex-col justify-between p-6 cursor-pointer select-none transition-all duration-500 border ${
                  isActive 
                    ? 'bg-cyber-dark/85 border-cyber-cyan shadow-xl shadow-cyan-500/25 scale-102' 
                    : 'bg-black/60 border-white/10 hover:border-cyber-purple/50 opacity-60 scale-95 hover:opacity-90'
                }`}
              >
                <div className="text-left">
                  <span className="text-[10px] font-mono tracking-widest text-cyber-purple uppercase">
                    PROJECT_0{idx + 1}
                  </span>
                  <h4 className="font-heading font-black text-xl text-white mt-1 group-hover:text-cyber-cyan transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs text-gray-300 mt-3 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="text-left">
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Active status or prompt */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 border-t border-white/5 pt-3">
                    <span>STATUS: COMPILED</span>
                    {isActive ? (
                      <span className="text-cyber-cyan animate-pulse">● ACTIVE_FOCUS</span>
                    ) : (
                      <span className="text-gray-600">CLICK TO FOCUS</span>
                    )}
                  </div>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
