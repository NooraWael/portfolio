import { useCallback, useEffect, useMemo, useRef, useState, forwardRef, RefObject } from 'react';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import RubiksCube from './RubiksCube';
import { useCursor } from '../context/CursorContext';
import { useCubeZoomRegistration } from '../context/TransitionContext';


const Scene = ({ containerRef, overlayRef }: { containerRef: RefObject<HTMLDivElement>; overlayRef: RefObject<HTMLDivElement> }) => {
  const [cubeHover, setCubeHover] = useState(false);
  const { setVariant } = useCursor();
  const registerCubeZoom = useCubeZoomRegistration();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const cubeGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

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

  useEffect(() => {
    registerCubeZoom(async (go) => {
      // Only animate on desktop/fine pointer
      if (typeof window !== 'undefined') {
        const isDesktop = window.matchMedia('(pointer: fine)').matches;
        if (!isDesktop) {
          go();
          return;
        }
      }

      if (!cameraRef.current || !cubeGroupRef.current) {
        go();
        return;
      }

      const container = containerRef.current;
      const overlay = overlayRef.current;
      const rect = container?.getBoundingClientRect();
      const initialCamera = cameraRef.current.position.clone();
      const initialRotation = cubeGroupRef.current.rotation.clone();
      const initialContainerStyle = container?.getAttribute('style') ?? '';
      const initialOverlayStyle = overlay?.getAttribute('style') ?? '';

      if (container && rect) {
        gsap.set(container, {
          position: 'fixed',
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          zIndex: 80,
          pointerEvents: 'none',
          margin: 0,
          xPercent: 0,
          yPercent: 0,
          transform: 'translate(0, 0)',
          transformOrigin: '50% 50%',
          opacity: 1,
          filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.45))',
        });
      }

      if (overlay) {
        gsap.set(overlay, {
          position: 'fixed',
          inset: 0,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 79,
          background: 'rgba(0,0,0,0.9)',
        });
      }

      await new Promise<void>((resolve) => {
        const timeline = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          onComplete: () => {
            cameraRef.current?.position.copy(initialCamera);
            cubeGroupRef.current?.scale.setScalar(1);
            cubeGroupRef.current?.rotation.copy(initialRotation);
            if (container) {
              container.setAttribute('style', initialContainerStyle);
            }
            if (overlay) {
              overlay.setAttribute('style', initialOverlayStyle);
            }
            if (particlesRef.current) {
              (particlesRef.current.material as THREE.PointsMaterial).opacity = 0.25;
            }
            resolve();
          },
        });

        timeline
          .to(
            overlay,
            {
              opacity: 1,
              duration: 0.45,
              ease: 'power2.out',
            },
            0
          )
          .add(() => go(), 1.2)
          .to(cameraRef.current.position, { z: 6, y: 1.4, duration: 0.75 }, 0)
          .to(cameraRef.current.position, { z: 3.2, y: 1, duration: 0.95 }, 0.35)
          .to(
            cubeGroupRef.current.scale,
            { x: 1.25, y: 1.25, z: 1.25, duration: 0.95 },
            0.1
          )
          .to(
            cubeGroupRef.current.rotation,
            {
              x: initialRotation.x + 0.42,
              y: initialRotation.y + 0.6,
              duration: 0.95,
            },
            0.1
          )
          .to(
            particlesRef.current?.material as THREE.PointsMaterial,
            { opacity: 0, duration: 0.6 },
            0.25
          )
          .to(
            container,
            {
              top: '50%',
              left: '50%',
              xPercent: -50,
              yPercent: -50,
              width: '110vw',
              height: '110vh',
              scale: 1.15,
              filter: 'drop-shadow(0 40px 100px rgba(0,0,0,0.65))',
              duration: 1.2,
            },
            0
          )
          .set(container, { opacity: 0 }, 1.35);
      });
    });

    return () => registerCubeZoom(null);
  }, [registerCubeZoom]);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1.2, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.25} />

      <hemisphereLight args={['#f4f4f4', '#0b0b0b', 0.35]} />
      <ambientLight intensity={0.7} color="#d8d8d8" />
      <spotLight
        position={[6, 10, 8]}
        angle={0.55}
        penumbra={0.5}
        intensity={1.5}
        color="#f0f0f0"
        castShadow
      />
      <spotLight
        position={[-6, -8, -10]}
        angle={0.65}
        penumbra={0.45}
        intensity={0.7}
        color="#b0b0b0"
      />
      <pointLight position={[0, 2, 6]} intensity={0.45} color="#d0d0d0" />

      <Environment preset="night" />

      <group position={[0, -0.4, 0]}>
        <RubiksCube
          ref={cubeGroupRef}
          scale={3.5}
          floatAmplitude={0.45}
          onPointerEnter={handleCubeEnter}
          onPointerLeave={handleCubeLeave}
          onPointerMove={handleCubeMove}
        />
      </group>

    </>
  );
};

const PuzzleScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={containerRef} className="relative w-full h-full will-change-transform">
        <Canvas shadows dpr={[1, 2]}>
          <Scene containerRef={containerRef} overlayRef={overlayRef} />
        </Canvas>
      </div>
      <div ref={overlayRef} aria-hidden className="pointer-events-none" />
    </>
  );
};

export default PuzzleScene;
