interface FooterProps {
  footerNote?: string | null;
}

export function Footer({ footerNote }: FooterProps) {
  return (
    <footer
      style={{
        textAlign: 'center',
        paddingBottom: '64px',
        paddingTop: '48px'
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <svg height="32" width="auto" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text
            x="100"
            y="28"
            fontFamily="Syne"
            fontSize="24"
            fontWeight="700"
            fill="#ffffff"
            textAnchor="middle"
          >
            CreateFuture
          </text>
        </svg>
      </div>

      <div
        style={{
          fontFamily: 'Montserrat',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: footerNote ? '12px' : '0'
        }}
      >
        CONFIDENTIAL — INTERNAL USE ONLY
      </div>

      {footerNote && (
        <div
          style={{
            fontFamily: 'Montserrat',
            fontSize: '12px',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.5)'
          }}
        >
          {footerNote}
        </div>
      )}
    </footer>
  );
}
