import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function AIAvatar({ isTalking = false, isThinking = false }) {
  const avatarGroup = useRef();
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Mouse follow rotation (smooth damping)
    if (avatarGroup.current) {
      const targetX = state.pointer.x * 0.8;
      const targetY = state.pointer.y * 0.6;
      avatarGroup.current.rotation.y += (targetX - avatarGroup.current.rotation.y) * 0.1;
      avatarGroup.current.rotation.x += (-targetY - avatarGroup.current.rotation.x) * 0.1;
    }

    // Spin outer rings
    if (ring1Ref.current) ring1Ref.current.rotation.x = time * 1.2;
    if (ring2Ref.current) ring2Ref.current.rotation.y = time * 0.8;
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 1.5;

    // Core pulsing animation based on status
    if (coreRef.current) {
      if (isTalking) {
        // High frequency active pulse
        const scaleVal = 1.1 + Math.sin(time * 18) * 0.15;
        coreRef.current.scale.set(scaleVal, scaleVal, scaleVal);
        coreRef.current.material.color.set(new THREE.Color('#d946ef')); // Magenta when speaking
      } else if (isThinking) {
        // Fast breathing pulse
        const scaleVal = 1.0 + Math.sin(time * 10) * 0.08;
        coreRef.current.scale.set(scaleVal, scaleVal, scaleVal);
        coreRef.current.material.color.set(new THREE.Color('#8b5cf6')); // Purple when thinking
      } else {
        // Slow calm breathe
        const scaleVal = 0.95 + Math.sin(time * 2.5) * 0.05;
        coreRef.current.scale.set(scaleVal, scaleVal, scaleVal);
        coreRef.current.material.color.set(new THREE.Color('#06b6d4')); // Cyan when idle
      }
    }
  });

  return (
    <group ref={avatarGroup}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Core Glowing Sphere */}
        <mesh ref={coreRef} castShadow receiveShadow>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshPhysicalMaterial
            wireframe={true}
            roughness={0.1}
            metalness={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            emissive={new THREE.Color('#03000a')}
            emissiveIntensity={0.5}
            transparent={true}
            opacity={0.8}
          />
        </mesh>

        {/* Outer Ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.8, 0.04, 8, 64]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.8}
            metalness={1.0}
            roughness={0.0}
          />
        </mesh>

        {/* Outer Ring 2 */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.1, 0.03, 8, 64]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.8}
            metalness={1.0}
            roughness={0.0}
          />
        </mesh>

        {/* Outer Ring 3 */}
        <mesh ref={ring3Ref}>
          <torusGeometry args={[2.4, 0.02, 8, 64]} />
          <meshStandardMaterial
            color="#d946ef"
            emissive="#d946ef"
            emissiveIntensity={0.8}
            metalness={1.0}
            roughness={0.0}
          />
        </mesh>
      </Float>
    </group>
  );
}
