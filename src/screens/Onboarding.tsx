import { useState } from 'react';
import { ChevronRight, Dumbbell, GraduationCap, ShoppingBag } from 'lucide-react';

const roles = [
  {
    id: 'coach',
    icon: Dumbbell,
    title: 'Coach',
    subtitle: 'Lead & Inspire',
    description: 'Build training programs, manage clients, run live sessions, and grow your coaching business.',
    color: '#6C3CE1',
    glow: 'rgba(108,60,225,0.4)',
    gradient: 'linear-gradient(135deg, #6C3CE1 0%, #4f2ea8 100%)',
    features: ['Client management', 'Live session hosting', 'Revenue analytics'],
  },
  {
    id: 'student',
    icon: GraduationCap,
    title: 'Student',
    subtitle: 'Learn & Level Up',
    description: 'Follow personalized training plans, track progress, earn badges, and connect with expert coaches.',
    color: '#00E5FF',
    glow: 'rgba(0,229,255,0.4)',
    gradient: 'linear-gradient(135deg, #00A8CC 0%, #00E5FF 100%)',
    features: ['Personalized plans', 'Progress tracking', 'Loyalty rewards'],
  },
  {
    id: 'seller',
    icon: ShoppingBag,
    title: 'Seller',
    subtitle: 'Sell & Scale',
    description: 'List health products, manage inventory, reach motivated buyers, and track your store performance.',
    color: '#FF2D78',
    glow: 'rgba(255,45,120,0.4)',
    gradient: 'linear-gradient(135deg, #FF2D78 0%, #ff6b35 100%)',
    features: ['Product catalog', 'Sales dashboard', 'Customer insights'],
  },
];

interface OnboardingProps {
  onSelectRole: (role: string) => void;
}

