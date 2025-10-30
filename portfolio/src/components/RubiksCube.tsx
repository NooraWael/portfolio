// components/RubiksCube.tsx
import { useRef, useState } from 'react';
import { GroupProps, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type RubiksCubeProps = GroupProps & {
  scale?: number;
  floatAmplitude?: number;
};

// Individual Cube Piece Component
const CubePiece = ({
  position,
  color,
  index,
  onHover,
  onUnhover,
  isHovered
}: {
  position: [number, number, number];
  color: string;
  index: number;
  onHover: (index: number) => void;
  onUnhover: () => void;
  isHovered: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseColorRef = useRef<THREE.Color | null>(null);
  const hoverProgress = useRef(0);

  useFrame(() => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    const material = mesh.material as THREE.MeshStandardMaterial;

    // Smooth animation
    const target = isHovered ? 1 : 0;
    hoverProgress.current = THREE.MathUtils.lerp(hoverProgress.current, target, 0.15);

    // Store base color on first frame
    if (!baseColorRef.current) {
      baseColorRef.current = new THREE.Color(color);
    }

    const baseColor = baseColorRef.current;
    const progress = hoverProgress.current;

    if (progress > 0.01) {
      // Slightly brighten color for metallic pop
      const brightColor = baseColor.clone().lerp(new THREE.Color(0xffffff), progress * 0.3);
      material.color.copy(brightColor);

      // Strong emissive with white tint for metallic shine
      const emissiveColor = baseColor.clone().lerp(new THREE.Color(0xffffff), progress * 0.5);
      material.emissive.copy(emissiveColor);
      material.emissiveIntensity = progress * 0.4;

      // Ultra polished chrome-like surface
      material.metalness = 1;
      material.roughness = THREE.MathUtils.lerp(0.15, 0.0, progress); // Mirror smooth
      material.envMapIntensity = THREE.MathUtils.lerp(2, 12, progress); // Very strong reflections

      // No scaling
      mesh.scale.setScalar(1);
    } else {
      // Reset to normal
      material.color.copy(baseColor);
      material.emissive.set(0x000000);
      material.emissiveIntensity = 0.1;
      material.metalness = 1;
      material.roughness = 0.15;
      material.envMapIntensity = 2;
      mesh.scale.setScalar(1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      castShadow
      receiveShadow
      onPointerEnter={(e) => {
        e.stopPropagation();
        onHover(index);
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        onUnhover();
        document.body.style.cursor = 'auto';
      }}
    >
      <boxGeometry args={[0.32, 0.32, 0.32]} />
      <meshStandardMaterial
        metalness={1}
        roughness={0.15}
        color={color}
        envMapIntensity={2}
        emissive="#000000"
        emissiveIntensity={0.1}
        toneMapped={false}
      />
    </mesh>
  );
};

const RubiksCube = ({
  scale = 1,
  floatAmplitude = 0.3,
  ...groupProps
}: RubiksCubeProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cubeSize = 0.32;
  const gap = 0.05;

  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#ffffff', '#eab308'];

  // Generate all 27 cube positions
  const cubes: Array<{ pos: [number, number, number]; index: number; color: string }> = [];
  let index = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubes.push({
          pos: [x * (cubeSize + gap), y * (cubeSize + gap), z * (cubeSize + gap)],
          index: index,
          color: colors[index % colors.length]
        });
        index++;
      }
    }
  }

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();

      // Continuous rotation
      groupRef.current.rotation.y = t * 0.4;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;

      // Floating animation
      groupRef.current.position.y += Math.sin(t * 1.5) * floatAmplitude * 0.01;

      // Keep scale consistent - no scaling on hover
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group
      ref={groupRef}
      {...groupProps}
      onPointerLeave={() => {
        setHoveredIndex(null);
        document.body.style.cursor = 'auto';
      }}
    >
      {cubes.map((cube) => (
        <CubePiece
          key={cube.index}
          position={cube.pos}
          color={cube.color}
          index={cube.index}
          onHover={setHoveredIndex}
          onUnhover={() => setHoveredIndex(null)}
          isHovered={hoveredIndex === cube.index}
        />
      ))}
    </group>
  );
};

export default RubiksCube;
