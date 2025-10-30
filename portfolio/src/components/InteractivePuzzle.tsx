import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Float, Sparkles as DreiSparkles } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface ClickablePuzzlePieceProps {
  position: [number, number, number];
  index: number;
  onClick: (index: number) => void;
  isActive: boolean;
  color: string;
}

const ClickablePuzzlePiece = ({ position, index, onClick, isActive, color }: ClickablePuzzlePieceProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (meshRef.current && isActive) {
      gsap.to(meshRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
      gsap.to(meshRef.current.position, {
        z: position[2] + 0.5,
        duration: 0.3,
      });
    } else if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
      });
      gsap.to(meshRef.current.position, {
        z: position[2],
        duration: 0.3,
      });
    }
  }, [isActive, position]);

  useFrame((state) => {
    if (meshRef.current && (isActive || hovered)) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={() => onClick(index)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      <boxGeometry args={[0.8, 0.8, 0.15]} />
      <meshStandardMaterial
        color={isActive || hovered ? '#60A5FA' : color}
        metalness={0.8}
        roughness={0.2}
        emissive={isActive ? '#3b82f6' : '#000000'}
        emissiveIntensity={isActive ? 0.5 : 0}
      />
    </mesh>
  );
};

// 3D Text Component
const AnimatedText = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center position={position}>
        <mesh>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
        </mesh>
      </Center>
    </Float>
  );
};

// Main Interactive Scene
const InteractiveScene = () => {
  const [activePieces, setActivePieces] = useState<Set<number>>(new Set());

  const handlePieceClick = (index: number) => {
    setActivePieces((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const pieces = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const x = (j - 1) * 1;
      const y = (i - 1) * 1;
      const index = i * 3 + j;
      const hue = 200 + (index / 9) * 60;

      pieces.push(
        <ClickablePuzzlePiece
          key={index}
          position={[x, y, 0]}
          index={index}
          onClick={handlePieceClick}
          isActive={activePieces.has(index)}
          color={`hsl(${hue}, 70%, 50%)`}
        />
      );
    }
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#3b82f6" />

      <DreiSparkles
        count={50}
        scale={[10, 10, 10]}
        size={2}
        speed={0.3}
        color="#3b82f6"
      />

      {pieces}

      {/* Orbiting particles */}
      {[...Array(5)].map((_, i) => (
        <AnimatedText
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 3,
            Math.sin((i / 5) * Math.PI * 2) * 3,
            -2,
          ]}
        />
      ))}
    </>
  );
};

const InteractivePuzzle = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} shadows>
        <InteractiveScene />
      </Canvas>
    </div>
  );
};

export default InteractivePuzzle;
