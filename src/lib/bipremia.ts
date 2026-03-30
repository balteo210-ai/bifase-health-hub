// BiPremia Loyalty System - Store & Logic
import { create } from 'zustand';

// ── Types ──────────────────────────────────────────────

export type TierLevel = 'base' | 'plus' | 'premium';

export interface BiPointTransaction {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  reason: string;
  date: string;
  expiresAt?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  target: number;
  progress: number;
  completed: boolean;
  active: boolean;
  icon: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  tier: TierLevel;
  type: 'discount' | 'service' | 'prize';
  discountPercent?: number;
  active: boolean;
}

export interface DiscountCode {
  code: string;
  rewardId: string;
  rewardName: string;
  discountPercent?: number;
  used: boolean;
  createdAt: string;
}

export interface ReferralInfo {
  code: string;
  totalInvited: number;
  totalEarned: number;
}

export interface PointsConfig {
  registration: number;
  perEuro: number;
  referralInviter: number;
  referralInvited: number;
  review: number;
  appointmentCompleted: number;
  earlyBooking: number;
  noShowRecovery: number;
  streakBonus: number;
  streakTarget: number;
  expirationDays: number | null;
  maxAccumulation: number | null;
}

// ── Defaults ───────────────────────────────────────────

const DEFAULT_CONFIG: PointsConfig = {
  registration: 200,
  perEuro: 10,
  referralInviter: 300,
  referralInvited: 200,
  review: 100,
  appointmentCompleted: 200,
  earlyBooking: 100,
  noShowRecovery: 150,
  streakBonus: 300,
  streakTarget: 3,
  expirationDays: null,
  maxAccumulation: null,
};

const DEFAULT_MISSIONS: Mission[] = [
  { id: 'm1', title: 'Prima prenotazione', description: 'Completa il tuo primo appuntamento', reward: 200, target: 1, progress: 0, completed: false, active: true, icon: 'calendar' },
  { id: 'm2', title: 'Abitudinario', description: 'Completa 3 appuntamenti consecutivi', reward: 300, target: 3, progress: 0, completed: false, active: true, icon: 'flame' },
  { id: 'm3', title: 'Passaparola', description: 'Invita un amico che completa un\'azione', reward: 300, target: 1, progress: 0, completed: false, active: true, icon: 'users' },
  { id: 'm4', title: 'Recensore', description: 'Lascia 3 recensioni', reward: 300, target: 3, progress: 0, completed: false, active: true, icon: 'star' },
  { id: 'm5', title: 'Esploratore', description: 'Prenota 3 servizi diversi in 30 giorni', reward: 500, target: 3, progress: 0, completed: false, active: true, icon: 'compass' },
  { id: 'm6', title: 'Prenota in anticipo', description: 'Fai 2 prenotazioni con almeno 7 giorni di anticipo', reward: 200, target: 2, progress: 0, completed: false, active: true, icon: 'clock' },
];

const DEFAULT_REWARDS: Reward[] = [
  { id: 'r1', name: 'Sconto 5%', description: 'Sconto del 5% sulla prossima prenotazione', cost: 5000, tier: 'base', type: 'discount', discountPercent: 5, active: true },
  { id: 'r2', name: 'Sconto 10%', description: 'Sconto del 10% sulla prossima prenotazione', cost: 10000, tier: 'plus', type: 'discount', discountPercent: 10, active: true },
  { id: 'r3', name: 'Visita gratuita', description: 'Una visita generale gratuita', cost: 20000, tier: 'premium', type: 'service', discountPercent: 100, active: true },
  { id: 'r4', name: 'Priorità prenotazione', description: 'Accesso prioritario agli slot per 30 giorni', cost: 7500, tier: 'plus', type: 'prize', active: true },
  { id: 'r5', name: 'Kit benessere', description: 'Kit benessere esclusivo Bifase', cost: 25000, tier: 'premium', type: 'prize', active: true },
];

