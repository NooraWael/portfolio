interface StatusBarProps {
  left?: string;
  middle?: string;
  right?: string;
}

export function StatusBar({
  left = 'SYSTEM ONLINE',
  middle = 'NOORA.QASIM / DEV / MENTOR',
  right = 'MANAMA, BH',
}: StatusBarProps) {
  return (
    <div className="status-bar" aria-hidden="true">
      <div>
        <span className="dot" />
        {left}
      </div>
      <div>{middle}</div>
      <div>{right}</div>
    </div>
  );
}
