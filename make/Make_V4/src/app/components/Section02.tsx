import { SectionHeader } from './SectionHeader';

interface Section02Props {
  clientPipeline: Array<{
    client_name: string;
    project_title: string;
    ask: string;
    answer: string;
    value: string;
  }>;
}

export function Section02({ clientPipeline }: Section02Props) {
  const accentColor = '#FE7AF6';

  return (
    <section style={{ marginBottom: '80px' }}>
      <SectionHeader
        number="02."
        title="AI Pipeline with Clients"
        subtitle="Active projects and opportunities"
        accentColor={accentColor}
        patternType="spiral"
      />

      <div
        className="client-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }}
      >
        {clientPipeline.map((client, index) => (
          <div
            key={index}
            className="fade-up"
            style={{
              background: '#0d0a2e',
              border: '1px solid #2a1a4a',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div
              style={{
                fontFamily: 'Montserrat',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: accentColor,
                marginBottom: '12px'
              }}
            >
              {client.client_name}
            </div>

            <h3
              style={{
                fontFamily: 'Syne',
                fontSize: '20px',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 16px 0'
              }}
            >
              {client.project_title}
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '6px'
                }}
              >
                THE ASK
              </div>
              <div
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: '13px',
                  color: '#ffffff',
                  lineHeight: 1.5
                }}
              >
                {client.ask}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '6px'
                }}
              >
                OUR ANSWER
              </div>
              <div
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: '13px',
                  color: '#ffffff',
                  lineHeight: 1.5
                }}
              >
                {client.answer}
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <div
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '6px'
                }}
              >
                TOTAL PROJECT VALUE
              </div>
              <div
                style={{
                  fontFamily: 'Syne',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: accentColor
                }}
              >
                {client.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .client-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .client-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