// ── Helpers ────────────────────────────────────────────

export function getTier(points: number): TierLevel {
  if (points >= 25000) return 'premium';
  if (points >= 10000) return 'plus';
  return 'base';
}

export function getTierInfo(tier: TierLevel) {
  const tiers = {
    base: { label: 'Base', minPoints: 0, maxPoints: 9999, color: 'text-muted-foreground', bg: 'bg-muted', icon: '🪙' },
    plus: { label: 'Plus', minPoints: 10000, maxPoints: 24999, color: 'text-primary', bg: 'bg-primary/10', icon: '⭐' },
    premium: { label: 'Premium', minPoints: 25000, maxPoints: Infinity, color: 'text-amber-500', bg: 'bg-amber-500/10', icon: '👑' },
  };
  return tiers[tier];
}

function generateReferralCode(): string {
  return 'BIF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// ── Store ──────────────────────────────────────────────

interface BiPremiaState {
  balance: number;
  totalEarned: number;
  transactions: BiPointTransaction[];
  missions: Mission[];
  rewards: Reward[];
  discountCodes: DiscountCode[];
  config: PointsConfig;
  referral: ReferralInfo;
  consecutiveAppointments: number;

  // Earn actions
  earnPoints: (amount: number, reason: string) => void;
  earnRegistration: () => void;
  earnPurchase: (euroAmount: number) => void;
  earnAppointmentCompleted: () => void;
  earnEarlyBooking: () => void;
  earnNoShowRecovery: () => void;
  earnReview: () => void;
  earnReferral: (isInviter: boolean) => void;

  // Spend actions
  redeemReward: (rewardId: string) => DiscountCode | null;
  useDiscountCode: (code: string) => DiscountCode | null;

  // Mission actions
  updateMissionProgress: (missionId: string, increment?: number) => void;

  // Admin actions
  updateConfig: (config: Partial<PointsConfig>) => void;
  toggleMission: (missionId: string) => void;
  addMission: (mission: Omit<Mission, 'id' | 'progress' | 'completed'>) => void;
  toggleReward: (rewardId: string) => void;
  addReward: (reward: Omit<Reward, 'id'>) => void;
  removeReward: (rewardId: string) => void;
}

export const useBiPremiaStore = create<BiPremiaState>((set, get) => ({
  balance: 20, // Registration bonus already applied
  totalEarned: 20,
  transactions: [
    { id: 't0', type: 'earn', amount: 20, reason: 'Bonus registrazione', date: new Date().toISOString() },
  ],
  missions: DEFAULT_MISSIONS,
  rewards: DEFAULT_REWARDS,
  discountCodes: [],
  config: DEFAULT_CONFIG,
  referral: { code: generateReferralCode(), totalInvited: 0, totalEarned: 0 },
  consecutiveAppointments: 0,

  earnPoints: (amount, reason) => {
    const { config } = get();
    const currentBalance = get().balance;
    if (config.maxAccumulation && currentBalance + amount > config.maxAccumulation) {
      amount = Math.max(0, config.maxAccumulation - currentBalance);
    }
    if (amount <= 0) return;

    const tx: BiPointTransaction = {
      id: `t-${Date.now()}`,
      type: 'earn',
      amount,
      reason,
      date: new Date().toISOString(),
      ...(config.expirationDays ? { expiresAt: new Date(Date.now() + config.expirationDays * 86400000).toISOString() } : {}),
    };

    set((s) => ({
      balance: s.balance + amount,
      totalEarned: s.totalEarned + amount,
      transactions: [tx, ...s.transactions],
    }));
  },

  earnRegistration: () => get().earnPoints(get().config.registration, 'Bonus registrazione'),
  earnPurchase: (euroAmount) => get().earnPoints(Math.floor(euroAmount * get().config.perEuro), `Acquisto €${euroAmount.toFixed(2)}`),

  earnAppointmentCompleted: () => {
    const { config, consecutiveAppointments } = get();
    get().earnPoints(config.appointmentCompleted, 'Appuntamento completato');

    const newStreak = consecutiveAppointments + 1;
    set({ consecutiveAppointments: newStreak });

    if (newStreak >= config.streakTarget) {
      get().earnPoints(config.streakBonus, `Bonus serie (${config.streakTarget} consecutivi)`);
      set({ consecutiveAppointments: 0 });
    }

    // Update mission progress
    get().updateMissionProgress('m1');
    get().updateMissionProgress('m2');
    get().updateMissionProgress('m5');
  },

  earnEarlyBooking: () => get().earnPoints(get().config.earlyBooking, 'Prenotazione anticipata'),
  earnNoShowRecovery: () => get().earnPoints(get().config.noShowRecovery, 'Riprenotazione dopo no-show'),
  earnReview: () => {
    get().earnPoints(get().config.review, 'Recensione lasciata');
    get().updateMissionProgress('m4');
  },
  earnReferral: (isInviter) => {
    const { config } = get();
    const amount = isInviter ? config.referralInviter : config.referralInvited;
    const reason = isInviter ? 'Referral: amico invitato' : 'Bonus referral benvenuto';
    get().earnPoints(amount, reason);
    if (isInviter) {
      set((s) => ({
        referral: {
          ...s.referral,
          totalInvited: s.referral.totalInvited + 1,
          totalEarned: s.referral.totalEarned + amount,
        },
      }));
      get().updateMissionProgress('m3');
    }
  },

  redeemReward: (rewardId) => {
    const { rewards, balance } = get();
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward || !reward.active || balance < reward.cost) return null;

    const discountCode: DiscountCode = {
      code: 'BIFASE-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      rewardId: reward.id,
      rewardName: reward.name,
      discountPercent: reward.discountPercent,
      used: false,
      createdAt: new Date().toISOString(),
    };

    const tx: BiPointTransaction = {
      id: `t-${Date.now()}`,
      type: 'spend',
      amount: reward.cost,
      reason: `Premio: ${reward.name} → Codice: ${discountCode.code}`,
      date: new Date().toISOString(),
    };

    set((s) => ({
      balance: s.balance - reward.cost,
      transactions: [tx, ...s.transactions],
      discountCodes: [discountCode, ...s.discountCodes],
    }));
    return discountCode;
  },

  useDiscountCode: (code) => {
    const { discountCodes } = get();
    const dc = discountCodes.find((d) => d.code === code && !d.used);
    if (!dc) return null;
    set((s) => ({
      discountCodes: s.discountCodes.map((d) => d.code === code ? { ...d, used: true } : d),
    }));
    return dc;
  },

  updateMissionProgress: (missionId, increment = 1) => {
    set((s) => ({
      missions: s.missions.map((m) => {
        if (m.id !== missionId || m.completed || !m.active) return m;
        const newProgress = Math.min(m.progress + increment, m.target);
        const completed = newProgress >= m.target;
        if (completed) {
          setTimeout(() => get().earnPoints(m.reward, `Missione completata: ${m.title}`), 100);
        }
        return { ...m, progress: newProgress, completed };
      }),
    }));
  },

  updateConfig: (partial) => set((s) => ({ config: { ...s.config, ...partial } })),
  toggleMission: (id) => set((s) => ({ missions: s.missions.map((m) => m.id === id ? { ...m, active: !m.active } : m) })),
  addMission: (mission) => set((s) => ({ missions: [...s.missions, { ...mission, id: `m-${Date.now()}`, progress: 0, completed: false }] })),
  toggleReward: (id) => set((s) => ({ rewards: s.rewards.map((r) => r.id === id ? { ...r, active: !r.active } : r) })),
  addReward: (reward) => set((s) => ({ rewards: [...s.rewards, { ...reward, id: `r-${Date.now()}` }] })),
  removeReward: (id) => set((s) => ({ rewards: s.rewards.filter((r) => r.id !== id) })),
}));
