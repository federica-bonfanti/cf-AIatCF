import { SectionHeader } from './SectionHeader';

interface Section01Props {
  featured: {
    featured_item_title: string;
    subject_subtitle: string;
    summary: string;
    link: string;
  };
  tooling: {
    tools: Array<{
      name: string;
      status: 'In Trial' | 'Adopted' | 'Dropped' | 'Evaluating';
    }>;
  };
}

const statusStyles = {
  'In Trial': { background: '#D0FB5E', color: '#000000' },
  'Adopted': { background: '#7DFFC4', color: '#000000' },
  'Dropped': { background: '#000000', color: '#ffffff' },
  'Evaluating': { background: '#444444', color: '#ffffff' }
};

export function Section01({ featured, tooling }: Section01Props) {
  const accentColor = '#D0FB5E';

  return (
    <section style={{ marginBottom: '80px' }}>
      <SectionHeader
        number="01."
        title="Featured & Tooling"
        subtitle="What's new and what we're testing"
        accentColor={accentColor}
        patternType="dots"
      />

      <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', gap: '48px' }}>
        {/* Left - Featured */}
        <div className="fade-up">
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
            FEATURED THIS MONTH
          </div>
          <h2
            style={{
              fontFamily: 'Syne',
              fontSize: '36px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 12px 0'
            }}
          >
            {featured.featured_item_title}
          </h2>
          <div
            style={{
              fontFamily: 'Montserrat',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '16px'
            }}
          >
            {featured.subject_subtitle}
          </div>
          <p
            style={{
              fontFamily: 'Montserrat',
              fontSize: '15px',
              color: '#ffffff',
              lineHeight: 1.7,
              marginBottom: '24px'
            }}
          >
            {featured.summary}
          </p>
          <a
            href={featured.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: 500,
              background: '#0d0a2e',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '0',
              textDecoration: 'none',
              transition: 'all 200ms',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = accentColor;
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0d0a2e';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            Watch / Read →
          </a>
        </div>

        {/* Right - Tool Assessment */}
        <div className="fade-up" style={{ animationDelay: '0.1s' }}>
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
            AI TOOLING
          </div>
          <h3
            style={{
              fontFamily: 'Syne',
              fontSize: '22px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 8px 0'
            }}
          >
            Tool Assessment
          </h3>
          <div
            style={{
              fontFamily: 'Montserrat',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '24px'
            }}
          >
            Trialling AI tools across the business — direction coming very soon.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            {tooling.tools.map((tool, index) => (
              <div
                key={index}
                style={{
                  background: '#0d0a2e',
                  border: '1px solid #2a1a4a',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontFamily: 'Montserrat', fontSize: '14px', color: '#ffffff' }}>
                  {tool.name}
                </span>
                <span
                  style={{
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    fontWeight: 500,
                    padding: '4px 12px',
                    borderRadius: '8px',
                    ...statusStyles[tool.status]
                  }}
                >
                  {tool.status}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              fontFamily: 'Montserrat',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.5)'
            }}
          >
            → Contact your project lead to share your ideas
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .grid-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
