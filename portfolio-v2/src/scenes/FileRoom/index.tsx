import { Html, PerspectiveCamera } from '@react-three/drei';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FILES_BY_SLUG, type FileSlug } from '../../constants/files';

export function FileRoom() {
  const { slug } = useParams<{ slug: string }>();
  const file = FILES_BY_SLUG[slug as FileSlug] ?? FILES_BY_SLUG.about;

  const palette = useMemo(
    () => ({
      room: '#1a1716',
      floor: '#2b221f',
      accent: file.color,
    }),
    [file.color],
  );

  return (
    <>
      <color attach="background" args={['#141110']} />
      <fog attach="fog" args={['#110e0d', 5, 13]} />

      <PerspectiveCamera makeDefault position={[0, 1.5, 4.2]} fov={48} />

      <ambientLight intensity={0.22} />
      <pointLight position={[0, 2.8, 1.5]} intensity={28} color="#ffd39c" distance={12} castShadow />
      <pointLight position={[0, 1.1, -1.9]} intensity={10} color={palette.accent} distance={5} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={palette.floor} roughness={0.92} />
      </mesh>

      <mesh position={[0, 1.7, -2.2]} castShadow receiveShadow>
        <boxGeometry args={[5.8, 3.4, 0.18]} />
        <meshStandardMaterial color={palette.room} roughness={0.96} />
      </mesh>

      <mesh position={[0, 1.1, -0.6]} castShadow>
        <boxGeometry args={[2.4, 2.2, 1.6]} />
        <meshStandardMaterial color={palette.accent} roughness={0.52} metalness={0.1} />
      </mesh>

      <Html position={[0, 0.15, 0.28]} transform distanceFactor={4} center>
        <div className="room-title-3d">{file.sceneTitle.toUpperCase()}</div>
      </Html>
    </>
  );
}
