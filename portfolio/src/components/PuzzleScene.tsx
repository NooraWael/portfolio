import { useCallback, useMemo, useRef, useState } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import RubiksCube from './RubiksCube';
import { useCursor } from '../context/CursorContext';

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 180;

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 6 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      arr[i * 3] = Math.cos(theta) * radius;
      arr[i * 3 + 1] = Math.sin(phi) * radius * 0.6;
      arr[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return arr;
  }, [particleCount]);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const t = clock.getElapsedTime();
      particlesRef.current.rotation.y = t * 0.05;
      particlesRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    }
  });

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
        size={0.08}
        color="#60a5fa"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

const GlowPlane = () => (
  <group>
    <mesh position={[0, -3.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[12, 64]} />
      <meshStandardMaterial color="#0b1120" metalness={0.6} roughness={0.85} />
    </mesh>
    <mesh position={[0, -3.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[3.5, 5.5, 64]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} />
    </mesh>
  </group>
);

const Scene = () => {
  const [cubeHover, setCubeHover] = useState(false);
  const { setVariant } = useCursor();

  const handleCubeEnter = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setCubeHover(true);
      setVariant('cube');
    },
    [setVariant]
  );

  const handleCubeLeave = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setCubeHover(false);
      setVariant('default');
    },
    [setVariant]
  );

  const handleCubeMove = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      if (!cubeHover) {
        setCubeHover(true);
        setVariant('cube');
      }
    },
    [cubeHover, setVariant]
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.2, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.25} />

      <ambientLight intensity={0.6} />
      <spotLight
        position={[6, 10, 8]}
        angle={0.55}
        penumbra={0.6}
        intensity={2}
        color="#60a5fa"
        castShadow
      />
      <spotLight
        position={[-6, -8, -10]}
        angle={0.7}
        penumbra={0.5}
        intensity={1.1}
        color="#f472b6"
      />
      <pointLight position={[0, 2, 6]} intensity={0.6} color="#c084fc" />

      <Environment preset="night" />

      <group position={[0, -0.4, 0]}>
        <RubiksCube
          scale={3.5}
          floatAmplitude={0.45}
          hovered={cubeHover}
          onPointerEnter={handleCubeEnter}
          onPointerLeave={handleCubeLeave}
          onPointerMove={handleCubeMove}
        />
      </group>

      <FloatingParticles />
      <GlowPlane />
    </>
  );
};

const PuzzleScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default PuzzleScene;
