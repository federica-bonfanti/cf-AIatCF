interface PageHeaderProps {
  month: string;
}

export function PageHeader({ month }: PageHeaderProps) {
  return (
    <header className="text-center" style={{ paddingTop: '80px' }}>
      <div
        style={{
          fontFamily: 'Montserrat',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '16px'
        }}
      >
        {month} HIGHLIGHTS
      </div>
      <h1
        style={{
          fontFamily: 'Syne',
          fontSize: '64px',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 12px 0'
        }}
      >
        AI at CreateFuture
      </h1>
      <div
        style={{
          fontFamily: 'Montserrat',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.5)',
          fontWeight: 400
        }}
      >
        FEATURED · AI TOOLING · CLIENT PIPELINE · EVANGELIST SHOUTOUTS
      </div>
    </header>
  );
}
