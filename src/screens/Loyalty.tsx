import { useState } from 'react';
import { Star, Trophy, Zap, Gift, ChevronRight, Clock, Users, Crown, Shield } from 'lucide-react';
import GlassCard, { Badge } from '../components/GlassCard';

const badges = [
  { name: 'Iron Will', desc: '30-day streak', icon: '🔥', earned: true, rarity: 'Legendary', color: '#FF6B35' },
  { name: 'Power Lifter', desc: 'Lift 1000kg total', icon: '🏋️', earned: true, rarity: 'Epic', color: '#6C3CE1' },
  { name: 'Early Bird', desc: '20 morning sessions', icon: '🌅', earned: true, rarity: 'Rare', color: '#FFD700' },
  { name: 'Nutrition Pro', desc: 'Log 60 days meals', icon: '🥗', earned: false, rarity: 'Epic', color: '#00E5FF', progress: 42, total: 60 },
  { name: 'Social Star', desc: 'Refer 5 friends', icon: '⭐', earned: false, rarity: 'Rare', color: '#FF2D78', progress: 3, total: 5 },
  { name: 'Century Run', desc: 'Run 100km total', icon: '🏃', earned: false, rarity: 'Legendary', color: '#FF6B35', progress: 67, total: 100 },
];

const quests = [
  { name: 'Daily Burn', desc: 'Complete 3 workouts this week', progress: 2, total: 3, reward: 150, color: '#6C3CE1', expires: '2 days' },
  { name: 'Hydration Hero', desc: 'Log 8 glasses daily for 5 days', progress: 3, total: 5, reward: 100, color: '#00E5FF', expires: '4 days' },
  { name: 'Knowledge Quest', desc: 'Watch 3 educational videos', progress: 1, total: 3, reward: 75, color: '#FFD700', expires: '5 days' },
];

const tiers = [
  { name: 'Bronze', minPoints: 0, icon: '🥉', color: '#CD7F32', benefits: ['5% product discount', 'Basic analytics'] },
  { name: 'Silver', minPoints: 500, icon: '🥈', color: '#C0C0C0', benefits: ['10% product discount', 'Priority booking', 'Exclusive content'] },
  { name: 'Gold', minPoints: 2000, icon: '🥇', color: '#FFD700', benefits: ['15% discount', 'Free shipping', 'Coach priority'] },
  { name: 'Platinum', minPoints: 5000, icon: '💎', color: '#00E5FF', benefits: ['20% discount', 'VIP support', 'Early access'] },
  { name: 'Diamond', minPoints: 10000, icon: '👑', color: '#6C3CE1', benefits: ['25% discount', 'Personal manager', 'Unlimited perks'] },
];

const rarityColors: Record<string, 'gold' | 'purple' | 'cyan' | 'pink' | 'muted'> = {
  Legendary: 'gold', Epic: 'purple', Rare: 'cyan', Common: 'muted',
};

const tabs = ['Overview', 'Badges', 'Quests', 'VIP Tiers'];

