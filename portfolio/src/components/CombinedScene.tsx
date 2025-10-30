// CombinedScene.tsx
import { OrbitControls, Environment } from '@react-three/drei';
import { PerspectiveCamera } from '@react-three/drei';
import PuzzlePiece from './PuzzlePiece';
import RubiksCube from './RubiksCube';

const CombinedScene = () => {
  const puzzlePieces = [];

  const rows = 4;
  const cols = 5;
  const spacing = 1.2;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const finalX = (j - cols / 2) * spacing;
      const finalY = (i - rows / 2) * spacing;
      const finalZ = 0;

      const initialX = (Math.random() - 0.5) * 15;
      const initialY = (Math.random() - 0.5) * 15;
      const initialZ = (Math.random() - 0.5) * 10 - 5;

      const rotX = (Math.random() - 0.5) * Math.PI * 2;
      const rotY = (Math.random() - 0.5) * Math.PI * 2;
      const rotZ = (Math.random() - 0.5) * Math.PI * 2;

      const hue = 200 + (i / rows) * 60;
      const color = `hsl(${hue}, 70%, 50%)`;

      puzzlePieces.push(
        <PuzzlePiece
          key={`${i}-${j}`}
          position={[initialX, initialY, initialZ]}
          finalPosition={[finalX, finalY, finalZ]}
          rotation={[rotX, rotY, rotZ]}
          color={color}
          delay={(i * cols + j) * 0.05}
          index={i * cols + j}
        />
      );
    }
  }

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#3b82f6" />

      <Environment files="/brown_photostudio_01_4k.hdr" background={false} />

      {puzzlePieces}
      <RubiksCube position={[4, 2, 0]} scale={1.2} />

      {/* Optional: Background plane */}
      <mesh position={[0, 0, -5]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
      </mesh>
    </>
  );
};

export default CombinedScene;
