// PuzzlePiece.tsx
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

interface PuzzlePieceProps {
  position: [number, number, number];
  finalPosition: [number, number, number];
  rotation: [number, number, number];
  color: string;
  delay: number;
  index: number;
}

const PuzzlePiece = ({
  position,
  finalPosition,
  rotation,
  color,
  delay,
  index,
}: PuzzlePieceProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animate entrance to final position
  useEffect(() => {
    if (!meshRef.current) return;

    meshRef.current.position.set(...position);
    meshRef.current.rotation.set(...rotation);

    gsap.to(meshRef.current.position, {
      x: finalPosition[0],
      y: finalPosition[1],
      z: finalPosition[2],
      duration: 2,
      delay,
      ease: 'power3.out',
    });

    gsap.to(meshRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      delay,
      ease: 'power3.out',
    });
  }, [position, finalPosition, rotation, delay]);

  // Floating motion
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + index) * 0.0003;
    }
  });

  // Custom jigsaw shape
  const createPuzzleShape = () => {
    const shape = new THREE.Shape();
    const size = 1;

    // Start from bottom-left corner
    shape.moveTo(-size / 2, -size / 2);
    shape.lineTo(size / 2, -size / 2);

    // Right edge with tab or blank
    if (Math.random() > 0.5) {
      shape.lineTo(size / 2, -size / 6);
      shape.bezierCurveTo(size / 2, -size / 6, size / 2 + 0.15, -size / 12, size / 2 + 0.15, 0);
      shape.bezierCurveTo(size / 2 + 0.15, size / 12, size / 2, size / 6, size / 2, size / 6);
    }

    shape.lineTo(size / 2, size / 2);

    // Top edge
    if (Math.random() > 0.5) {
      shape.lineTo(size / 6, size / 2);
      shape.bezierCurveTo(size / 6, size / 2, size / 12, size / 2 + 0.15, 0, size / 2 + 0.15);
      shape.bezierCurveTo(-size / 12, size / 2 + 0.15, -size / 6, size / 2, -size / 6, size / 2);
    }

    shape.lineTo(-size / 2, size / 2);
    shape.lineTo(-size / 2, -size / 2);

    return shape;
  };

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
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
        metalness={0.6}
        roughness={0.3}
        envMapIntensity={1.2}
      />
    </mesh>
  );
};

export default PuzzlePiece;
