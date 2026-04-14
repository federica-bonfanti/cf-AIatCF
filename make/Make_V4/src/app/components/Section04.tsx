import { SectionHeader } from './SectionHeader';

interface Section04Props {
  evangelistShoutouts: Array<{
    client_and_project: string;
    lead: string;
    key_metric_large: string;
    key_metric_small: string;
    key_insight: string;
  }>;
}

export function Section04({ evangelistShoutouts }: Section04Props) {
  const accentColor = '#00d4ff';

  return (
    <section style={{ marginBottom: '80px' }}>
      <SectionHeader
        number="04."
        title="Evangelist Shoutouts"
        subtitle="Highlighting exceptional AI work"
        accentColor={accentColor}
        patternType="waves"
      />

      <div
        className="shoutouts-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}
      >
        {evangelistShoutouts.map((shoutout, index) => (
          <div
            key={index}
            className="fade-up"
            style={{
              background: '#0d0a2e',
              border: '1px solid #2a1a4a',
              borderRadius: '12px',
              padding: '24px',
              animationDelay: `${index * 0.1}s`
            }}
          >
            <h3
              style={{
                fontFamily: 'Syne',
                fontSize: '14px',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 12px 0'
              }}
            >
              {shoutout.client_and_project}
            </h3>

            <div
              style={{
                fontFamily: 'Montserrat',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: accentColor,
                marginBottom: '16px'
              }}
            >
              LEAD: {shoutout.lead}
            </div>

            <div
              style={{
                fontFamily: 'Syne',
                fontSize: '52px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
                lineHeight: 1
              }}
            >
              {shoutout.key_metric_large}
            </div>

            <div
              style={{
                fontFamily: 'Montserrat',
                fontSize: '15px',
                color: '#ffffff',
                marginBottom: '20px'
              }}
            >
              {shoutout.key_metric_small}
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '8px'
                }}
              >
                WHAT THIS SHOWS
              </div>
              <div
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: '13px',
                  color: '#ffffff',
                  lineHeight: 1.6
                }}
              >
                {shoutout.key_insight}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .shoutouts-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