export default function Loyalty() {
  const [activeTab, setActiveTab] = useState('Overview');
  const userPoints = 2850;
  const userTier = 'Gold';
  const nextTier = 'Platinum';
  const nextTierPoints = 5000;

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#080810' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.12) 0%, transparent 50%), radial-gradient(ellipse at 100% 80%, rgba(108,60,225,0.1) 0%, transparent 40%)' }} />

      {/* Header with tier */}
      <div className="flex-shrink-0 pt-14 pb-0" style={{ position: 'relative' }}>
        <div style={{
          margin: '0 20px 0',
          padding: '20px',
          borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,140,0,0.1) 100%)',
          border: '1px solid rgba(255,215,0,0.3)',
          boxShadow: '0 0 30px rgba(255,215,0,0.15)',
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 22 }}>🥇</span>
                <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 22, color: '#FFD700' }}>GOLD</span>
                <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(240,240,255,0.5)' }}>Member</span>
              </div>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 12, color: 'rgba(255,215,0,0.7)', letterSpacing: '0.08em', margin: 0 }}>JORDAN CLARKE</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: 11, color: 'rgba(255,215,0,0.6)', letterSpacing: '0.06em', margin: '0 0 2px' }}>TOTAL POINTS</p>
              <p style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 30, color: '#FFD700', lineHeight: 1, margin: 0 }}>
                {userPoints.toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(240,240,255,0.5)' }}>{userPoints} / {nextTierPoints} pts to {nextTier}</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#FFD700' }}>{Math.round((userPoints / nextTierPoints) * 100)}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 3,
                width: `${(userPoints / nextTierPoints) * 100}%`,
                background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
                boxShadow: '0 0 8px rgba(255,215,0,0.5)',
              }} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, padding: '0 20px', overflowX: 'auto' }} className="hide-scrollbar">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              flexShrink: 0, fontFamily: 'Outfit', fontWeight: 600, fontSize: 13,
              padding: '7px 14px', borderRadius: 10,
              background: activeTab === t ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${activeTab === t ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: activeTab === t ? '#FFD700' : 'rgba(240,240,255,0.4)',
              cursor: 'pointer', marginBottom: 16,
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-5" style={{ paddingBottom: 20 }}>
        {activeTab === 'Overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { label: 'Badges', value: '12', icon: Trophy, color: '#FFD700' },
                { label: 'Quests', value: '3 active', icon: Zap, color: '#6C3CE1' },
                { label: 'Referrals', value: '3', icon: Users, color: '#00E5FF' },
              ].map(({ label, value, icon: Icon, color }, i) => (
                <GlassCard key={i} className="p-3 text-center">
                  <Icon size={18} color={color} style={{ margin: '0 auto 6px' }} />
                  <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 16, color: '#fff', margin: '0 0 2px' }}>{value}</p>
                  <p style={{ fontFamily: 'Inter', fontSize: 10, color: 'rgba(240,240,255,0.4)', margin: 0 }}>{label}</p>
                </GlassCard>
              ))}
            </div>

            {/* Recent badges */}
            <GlassCard className="p-4">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#fff', margin: 0 }}>Recent Badges</p>
                <button onClick={() => setActiveTab('Badges')} style={{ fontFamily: 'Inter', fontSize: 12, color: '#FFD700', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
                  See all <ChevronRight size={12} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {badges.filter(b => b.earned).slice(0, 4).map((b, i) => (
                  <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 16, margin: '0 auto 6px',
                      background: `${b.color}20`, border: `1px solid ${b.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                      boxShadow: `0 0 12px ${b.color}30`,
                    }}>
                      {b.icon}
                    </div>
                    <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 10, color: 'rgba(240,240,255,0.7)', margin: 0, lineHeight: 1.2 }}>{b.name}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Active quests */}
            <GlassCard className="p-4">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#fff', margin: 0 }}>Active Quests</p>
                <button onClick={() => setActiveTab('Quests')} style={{ fontFamily: 'Inter', fontSize: 12, color: '#6C3CE1', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
                  See all <ChevronRight size={12} />
                </button>
              </div>
              {quests.slice(0, 2).map((q, i) => (
                <div key={i} style={{ marginBottom: i < 1 ? 12 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <p style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 13, color: '#fff', margin: 0 }}>{q.name}</p>
                    <Badge color="gold" size="xs">+{q.reward} pts</Badge>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(240,240,255,0.45)' }}>{q.progress}/{q.total} · {q.expires} left</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: q.color }}>{Math.round((q.progress / q.total) * 100)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(q.progress / q.total) * 100}%`, background: `linear-gradient(90deg, ${q.color}80, ${q.color})` }} />
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>
        )}

        {activeTab === 'Badges' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {badges.map((b, i) => (
              <GlassCard key={i} className="p-4" style={{
                opacity: b.earned ? 1 : 0.7,
                background: b.earned ? `${b.color}10` : 'rgba(255,255,255,0.04)',
                border: b.earned ? `1px solid ${b.color}30` : '1px solid rgba(255,255,255,0.07)',
                boxShadow: b.earned ? `0 0 16px ${b.color}20` : 'none',
              }}>
                <div style={{ fontSize: 36, textAlign: 'center', marginBottom: 8, filter: b.earned ? 'none' : 'grayscale(100%)' }}>{b.icon}</div>
                <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 13, color: b.earned ? '#fff' : 'rgba(240,240,255,0.4)', margin: '0 0 3px', textAlign: 'center' }}>{b.name}</p>
                <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(240,240,255,0.4)', margin: '0 0 8px', textAlign: 'center' }}>{b.desc}</p>
                <div style={{ textAlign: 'center', marginBottom: b.earned ? 0 : 8 }}>
                  <Badge color={rarityColors[b.rarity] || 'muted'} size="xs">{b.rarity}</Badge>
                </div>
                {!b.earned && b.progress !== undefined && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'Inter', fontSize: 10, color: 'rgba(240,240,255,0.35)' }}>{b.progress}/{b.total}</span>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: b.color }}>{Math.round((b.progress! / b.total!) * 100)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(b.progress / b.total!) * 100}%`, background: b.color }} />
                    </div>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        )}

        {activeTab === 'Quests' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {quests.map((q, i) => (
              <GlassCard key={i} className="p-4" style={{ border: `1px solid ${q.color}25` }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: `${q.color}20`, border: `1px solid ${q.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={20} color={q.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 15, color: '#fff', margin: 0 }}>{q.name}</p>
                      <Badge color="gold" size="sm">+{q.reward} pts</Badge>
                    </div>
                    <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(240,240,255,0.55)', margin: '0 0 6px', lineHeight: 1.4 }}>{q.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Clock size={12} color="rgba(240,240,255,0.4)" />
                      <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(240,240,255,0.4)' }}>Expires in {q.expires}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(240,240,255,0.5)' }}>{q.progress} of {q.total} completed</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: q.color, fontWeight: 600 }}>{Math.round((q.progress / q.total) * 100)}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(q.progress / q.total) * 100}%`, background: `linear-gradient(90deg, ${q.color}80, ${q.color})` }} />
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {activeTab === 'VIP Tiers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {tiers.map((tier, i) => {
              const isCurrentTier = tier.name === userTier;
              const isPastTier = tiers.indexOf(tiers.find(t => t.name === userTier)!) > i;
              const isLocked = tiers.indexOf(tier) > tiers.findIndex(t => t.name === userTier);
              return (
                <GlassCard key={i} className="overflow-hidden" style={{
                  border: isCurrentTier ? `1px solid ${tier.color}50` : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isCurrentTier ? `0 0 20px ${tier.color}20` : 'none',
                  opacity: isLocked ? 0.6 : 1,
                }}>
                  {isCurrentTier && (
                    <div style={{ height: 3, background: `linear-gradient(90deg, ${tier.color}, transparent)` }} />
                  )}
                  <div style={{ padding: 16 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                        background: `${tier.color}15`, border: `1px solid ${tier.color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 24, boxShadow: isCurrentTier ? `0 0 16px ${tier.color}30` : 'none',
                      }}>
                        {tier.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                          <p style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 17, color: tier.color, margin: 0 }}>{tier.name}</p>
                          {isCurrentTier && <Badge color="gold" size="xs">Current</Badge>}
                          {isPastTier && <Badge color="cyan" size="xs">✓ Unlocked</Badge>}
                        </div>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'rgba(240,240,255,0.4)', margin: '0 0 8px' }}>
                          {tier.minPoints.toLocaleString()}+ points
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {tier.benefits.map((b, j) => (
                            <div key={j} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                              <div style={{ width: 5, height: 5, borderRadius: '50%', background: tier.color, flexShrink: 0 }} />
                              <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(240,240,255,0.55)' }}>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {isLocked && <Shield size={18} color="rgba(240,240,255,0.2)" />}
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
