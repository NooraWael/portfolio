import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

type CursorVariant = 'default' | 'cube' | 'link';

type CursorContextValue = {
  setVariant: (variant: CursorVariant) => void;
  variant: CursorVariant;
};

const CursorContext = createContext<CursorContextValue | undefined>(undefined);

const variantSizeMap: Record<CursorVariant, number> = {
  default: 16,
  cube: 76,
  link: 32,
};

const cursorStyles: Record<CursorVariant, Record<string, unknown>> = {
  default: {
    width: 16,
    height: 16,
    backgroundColor: 'rgba(148, 163, 184, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.45)',
    boxShadow: '0 0 12px rgba(59, 130, 246, 0.15)',
    opacity: 0.8,
  },
  cube: {
    width: 76,
    height: 76,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.7)',
    boxShadow: '0 0 40px rgba(56, 189, 248, 0.5)',
    opacity: 1,
  },
  link: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(139, 92, 246, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.6)',
    boxShadow: '0 0 24px rgba(139, 92, 246, 0.35)',
    opacity: 1,
  },
};

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const pointerRef = useRef({ x: 0, y: 0 });
  const variantRef = useRef<CursorVariant>('default');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    variantRef.current = variant;
  }, [variant]);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      const size = variantSizeMap[variantRef.current];
      x.set(event.clientX - size / 2);
      y.set(event.clientY - size / 2);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [enabled, x, y]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const size = variantSizeMap[variant];
    const { x: px, y: py } = pointerRef.current;
    x.set(px - size / 2);
    y.set(py - size / 2);
  }, [enabled, variant, x, y]);

  const contextValue = useMemo<CursorContextValue>(
    () => ({
      setVariant,
      variant,
    }),
    [variant]
  );

  return (
    <CursorContext.Provider value={contextValue}>
      {children}
      {enabled && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9999]"
          style={{ x, y, borderRadius: '9999px', mixBlendMode: 'screen', borderStyle: 'solid' }}
          animate={cursorStyles[variant]}
          initial={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28, mass: 0.4 }}
        />
      )}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