export default function Onboarding({ onSelectRole }: OnboardingProps) {
  const [step, setStep] = useState(0); // 0: welcome, 1: role select, 2: role detail
  const [selected, setSelected] = useState<string | null>(null);

  const selectedRole = roles.find(r => r.id === selected);

  if (step === 2 && selectedRole) {
    const Icon = selectedRole.icon;
    return (
      <div className="flex flex-col h-full" style={{ background: `radial-gradient(ellipse at 50% 20%, ${selectedRole.glow} 0%, #080810 60%)` }}>
        {/* Header */}
        <div className="flex-shrink-0 px-6 pt-14 pb-6">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '100%' }} />
          </div>
          <p style={{ fontSize: 11, color: 'rgba(240,240,255,0.4)', marginTop: 8, fontFamily: 'Outfit', letterSpacing: '0.06em' }}>
            STEP 2 OF 2
          </p>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar px-6 flex flex-col">
          {/* Role badge */}
          <div
            className="self-start flex items-center gap-3 mb-8 px-5 py-3 rounded-2xl"
            style={{ background: selectedRole.gradient, boxShadow: `0 0 30px ${selectedRole.glow}` }}
          >
            <Icon size={24} color="white" />
            <div>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: '#fff', lineHeight: 1 }}>{selectedRole.title}</p>
              <p style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{selectedRole.subtitle}</p>
            </div>
          </div>

          <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 30, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
            Built for your journey
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'rgba(240,240,255,0.6)', lineHeight: 1.6, marginBottom: 32 }}>
            {selectedRole.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {selectedRole.features.map((f, i) => (
              <div key={i} className="glass flex items-center gap-4 px-4 py-3 rounded-xl">
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: selectedRole.color,
                  boxShadow: `0 0 8px ${selectedRole.color}`,
                  flexShrink: 0,
                }} />
                <span style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(240,240,255,0.85)' }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Illustration */}
          <div
            className="glass rounded-2xl mb-8 flex items-center justify-center"
            style={{ height: 160, background: `linear-gradient(135deg, ${selectedRole.glow.replace('0.4', '0.08')} 0%, rgba(255,255,255,0.03) 100%)` }}
          >
            <Icon size={72} style={{ color: selectedRole.color, opacity: 0.3 }} />
          </div>
        </div>

        <div className="flex-shrink-0 px-6 pb-10 flex gap-3">
          <button
            onClick={() => setStep(1)}
            className="glass px-6 py-4 rounded-2xl"
            style={{ fontFamily: 'Outfit', fontWeight: 600, color: 'rgba(240,240,255,0.6)', fontSize: 15 }}
          >
            Back
          </button>
          <button
            onClick={() => onSelectRole(selectedRole.id)}
            className="flex-1 py-4 rounded-2xl flex items-center justify-center gap-2"
            style={{ background: selectedRole.gradient, boxShadow: `0 0 20px ${selectedRole.glow}`, fontFamily: 'Outfit', fontWeight: 700, color: '#fff', fontSize: 16 }}
          >
            Enter as {selectedRole.title}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="flex flex-col h-full" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(108,60,225,0.25) 0%, #080810 60%)' }}>
        <div className="flex-shrink-0 px-6 pt-14 pb-4">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '50%' }} />
          </div>
          <p style={{ fontSize: 11, color: 'rgba(240,240,255,0.4)', marginTop: 8, fontFamily: 'Outfit', letterSpacing: '0.06em' }}>
            STEP 1 OF 2
          </p>
          <h2 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 28, color: '#fff', marginTop: 20, marginBottom: 6 }}>
            What's your role?
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(240,240,255,0.5)', lineHeight: 1.5 }}>
            Choose how you'll use GAMva to unlock your personalized experience.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar px-6 py-4 flex flex-col gap-4">
          {roles.map(role => {
            const Icon = role.icon;
            const isSelected = selected === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelected(role.id)}
                className="text-left rounded-2xl overflow-hidden"
                style={{
                  background: isSelected ? `linear-gradient(135deg, ${role.glow.replace('0.4','0.15')} 0%, rgba(255,255,255,0.05) 100%)` : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isSelected ? role.color + '60' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isSelected ? `0 0 20px ${role.glow}` : 'none',
                  padding: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                    background: isSelected ? role.gradient : 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isSelected ? `0 0 16px ${role.glow}` : 'none',
                  }}>
                    <Icon size={24} color={isSelected ? '#fff' : role.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: '#fff', margin: 0 }}>{role.title}</h3>
                      <span style={{ fontSize: 11, color: role.color, fontFamily: 'Outfit', fontWeight: 600, letterSpacing: '0.04em' }}>
                        {role.subtitle}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(240,240,255,0.55)', lineHeight: 1.5, margin: 0 }}>
                      {role.description.split('.')[0]}.
                    </p>
                  </div>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${isSelected ? role.color : 'rgba(255,255,255,0.2)'}`,
                    background: isSelected ? role.color : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {isSelected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex-shrink-0 px-6 pb-10">
          <button
            onClick={() => selected && setStep(2)}
            disabled={!selected}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2"
            style={{
              background: selected ? 'linear-gradient(135deg, #6C3CE1, #00E5FF)' : 'rgba(255,255,255,0.08)',
              fontFamily: 'Outfit', fontWeight: 700, color: selected ? '#fff' : 'rgba(240,240,255,0.3)', fontSize: 16,
              boxShadow: selected ? '0 0 20px rgba(108,60,225,0.4)' : 'none',
            }}
          >
            Continue <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // Step 0: Welcome
  return (
    <div className="flex flex-col h-full relative overflow-hidden" style={{ background: '#080810' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, rgba(108,60,225,0.35) 0%, transparent 65%), radial-gradient(ellipse at 80% 80%, rgba(0,229,255,0.15) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Hero imagery area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <div style={{ position: 'relative', marginBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Decorative orbs */}
          {[
            { size: 12, x: -60, y: -40, color: '#6C3CE1', opacity: 0.8 },
            { size: 8, x: 70, y: -60, color: '#00E5FF', opacity: 0.7 },
            { size: 16, x: 80, y: 20, color: '#FF2D78', opacity: 0.6 },
          ].map((orb, i) => (
            <div key={i} style={{
              position: 'absolute', width: orb.size, height: orb.size, borderRadius: '50%',
              background: orb.color, opacity: orb.opacity,
              left: `calc(50% + ${orb.x}px)`, top: `calc(50% + ${orb.y}px)`,
              boxShadow: `0 0 ${orb.size * 2}px ${orb.color}`,
            }} />
          ))}

          {/* Central card stack illustration */}
          {[2, 1, 0].map(i => (
            <div key={i} style={{
              position: 'absolute',
              width: 200, height: 120,
              borderRadius: 20,
              background: `rgba(255,255,255,${0.04 + i * 0.02})`,
              border: `1px solid rgba(255,255,255,${0.06 + i * 0.03})`,
              transform: `translateY(${(2 - i) * 12}px) scale(${1 - (2 - i) * 0.05})`,
              backdropFilter: 'blur(10px)',
              top: i === 0 ? 0 : undefined,
              zIndex: i,
            }} />
          ))}
          <div style={{ position: 'relative', zIndex: 3, width: 200, height: 120, borderRadius: 20, overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(108,60,225,0.3) 0%, rgba(0,229,255,0.15) 100%)',
            border: '1px solid rgba(108,60,225,0.4)', backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontFamily: 'Outfit', fontSize: 10, color: '#00E5FF', letterSpacing: '0.08em' }}>WELLNESS SCORE</p>
                <p style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: 1 }}>87<span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>/100</span></p>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(0,229,255,0.2)', border: '1px solid rgba(0,229,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8 L5 5 L8 9 L11 4 L14 8" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                {[85, 72, 91, 67, 88, 95, 87].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: 24, borderRadius: 3, background: `rgba(108,60,225,${0.3 + (h / 100) * 0.5})`, transform: `scaleY(${h/100})`, transformOrigin: 'bottom' }} />
                ))}
              </div>
              <p style={{ fontFamily: 'Inter', fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>7-day trend · +5% this week</p>
            </div>
          </div>
        </div>

        <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 40, color: '#fff', textAlign: 'center', lineHeight: 1.05, margin: '0 0 16px' }}>
          Your health.<br />
          <span style={{ background: 'linear-gradient(90deg, #6C3CE1, #00E5FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Supercharged.
          </span>
        </h1>
        <p style={{ fontFamily: 'Inter', fontSize: 15, color: 'rgba(240,240,255,0.5)', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
          All-in-one platform for coaches, students, and sellers to train, sell, and grow together.
        </p>
      </div>

      <div className="flex-shrink-0 px-6 pb-12 flex flex-col gap-3">
        <button
          onClick={() => setStep(1)}
          className="w-full py-4 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #6C3CE1, #00E5FF)', fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#fff', boxShadow: '0 0 30px rgba(108,60,225,0.5)' }}
        >
          Get Started Free
        </button>
        <button
          onClick={() => onSelectRole('student')}
          className="w-full py-4 rounded-2xl glass"
          style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 15, color: 'rgba(240,240,255,0.7)' }}
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
}
