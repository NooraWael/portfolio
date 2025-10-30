// components/RubiksCube.tsx
import { useEffect, useRef, useState } from 'react';
import { GroupProps, ThreeEvent, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type RubiksCubeProps = Omit<GroupProps, 'scale'> & {
  scale?: number;
  floatAmplitude?: number;
  hovered?: boolean;
};

const RubiksCube = ({
  scale = 1,
  floatAmplitude = 0.3,
  hovered = false,
  ...groupProps
}: RubiksCubeProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredPiece, setHoveredPiece] = useState<number | null>(null);
  const cubeSize = 0.32;
  const gap = 0.05;
  const hoverStrength = useRef(0);
  const pieceHoverStrength = useRef<Map<number, number>>(new Map());

  const colors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#ffffff', '#eab308'];

  const cubes = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubes.push([x * (cubeSize + gap), y * (cubeSize + gap), z * (cubeSize + gap)]);
      }
    }
  }

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scale);
    }
  }, [scale]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      hoverStrength.current = THREE.MathUtils.lerp(
        hoverStrength.current,
        hovered ? 1 : 0,
        0.08
      );

      groupRef.current.rotation.y = t * 0.6;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.3;
      groupRef.current.rotation.z = hoverStrength.current * 0.2;
      groupRef.current.position.y = Math.sin(t * 1.5) * (floatAmplitude + hoverStrength.current * 0.2);

      const currentScale = groupRef.current.scale.x;
      const targetScale = scale * (1 + hoverStrength.current * 0.12);
      const lerpedScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
      groupRef.current.scale.setScalar(lerpedScale);

      // Update individual cube pieces
      groupRef.current.children.forEach((child, index) => {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;

        if (material) {
          // Initialize base colors if not already done
          if (!material.userData.baseColor) {
            material.userData.baseColor = material.color.clone();
            material.userData.baseEmissive = material.userData.baseColor.clone();
            material.emissive.copy(material.userData.baseColor);
            material.toneMapped = false;
          }

          // Smooth interpolation for individual piece hover
          const currentPieceStrength = pieceHoverStrength.current.get(index) || 0;
          const targetPieceStrength = hoveredPiece === index ? 1 : 0;
          const newPieceStrength = THREE.MathUtils.lerp(currentPieceStrength, targetPieceStrength, 0.12);
          pieceHoverStrength.current.set(index, newPieceStrength);

          const baseColor = material.userData.baseColor as THREE.Color;
          const emissiveColor = material.userData.baseEmissive as THREE.Color;

          // Enhanced metallic glow effect for hovered piece
          if (newPieceStrength > 0.01) {
            // Brighten the color significantly
            const brightColor = baseColor.clone().multiplyScalar(1 + newPieceStrength * 0.8);
            material.color.copy(brightColor);

            // Strong emissive glow
            material.emissive.copy(emissiveColor);
            material.emissiveIntensity = THREE.MathUtils.lerp(
              0.08,
              1.2, // Much stronger glow
              newPieceStrength
            );

            // Ultra polished metal when hovered
            material.metalness = THREE.MathUtils.lerp(1, 1, newPieceStrength);
            material.roughness = THREE.MathUtils.lerp(0.1, 0.02, newPieceStrength); // Very smooth
            material.envMapIntensity = THREE.MathUtils.lerp(2, 4, newPieceStrength); // Enhanced reflections

            // Slightly scale up the hovered piece
            mesh.scale.setScalar(1 + newPieceStrength * 0.15);
          } else {
            // Reset to base appearance
            material.color.copy(baseColor);
            material.emissive.copy(emissiveColor);
            material.emissiveIntensity = THREE.MathUtils.lerp(
              0.08,
              0.4,
              hoverStrength.current
            );
            material.metalness = 1;
            material.roughness = 0.1;
            material.envMapIntensity = 2;
            mesh.scale.setScalar(1);
          }
        }
      });
    }
  });

  const handlePieceEnter = (event: ThreeEvent<PointerEvent>, index: number) => {
    event.stopPropagation();
    setHoveredPiece(index);
  };

  const handlePieceLeave = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHoveredPiece(null);
  };

  const { onPointerEnter, onPointerLeave, onPointerMove, ...restGroupProps } = groupProps;

  return (
    <group
      ref={groupRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={(e) => {
        setHoveredPiece(null);
        onPointerLeave?.(e);
      }}
      onPointerMove={onPointerMove}
      {...restGroupProps}
    >
      {cubes.map((pos, i) => (
        <mesh
          key={i}
          position={pos as [number, number, number]}
          castShadow
          receiveShadow
          onPointerEnter={(e) => handlePieceEnter(e, i)}
          onPointerLeave={handlePieceLeave}
          onPointerMove={(e) => {
            e.stopPropagation();
            if (hoveredPiece !== i) {
              setHoveredPiece(i);
            }
          }}
        >
          <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
          <meshStandardMaterial
            metalness={1}
            roughness={0.1}
            color={colors[i % colors.length]}
            envMapIntensity={2}
            emissive="#000000"
            emissiveIntensity={0.08}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
};

export default RubiksCube;
