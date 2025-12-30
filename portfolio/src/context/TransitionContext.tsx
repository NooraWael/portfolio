import { createContext, ReactNode, useCallback, useContext, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type CubeZoomHandler = (go: () => void) => Promise<void> | void;

type TransitionContextValue = {
  registerCubeZoom: (handler: CubeZoomHandler | null) => void;
  playCubeZoom: (go: () => void) => Promise<void>;
};

const TransitionContext = createContext<TransitionContextValue | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const cubeZoomRef = useRef<CubeZoomHandler | null>(null);

  const registerCubeZoom = useCallback((handler: CubeZoomHandler | null) => {
    cubeZoomRef.current = handler;
  }, []);

  const playCubeZoom = useCallback(
    async (go: () => void) => {
      const handler = cubeZoomRef.current;
      if (handler) {
        try {
          await handler(go);
          return;
        } catch (error) {
          // Fall back to normal navigation if animation fails
          console.error('Cube transition failed, navigating normally.', error);
        }
      }
      go();
    },
    []
  );

  const value = useMemo(
    () => ({
      registerCubeZoom,
      playCubeZoom,
    }),
    [registerCubeZoom, playCubeZoom]
  );

  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
};

const useTransitionContext = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransitionContext must be used within a TransitionProvider');
  }
  return context;
};

export const useCubeZoomRegistration = () => {
  const { registerCubeZoom } = useTransitionContext();
  return registerCubeZoom;
};

export const usePageTransition = () => {
  const { playCubeZoom } = useTransitionContext();
  const navigate = useNavigate();

  const trigger = useCallback(
    (to: string) => {
      playCubeZoom(() => navigate(to));
    },
    [navigate, playCubeZoom]
  );

  return { trigger };
};
