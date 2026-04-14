import { SectionHeader } from './SectionHeader';
import { useEffect, useRef, useState } from 'react';

interface Section03Props {
  weeklyAiCall: {
    metrics: Array<{
      value: string;
      label: string;
    }>;
  };
}

function AnimatedMetric({ value, label }: { value: string; label: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            // Only animate if value is purely numeric
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue) && value === numericValue.toString()) {
              let start = 0;
              const duration = 1000;
              const startTime = performance.now();

              const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(progress * numericValue);
                setDisplayValue(current.toString());

                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };

              requestAnimationFrame(animate);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="fade-up" style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'Syne',
          fontSize: '56px',
          fontWeight: 700,
          color: '#00e5a0',
          marginBottom: '8px'
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontFamily: 'Montserrat',
          fontSize: '13px',
          color: '#ffffff'
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function Section03({ weeklyAiCall }: Section03Props) {
  const accentColor = '#00e5a0';

  return (
    <section style={{ marginBottom: '80px' }}>
      <SectionHeader
        number="03."
        title="Weekly AI Call"
        subtitle="Community engagement and learning"
        accentColor={accentColor}
        patternType="pixels"
      />

      <div
        className="metrics-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
          marginBottom: '48px'
        }}
      >
        {weeklyAiCall.metrics.map((metric, index) => (
          <AnimatedMetric key={index} value={metric.value} label={metric.label} />
        ))}
      </div>

      <div
        className="content-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px'
        }}
      >
        <div className="fade-up">
          <ul
            style={{
              fontFamily: 'Montserrat',
              fontSize: '15px',
              color: '#ffffff',
              lineHeight: 1.7,
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}
          >
            <li style={{ marginBottom: '12px' }}>• Where AI is currently being used on projects</li>
            <li style={{ marginBottom: '12px' }}>• Opportunities to expand AI within and across projects</li>
            <li style={{ marginBottom: '12px' }}>• What's working (and what isn't)</li>
            <li>• Growing weekly — more Creatrs joining each week</li>
          </ul>
        </div>

        <div className="fade-up" style={{ animationDelay: '0.1s' }}>
          <p
            style={{
              fontFamily: 'Montserrat',
              fontSize: '15px',
              color: '#ffffff',
              lineHeight: 1.7,
              margin: 0
            }}
          >
            Contact <strong>Gregor Bulloch</strong> to share what's happening on your project.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .content-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
