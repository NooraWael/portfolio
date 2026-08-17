import type { FileEntry } from '../constants/files';

interface CaseHeaderProps {
  file: FileEntry | null;
}

export function CaseHeader({ file }: CaseHeaderProps) {
  return (
    <div className="case-header-wrap">
      <div className="title-block">
        <h1>{file ? file.label : 'THE NOORA CASE'}</h1>
        <div className="case">{file ? `${file.number} / ${file.sceneTitle}` : 'CASE №2026 / OFFICE HUB'}</div>
      </div>
      <div className="classified-stamp" style={{ background: file?.color ?? undefined }}>
        {file ? file.subtitle : 'CLASSIFIED'}
      </div>
    </div>
  );
}
