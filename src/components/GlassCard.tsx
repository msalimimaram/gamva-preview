import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  glow?: 'purple' | 'cyan' | 'gold' | 'none';
  strong?: boolean;
}

export default function GlassCard({ children, className = '', style, onClick, glow = 'none', strong }: GlassCardProps) {
  const glowMap = {
    purple: '0 0 20px rgba(108,60,225,0.3), 0 4px 24px rgba(0,0,0,0.4)',
    cyan: '0 0 20px rgba(0,229,255,0.25), 0 4px 24px rgba(0,0,0,0.4)',
    gold: '0 0 20px rgba(255,215,0,0.3), 0 4px 24px rgba(0,0,0,0.4)',
    none: '0 4px 24px rgba(0,0,0,0.3)',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl overflow-hidden ${strong ? 'glass-strong' : 'glass'} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        boxShadow: glowMap[glow],
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Badge({ children, color = 'purple', size = 'sm' }: { children: ReactNode; color?: 'purple' | 'cyan' | 'gold' | 'pink' | 'muted'; size?: 'xs' | 'sm' | 'md' }) {
  const colors = {
    purple: { bg: 'rgba(108,60,225,0.2)', border: 'rgba(108,60,225,0.4)', text: '#c4b5fd' },
    cyan: { bg: 'rgba(0,229,255,0.12)', border: 'rgba(0,229,255,0.3)', text: '#00E5FF' },
    gold: { bg: 'rgba(255,215,0,0.12)', border: 'rgba(255,215,0,0.3)', text: '#FFD700' },
    pink: { bg: 'rgba(255,45,120,0.12)', border: 'rgba(255,45,120,0.3)', text: '#FF2D78' },
    muted: { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.1)', text: 'rgba(240,240,255,0.5)' },
  };
  const sizeMap = { xs: '9px', sm: '11px', md: '12px' };
  const pad = { xs: '2px 6px', sm: '3px 8px', md: '4px 10px' };
  const c = colors[color];
  return (
    <span style={{
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      borderRadius: 6, fontSize: sizeMap[size], fontWeight: 600,
      padding: pad[size], fontFamily: 'Outfit, sans-serif', letterSpacing: '0.04em',
      display: 'inline-flex', alignItems: 'center', gap: 4,
    }}>
      {children}
    </span>
  );
}
