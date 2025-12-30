// components/RubiksCube.tsx
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { GroupProps, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

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
  isHovered,
  map
}: {
  position: [number, number, number];
  color: string;
  index: number;
  onHover: (index: number) => void;
  onUnhover: () => void;
  isHovered: boolean;
  map?: THREE.Texture | null;
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
      const brightColor = baseColor.clone().lerp(new THREE.Color(0xffffff), progress * 0.35);
      material.color.copy(brightColor);

      // Soft emissive for a subtle glow
      const emissiveColor = baseColor.clone().lerp(new THREE.Color(0xffffff), progress * 0.25);
      material.emissive.copy(emissiveColor);
      material.emissiveIntensity = progress * 0.2;

      // Soft metallic surface with gentle reflections
      material.metalness = 0.7;
      material.roughness = THREE.MathUtils.lerp(0.35, 0.22, progress);
      material.envMapIntensity = THREE.MathUtils.lerp(1.6, 2.4, progress);

      // No scaling
      mesh.scale.setScalar(1);
    } else {
      // Reset to normal
      material.color.copy(baseColor);
      material.emissive.set(0x1a1a1a);
      material.emissiveIntensity = 0.05;
      material.metalness = 0.7;
      material.roughness = 0.35;
      material.envMapIntensity = 1.6;
      mesh.scale.setScalar(1);
    }
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[0.32, 0.32, 0.32]}
      radius={0.02}
      smoothness={6}
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
      <meshStandardMaterial
        map={map ?? undefined}
        metalness={map ? 0.55 : 0.7}
        roughness={map ? 0.4 : 0.35}
        color={color}
        envMapIntensity={map ? 1.2 : 1.6}
        emissive="#1a1a1a"
        emissiveIntensity={0.05}
        toneMapped={false}
      />
    </RoundedBox>
  );
};

const RubiksCube = forwardRef<THREE.Group, RubiksCubeProps>((
  {
    scale = 1,
    floatAmplitude = 0.3,
    ...groupProps
  },
  ref
) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cubeSize = 0.33;
  const gap = 0.001;

  const colors = ['#f9f9f9', '#ededed', '#dcdcdc', '#c8c8c8', '#b4b4b4', '#9a9a9a'];

  const grainTexture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const imageData = ctx.createImageData(size, size);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = 215 + Math.random() * 25; // light grain
      imageData.data[i] = v;
      imageData.data[i + 1] = v;
      imageData.data[i + 2] = v;
      imageData.data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    tex.anisotropy = 8;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Generate all 27 cube positions
  const cubes: Array<{ pos: [number, number, number]; index: number; color: string; map?: THREE.Texture | null }> = [];
  let index = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const useTexture = grainTexture;
        cubes.push({
          pos: [x * (cubeSize + gap), y * (cubeSize + gap), z * (cubeSize + gap)],
          index: index,
          color: colors[index % colors.length],
          map: useTexture || undefined
        });
        index++;
      }
    }
  }

  useImperativeHandle(ref, () => groupRef.current as THREE.Group);

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
          map={cube.map}
          onHover={setHoveredIndex}
          onUnhover={() => setHoveredIndex(null)}
          isHovered={hoveredIndex === cube.index}
        />
      ))}
    </group>
  );
});

RubiksCube.displayName = 'RubiksCube';

export default RubiksCube;
