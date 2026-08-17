import { motion } from 'framer-motion';
import { slamWipePreset } from '../lib/transitions';
import { useTransitionStore } from '../lib/store';

export function TransitionOverlay() {
  const { activeFile, isTransitioning, phase } = useTransitionStore();

  if (!activeFile || !isTransitioning) {
    return null;
  }

  const clipPath =
    phase === 'entering' ? 'inset(0 0% 0 0)' : 'inset(0 0 0 100%)';

  return (
    <motion.div
      className="transition-overlay"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath }}
      transition={{ duration: slamWipePreset.wipeInDuration, ease: slamWipePreset.ease }}
      style={{ background: activeFile.color }}
    >
      <motion.div
        className="transition-stamp"
        initial={{ y: -220, rotate: -4 }}
        animate={{ y: 0, rotate: -2 }}
        transition={{
          duration: slamWipePreset.stampDropDuration,
          ease: [0.2, 1.1, 0.4, 1],
        }}
      >
        {activeFile.number}
      </motion.div>
      <motion.div
        className="transition-sub"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.15 }}
      >
        {activeFile.label}
      </motion.div>
    </motion.div>
  );
}
