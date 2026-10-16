interface SplashProps {
  onNext: () => void;
}

export default function Splash({ onNext }: SplashProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-full relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(108,60,225,0.4) 0%, #080810 60%)' }}
      onClick={onNext}
    >
      {/* Animated rings */}
      {[260, 340, 420].map((size, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            border: `1px solid rgba(108,60,225,${0.25 - i * 0.07})`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Logo mark */}
      <div className="relative mb-8">
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 28,
            background: 'linear-gradient(135deg, #6C3CE1 0%, #00E5FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(108,60,225,0.6), 0 0 80px rgba(0,229,255,0.2)',
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M14 28 L22 20 L28 32 L36 16 L42 28" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="28" cy="44" r="4" fill="white" opacity="0.7" />
          </svg>
        </div>
      </div>

      <h1
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 52,
          fontWeight: 900,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #00E5FF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
          lineHeight: 1,
        }}
      >
        GAMva
      </h1>

      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          color: 'rgba(240,240,255,0.5)',
          marginTop: 12,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        Health · Coach · Grow
      </p>

      <div style={{ position: 'absolute', bottom: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 40,
            height: 2,
            borderRadius: 1,
            background: 'linear-gradient(90deg, #6C3CE1, #00E5FF)',
            opacity: 0.6,
          }}
        />
        <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(240,240,255,0.3)', letterSpacing: '0.08em' }}>
          Tap to continue
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
