import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Individual Puzzle Piece Component
interface PuzzlePieceProps {
  position: [number, number, number];
  finalPosition: [number, number, number];
  rotation: [number, number, number];
  color: string;
  delay: number;
  index: number;
}

const PuzzlePiece = ({ position, finalPosition, rotation, color, delay, index }: PuzzlePieceProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (meshRef.current) {
      // Set initial scattered position
      meshRef.current.position.set(...position);
      meshRef.current.rotation.set(...rotation);

      // Animate to final position with GSAP
      gsap.to(meshRef.current.position, {
        x: finalPosition[0],
        y: finalPosition[1],
        z: finalPosition[2],
        duration: 2,
        delay: delay,
        ease: "power3.out",
      });

      gsap.to(meshRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        delay: delay,
        ease: "power3.out",
      });
    }
  }, [position, finalPosition, rotation, delay]);

  // Gentle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + index) * 0.0003;
    }
  });

  // Create jigsaw puzzle piece shape
  const createPuzzleShape = () => {
    const shape = new THREE.Shape();
    const size = 1;

    // Main square
    shape.moveTo(-size / 2, -size / 2);
    shape.lineTo(size / 2, -size / 2);

    // Right edge with tab
    if (Math.random() > 0.5) {
      shape.lineTo(size / 2, -size / 6);
      shape.bezierCurveTo(size / 2, -size / 6, size / 2 + 0.15, -size / 12, size / 2 + 0.15, 0);
      shape.bezierCurveTo(size / 2 + 0.15, size / 12, size / 2, size / 6, size / 2, size / 6);
    }

    shape.lineTo(size / 2, size / 2);

    // Top edge with tab
    if (Math.random() > 0.5) {
      shape.lineTo(size / 6, size / 2);
      shape.bezierCurveTo(size / 6, size / 2, size / 12, size / 2 + 0.15, 0, size / 2 + 0.15);
      shape.bezierCurveTo(-size / 12, size / 2 + 0.15, -size / 6, size / 2, -size / 6, size / 2);
    }

    shape.lineTo(-size / 2, size / 2);
    shape.lineTo(-size / 2, -size / 2);

    return shape;
  };

  const extrudeSettings = {
    steps: 1,
    depth: 0.15,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 3,
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <extrudeGeometry args={[createPuzzleShape(), extrudeSettings]} />
      <meshStandardMaterial
        color={hovered ? '#60A5FA' : color}
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={1}
      />
    </mesh>
  );
};

// Rubik's Cube Component
const RubiksCube = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.x += 0.003;
      groupRef.current.rotation.y += 0.005;
    }
  });

  const cubeSize = 0.32;
  const gap = 0.05;
  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#ffffff', '#eab308'];

  const cubes = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubes.push([x * (cubeSize + gap), y * (cubeSize + gap), z * (cubeSize + gap)]);
      }
    }
  }

  return (
    <group
      ref={groupRef}
      position={[4, 2, 0]}
      onPointerOver={() => setAutoRotate(false)}
      onPointerOut={() => setAutoRotate(true)}
    >
      {cubes.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
          <meshStandardMaterial
            color={colors[i % colors.length]}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main Scene Component
const Scene = () => {
  // Generate puzzle pieces
  const puzzlePieces = [];
  const rows = 4;
  const cols = 5;
  const spacing = 1.2;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const finalX = (j - cols / 2) * spacing;
      const finalY = (i - rows / 2) * spacing;
      const finalZ = 0;

      // Scattered initial position
      const initialX = (Math.random() - 0.5) * 15;
      const initialY = (Math.random() - 0.5) * 15;
      const initialZ = (Math.random() - 0.5) * 10 - 5;

      // Random rotation
      const rotX = (Math.random() - 0.5) * Math.PI * 2;
      const rotY = (Math.random() - 0.5) * Math.PI * 2;
      const rotZ = (Math.random() - 0.5) * Math.PI * 2;

      // Color gradient from blue to purple
      const hue = 200 + (i / rows) * 60;
      const color = `hsl(${hue}, 70%, 50%)`;

      puzzlePieces.push({
        position: [initialX, initialY, initialZ] as [number, number, number],
        finalPosition: [finalX, finalY, finalZ] as [number, number, number],
        rotation: [rotX, rotY, rotZ] as [number, number, number],
        color,
        delay: (i * cols + j) * 0.05,
        index: i * cols + j,
      });
    }
  }

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#3b82f6" />

      <Environment preset="city" />

      {puzzlePieces.map((piece, index) => (
        <PuzzlePiece key={index} {...piece} />
      ))}

      <RubiksCube />
      <FloatingParticles />

      {/* Background plane */}
      <mesh position={[0, 0, -5]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
      </mesh>
    </>
  );
};

// Main PuzzleScene Component
const PuzzleScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
  );
};

export default PuzzleScene;
