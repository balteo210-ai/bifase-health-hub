import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useBiPremiaStore, getTier, getTierInfo } from '@/lib/bipremia';
import { toast } from 'sonner';
import {
  Coins, TrendingUp, Gift, Target, Users, ArrowUp, ArrowDown,
  Copy, CheckCircle2, Calendar, Star, Flame, Compass, Clock
} from 'lucide-react';

const missionIcons: Record<string, React.ReactNode> = {
  calendar: <Calendar className="h-4 w-4" />,
  flame: <Flame className="h-4 w-4" />,
  users: <Users className="h-4 w-4" />,
  star: <Star className="h-4 w-4" />,
  compass: <Compass className="h-4 w-4" />,
};

type WalletTab = 'overview' | 'history' | 'rewards' | 'missions' | 'referral';

const BiPremiaWallet = () => {
  const {
    balance, totalEarned, transactions, missions, rewards, discountCodes, referral,
    redeemReward, earnReferral, earnReview,
  } = useBiPremiaStore();
  const [tab, setTab] = useState<WalletTab>('overview');
  const [copied, setCopied] = useState(false);
  const [lastCode, setLastCode] = useState<string | null>(null);

  const tier = getTier(totalEarned);
  const tierInfo = getTierInfo(tier);
  const nextTierInfo = tier === 'base' ? getTierInfo('plus') : tier === 'plus' ? getTierInfo('premium') : null;
  const progressToNext = nextTierInfo
    ? ((totalEarned - getTierInfo(tier).minPoints) / (nextTierInfo.minPoints - getTierInfo(tier).minPoints)) * 100
    : 100;

  const activeMissions = missions.filter((m) => m.active && !m.completed);
  const availableRewards = rewards.filter((r) => r.active);

  const handleRedeem = (rewardId: string, name: string) => {
    const result = redeemReward(rewardId);
    if (result) {
      setLastCode(result.code);
      toast.success(`Premio riscattato! Il tuo codice: ${result.code}`, {
        description: 'Inseriscilo al momento della prenotazione',
        duration: 8000,
      });
    } else {
      toast.error('BiPoint insufficienti');
    }
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referral.code);
    setCopied(true);
    toast.success('Codice copiato!');
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { id: WalletTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Riepilogo', icon: <Coins className="h-3.5 w-3.5" /> },
    { id: 'history', label: 'Movimenti', icon: <TrendingUp className="h-3.5 w-3.5" /> },
    { id: 'rewards', label: 'Premi', icon: <Gift className="h-3.5 w-3.5" /> },
    { id: 'missions', label: 'Missioni', icon: <Target className="h-3.5 w-3.5" /> },
    { id: 'referral', label: 'Invita', icon: <Users className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-6 text-primary-foreground relative overflow-hidden"
        style={{ background: 'var(--gradient-primary)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/20" />
          <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-white/10" />
        </div>
        <div className="relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm opacity-80">Il tuo saldo BiPoint</span>
            <Badge className="rounded-full bg-white/20 text-white border-0 gap-1">
              {tierInfo.icon} {tierInfo.label}
            </Badge>
          </div>
          <p className="font-display text-4xl font-extrabold">{balance}</p>
          <p className="text-xs opacity-70 mt-1">Totale guadagnati: {totalEarned}</p>

          {nextTierInfo && (
            <div className="mt-4">
              <div className="flex justify-between text-xs opacity-80 mb-1">
                <span>{tierInfo.label}</span>
                <span>{nextTierInfo.minPoints - totalEarned} punti al livello {nextTierInfo.label}</span>
              </div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-white/80"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressToNext, 100)}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map((t) => (
          <Button
            key={t.id}
            variant={tab === t.id ? 'default' : 'outline'}
            size="sm"
            className="rounded-full gap-1 shrink-0 text-xs"
            onClick={() => setTab(t.id)}
          >
            {t.icon} {t.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {tab === 'overview' && (
            <div className="space-y-4">
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-border/60 bg-card p-4 text-center card-elevated">
                  <p className="font-display text-xl font-bold text-foreground">{balance}</p>
                  <p className="text-xs text-muted-foreground">Disponibili</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-4 text-center card-elevated">
                  <p className="font-display text-xl font-bold text-success">{totalEarned}</p>
                  <p className="text-xs text-muted-foreground">Guadagnati</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-4 text-center card-elevated">
                  <p className="font-display text-xl font-bold text-primary">{activeMissions.length}</p>
                  <p className="text-xs text-muted-foreground">Missioni</p>
                </div>
              </div>

              {/* Recent transactions */}
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <h4 className="font-display font-bold text-foreground mb-3">Ultimi movimenti</h4>
                <div className="space-y-2.5">
                  {transactions.slice(0, 5).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {tx.type === 'earn' ? (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-success/10">
                            <ArrowUp className="h-3.5 w-3.5 text-success" />
                          </div>
                        ) : (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10">
                            <ArrowDown className="h-3.5 w-3.5 text-destructive" />
                          </div>
                        )}
                        <span className="text-foreground">{tx.reason}</span>
                      </div>
                      <span className={`font-semibold ${tx.type === 'earn' ? 'text-success' : 'text-destructive'}`}>
                        {tx.type === 'earn' ? '+' : '-'}{tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="rounded-2xl h-auto py-4 flex-col gap-2"
                  onClick={() => { earnReview(); toast.success('+100 BiPoint per la recensione!'); }}
                >
                  <Star className="h-5 w-5 text-primary" />
                  <span className="text-xs">Lascia recensione</span>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl h-auto py-4 flex-col gap-2"
                  onClick={() => setTab('referral')}
                >
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-xs">Invita amici</span>
                </Button>
              </div>
            </div>
          )}

          {tab === 'history' && (
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <h4 className="font-display font-bold text-foreground mb-3">Storico movimenti</h4>
              {transactions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">Nessun movimento</p>
              ) : (
                <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between text-sm py-2 border-b border-border/30 last:border-0">
                      <div className="flex items-center gap-2.5">
                        {tx.type === 'earn' ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                            <ArrowUp className="h-4 w-4 text-success" />
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
                            <ArrowDown className="h-4 w-4 text-destructive" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-foreground">{tx.reason}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(tx.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <span className={`font-bold ${tx.type === 'earn' ? 'text-success' : 'text-destructive'}`}>
                        {tx.type === 'earn' ? '+' : '-'}{tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'rewards' && (
            <div className="space-y-3">
              {availableRewards.map((reward) => {
                const canAfford = balance >= reward.cost;
                const tierOk = tier === 'premium' || (tier === 'plus' && reward.tier !== 'premium') || reward.tier === 'base';
                return (
                  <motion.div
                    key={reward.id}
                    className={`rounded-2xl border bg-card p-4 card-elevated ${!canAfford ? 'opacity-60' : 'border-border/60'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Gift className="h-4 w-4 text-primary" />
                          <h4 className="font-display font-bold text-foreground">{reward.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="rounded-full text-xs">
                            <Coins className="h-3 w-3 mr-1" />{reward.cost} BiPoint
                          </Badge>
                          <Badge variant="outline" className="rounded-full text-xs capitalize">{reward.tier}</Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="rounded-full shrink-0"
                        disabled={!canAfford || !tierOk}
                        onClick={() => handleRedeem(reward.id, reward.name)}
                      >
                        Riscatta
                      </Button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Active discount codes */}
              {discountCodes.length > 0 && (
                <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-5 mt-4">
                  <h4 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                    🎟️ I tuoi codici sconto
                  </h4>
                  <div className="space-y-2">
                    {discountCodes.map((dc) => (
                      <div key={dc.code} className={`flex items-center justify-between rounded-xl bg-card p-3 border border-border/60 ${dc.used ? 'opacity-50' : ''}`}>
                        <div>
                          <code className="font-mono font-bold text-foreground tracking-wider">{dc.code}</code>
                          <p className="text-xs text-muted-foreground">{dc.rewardName}{dc.used ? ' · Utilizzato' : ''}</p>
                        </div>
                        {!dc.used && (
                          <Button size="sm" variant="ghost" className="rounded-full" onClick={() => {
                            navigator.clipboard.writeText(dc.code);
                            toast.success('Codice copiato!');
                          }}>
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'missions' && (
            <div className="space-y-3">
              {missions.filter((m) => m.active).map((mission) => (
                <motion.div
                  key={mission.id}
                  className={`rounded-2xl border border-border/60 bg-card p-4 card-elevated ${mission.completed ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                      {missionIcons[mission.icon] || <Target className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-foreground">{mission.title}</h4>
                        <Badge variant="secondary" className="rounded-full text-xs gap-1">
                          <Coins className="h-3 w-3" />+{mission.reward}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{mission.description}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <Progress value={(mission.progress / mission.target) * 100} className="h-2 flex-1" />
                        <span className="text-xs font-medium text-muted-foreground">
                          {mission.completed ? (
                            <span className="flex items-center gap-1 text-success"><CheckCircle2 className="h-3.5 w-3.5" /> Completata</span>
                          ) : (
                            `${mission.progress}/${mission.target}`
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {tab === 'referral' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-border/60 bg-card p-6 text-center card-elevated">
                <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                <h4 className="font-display text-lg font-bold text-foreground">Invita un amico</h4>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Condividi il codice e guadagnate entrambi BiPoint!
                </p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <code className="rounded-xl bg-secondary px-4 py-2.5 font-mono text-lg font-bold text-foreground tracking-wider">
                    {referral.code}
                  </code>
                  <Button size="icon" variant="outline" className="rounded-xl" onClick={handleCopyReferral}>
                    {copied ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl bg-secondary/50 p-3">
                    <p className="font-display text-xl font-bold text-foreground">{referral.totalInvited}</p>
                    <p className="text-xs text-muted-foreground">Amici invitati</p>
                  </div>
                  <div className="rounded-xl bg-success/5 p-3">
                    <p className="font-display text-xl font-bold text-success">{referral.totalEarned}</p>
                    <p className="text-xs text-muted-foreground">BiPoint guadagnati</p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full rounded-xl gap-2"
                onClick={() => { earnReferral(true); toast.success('+300 BiPoint! Amico invitato con successo.'); }}
              >
                <Users className="h-4 w-4" /> Simula invito amico
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BiPremiaWallet;
