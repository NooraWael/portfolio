import { useLocation, useNavigate } from 'react-router-dom';
import { getFileByPath } from '../constants/files';
import { useTransitionStore } from '../lib/store';

export function BackToHub() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isTransitioning, startTransition } = useTransitionStore();
  const currentFile = getFileByPath(location.pathname);

  const handleClose = () => {
    if (isTransitioning) {
      return;
    }
    if (!currentFile) {
      navigate('/');
      return;
    }
    startTransition(currentFile, () => {
      navigate('/');
    });
  };

  return (
    <button
      type="button"
      className="close-file"
      onClick={handleClose}
      disabled={isTransitioning}
    >
      ✕ CLOSE FILE
    </button>
  );
}
