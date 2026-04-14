interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle: string;
  accentColor: string;
  patternType: 'dots' | 'spiral' | 'pixels' | 'waves';
}

function DotGridPattern({ color }: { color: string }) {
  return (
    <svg width="200" height="80" viewBox="0 0 200 80" fill="none" style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 'auto', opacity: 0.3 }}>
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 20 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 10 + 5} cy={row * 10 + 5} r="2" fill={color} />
        ))
      )}
    </svg>
  );
}

function SpiralPattern({ color }: { color: string }) {
  return (
    <svg width="200" height="80" viewBox="0 0 200 80" fill="none" style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 'auto', opacity: 0.3 }}>
      <circle cx="100" cy="40" r="8" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="100" cy="40" r="16" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="100" cy="40" r="24" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="100" cy="40" r="32" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="160" cy="40" r="12" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="160" cy="40" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="40" cy="40" r="12" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="40" cy="40" r="20" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function PixelPattern({ color }: { color: string }) {
  const pixels = [
    { x: 20, y: 15 }, { x: 40, y: 25 }, { x: 60, y: 10 }, { x: 80, y: 30 },
    { x: 100, y: 20 }, { x: 120, y: 35 }, { x: 140, y: 15 }, { x: 160, y: 28 },
    { x: 30, y: 45 }, { x: 50, y: 55 }, { x: 70, y: 50 }, { x: 90, y: 60 },
    { x: 110, y: 48 }, { x: 130, y: 58 }, { x: 150, y: 52 }, { x: 170, y: 62 },
  ];
  return (
    <svg width="200" height="80" viewBox="0 0 200 80" fill="none" style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 'auto', opacity: 0.3 }}>
      {pixels.map((pixel, i) => (
        <rect key={i} x={pixel.x} y={pixel.y} width="6" height="6" fill={color} />
      ))}
    </svg>
  );
}

function WavyPattern({ color }: { color: string }) {
  return (
    <svg width="200" height="80" viewBox="0 0 200 80" fill="none" style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: 'auto', opacity: 0.3 }}>
      <path d="M0 20 Q 25 10, 50 20 T 100 20 T 150 20 T 200 20" stroke={color} strokeWidth="2" fill="none" />
      <path d="M0 35 Q 25 25, 50 35 T 100 35 T 150 35 T 200 35" stroke={color} strokeWidth="2" fill="none" />
      <path d="M0 50 Q 25 40, 50 50 T 100 50 T 150 50 T 200 50" stroke={color} strokeWidth="2" fill="none" />
      <path d="M0 65 Q 25 55, 50 65 T 100 65 T 150 65 T 200 65" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
}

export function SectionHeader({ number, title, subtitle, accentColor, patternType }: SectionHeaderProps) {
  const darkerShade = `${accentColor}dd`;

  const renderPattern = () => {
    switch (patternType) {
      case 'dots':
        return <DotGridPattern color={darkerShade} />;
      case 'spiral':
        return <SpiralPattern color={darkerShade} />;
      case 'pixels':
        return <PixelPattern color={darkerShade} />;
      case 'waves':
        return <WavyPattern color={darkerShade} />;
    }
  };

  return (
    <div
      className="section-header"
      style={{
        background: accentColor,
        borderRadius: '12px',
        height: '80px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
        marginBottom: '48px'
      }}
    >
      <div style={{ zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '0' }}>
          <span style={{ fontFamily: 'Syne', fontSize: '48px', fontWeight: 700, color: '#000000', lineHeight: 1 }}>
            {number}
          </span>
          <span style={{ fontFamily: 'Syne', fontSize: '24px', fontWeight: 700, color: '#000000', lineHeight: 1 }}>
            {title}
          </span>
        </div>
        <div
          style={{
            fontFamily: 'Montserrat',
            fontSize: '11px',
            textTransform: 'uppercase',
            color: '#333333',
            letterSpacing: '0.1em',
            marginTop: '2px'
          }}
        >
          {subtitle}
        </div>
      </div>
      {renderPattern()}
    </div>
  );
}
