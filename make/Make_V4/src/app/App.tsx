import { useEffect, useState } from 'react';
import { DataStructure } from './types';
import { AmbientBackground } from './components/AmbientBackground';
import { PageHeader } from './components/PageHeader';
import { Section01 } from './components/Section01';
import { Section02 } from './components/Section02';
import { Section03 } from './components/Section03';
import { Section04 } from './components/Section04';
import { Footer } from './components/Footer';

const DATA_URL = 'https://raw.githubusercontent.com/federica-bonfanti/cf-AIatCF/main/data/current.json';

export default function App() {
  const [data, setData] = useState<DataStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Set up Intersection Observer for fade-up animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements with fade-up class
    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observer.observe(el));

    // Observe section headers
    const headers = document.querySelectorAll('.section-header');
    headers.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [data]);

  if (loading) {
    return (
      <div className="loading-container">
        <AmbientBackground />
        <div className="loading-content">
          <h1 className="loading-title">AI at CreateFuture</h1>
          <div className="loading-spinner"></div>
        </div>

        <style>{`
          .loading-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #040019;
          }
          .loading-content {
            text-align: center;
            z-index: 1;
            position: relative;
          }
          .loading-title {
            font-family: Syne;
            font-size: 64px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 32px 0;
          }
          .loading-spinner {
            width: 48px;
            height: 48px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-top-color: #D0FB5E;
            border-radius: 50%;
            margin: 0 auto;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="error-container">
        <AmbientBackground />
        <div className="error-content">
          <h1 className="error-title">AI at CreateFuture</h1>
          <p className="error-message">Content unavailable — please try again later.</p>
        </div>

        <style>{`
          .error-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #040019;
          }
          .error-content {
            text-align: center;
            z-index: 1;
            position: relative;
          }
          .error-title {
            font-family: Syne;
            font-size: 64px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 24px 0;
          }
          .error-message {
            font-family: Montserrat;
            font-size: 15px;
            color: rgba(255, 255, 255, 0.5);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-container">
      <AmbientBackground />

      <div className="content-wrapper">
        <PageHeader month={data.meta.month} />

        <main>
          <Section01 featured={data.featured} tooling={data.tooling} />
          <Section02 clientPipeline={data.client_pipeline} />
          <Section03 weeklyAiCall={data.weekly_ai_call} />
          <Section04 evangelistShoutouts={data.evangelist_shoutouts} />
        </main>

        <Footer footerNote={data.meta.theme.footer_note} />
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .app-container {
          min-height: 100vh;
          background: #040019;
          color: #ffffff;
          position: relative;
        }

        .content-wrapper {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 48px;
        }

        main {
          margin-top: 80px;
        }

        /* Entrance animations */
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-header {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }

        .section-header.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Section header shimmer effect */
        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .section-header {
          background-size: 200% 200%;
          animation: shimmer 4s ease-in-out infinite;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .content-wrapper {
            padding: 0 32px;
          }
          .loading-title, .error-title {
            font-size: 48px !important;
          }
        }

        @media (max-width: 600px) {
          .content-wrapper {
            padding: 0 24px;
          }
          .loading-title, .error-title {
            font-size: 36px !important;
          }
        }
      `}</style>
    </div>
  );
}
