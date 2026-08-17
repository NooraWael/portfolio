import { createPortal } from 'react-dom';
import { useEffect, useState, type ReactNode } from 'react';

export function HudPortal({ children }: { children: ReactNode }) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById('hud-root'));
  }, []);

  if (!container) {
    return null;
  }
  return createPortal(children, container);
}
