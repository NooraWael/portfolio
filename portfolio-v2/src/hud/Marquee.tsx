const DEFAULT_MARQUEE_ITEMS = [
  'CASE FILE 2026',
  'MOBILE DEV ON RECORD',
  'TECH MENTOR ACTIVE',
  'SUB-30 RUBIK\'S TIME CONFIRMED',
  'STATUS — REACHABLE',
  'LAST SEEN: MANAMA, BH',
  '6 CASES CLOSED',
];

interface MarqueeProps {
  items?: string[];
}

export function Marquee({ items = DEFAULT_MARQUEE_ITEMS }: MarqueeProps) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.concat(items).map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
