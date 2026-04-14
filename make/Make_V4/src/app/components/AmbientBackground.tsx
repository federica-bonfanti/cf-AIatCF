export function AmbientBackground() {
  return (
    <>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <style>{`
        .blob {
          position: fixed;
          border-radius: 50%;
          background: radial-gradient(circle, #421242 0%, transparent 70%);
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }

        .blob-1 {
          width: 600px;
          height: 600px;
          top: 10%;
          left: 15%;
          opacity: 0.2;
          animation: drift1 12s ease-in-out infinite alternate;
        }

        .blob-2 {
          width: 500px;
          height: 500px;
          top: 50%;
          right: 10%;
          opacity: 0.22;
          animation: drift2 14s ease-in-out infinite alternate;
        }

        .blob-3 {
          width: 550px;
          height: 550px;
          bottom: 15%;
          left: 40%;
          opacity: 0.18;
          animation: drift3 10s ease-in-out infinite alternate;
        }

        @keyframes drift1 {
          from { transform: translate(0, 0); }
          to { transform: translate(60px, 40px); }
        }

        @keyframes drift2 {
          from { transform: translate(0, 0); }
          to { transform: translate(-50px, 60px); }
        }

        @keyframes drift3 {
          from { transform: translate(0, 0); }
          to { transform: translate(40px, -50px); }
        }
      `}</style>
    </>
  );
}
