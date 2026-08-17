import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { FileEntry } from '../constants/files';

type TransitionPhase = 'idle' | 'entering' | 'exiting';

interface TransitionStoreValue {
  activeFile: FileEntry | null;
  isTransitioning: boolean;
  phase: TransitionPhase;
  startTransition: (file: FileEntry, onCovered: () => void) => void;
}

const TransitionStoreContext = createContext<TransitionStoreValue | null>(null);

export function TransitionStoreProvider({ children }: { children: ReactNode }) {
  const [activeFile, setActiveFile] = useState<FileEntry | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const timerId of timersRef.current) {
      window.clearTimeout(timerId);
    }
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const startTransition = useCallback(
    (file: FileEntry, onCovered: () => void) => {
      clearTimers();
      setActiveFile(file);
      setIsTransitioning(true);
      setPhase('entering');

      const coverAt = Math.round(file.transitionDuration * 0.75);
      const uncoverAt = Math.min(coverAt + 220, file.transitionDuration - 100);

      timersRef.current.push(
        window.setTimeout(() => {
          onCovered();
        }, coverAt),
      );

      timersRef.current.push(
        window.setTimeout(() => {
          setPhase('exiting');
        }, uncoverAt),
      );

      timersRef.current.push(
        window.setTimeout(() => {
          setIsTransitioning(false);
          setPhase('idle');
          setActiveFile(null);
        }, file.transitionDuration),
      );
    },
    [clearTimers],
  );

  const value = useMemo(
    () => ({ activeFile, isTransitioning, phase, startTransition }),
    [activeFile, isTransitioning, phase, startTransition],
  );

  return <TransitionStoreContext.Provider value={value}>{children}</TransitionStoreContext.Provider>;
}

export function useTransitionStore() {
  const context = useContext(TransitionStoreContext);
  if (!context) {
    throw new Error('useTransitionStore must be used within TransitionStoreProvider');
  }
  return context;
}
