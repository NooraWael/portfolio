import type { ReactNode } from 'react';

interface CaseFileModalProps {
  open: boolean;
  title: string;
  caseNo: string;
  onClose: () => void;
  children: ReactNode;
}

export function CaseFileModal({ open, title, caseNo, onClose, children }: CaseFileModalProps) {
  return (
    <div className={`modal-backdrop ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>
          ✕ CLOSE
        </button>
        <h2>{title}</h2>
        <div className="case-no">{caseNo}</div>
        <div>{children}</div>
      </div>
    </div>
  );
}
