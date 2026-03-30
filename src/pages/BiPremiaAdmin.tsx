import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import BifaseLogo from '@/components/BifaseLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useBiPremiaStore } from '@/lib/bipremia';
import { LogOut, ArrowLeft, Settings, Target, Gift, BarChart3, Save, Coins, Users } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

type AdminTab = 'config' | 'missions' | 'rewards' | 'stats';

const BiPremiaAdmin = () => {
  const { user, logout } = useAppStore();
  const navigate = useNavigate();
  const { config, missions, rewards, balance, totalEarned, transactions, referral, updateConfig, toggleMission, toggleReward } = useBiPremiaStore();
  const [tab, setTab] = useState<AdminTab>('config');
  const [localConfig, setLocalConfig] = useState(config);

  if (!user) { navigate('/role-select'); return null; }

  const handleSaveConfig = () => {
    updateConfig(localConfig);
    toast.success('Configurazione BiPremia salvata!');
  };

  const configFields = [
    { key: 'registration' as const, label: 'Registrazione', suffix: 'BiPoint' },
    { key: 'perEuro' as const, label: 'Per €1 speso', suffix: 'BiPoint' },
    { key: 'referralInviter' as const, label: 'Referral (chi invita)', suffix: 'BiPoint' },
    { key: 'referralInvited' as const, label: 'Referral (invitato)', suffix: 'BiPoint' },
    { key: 'review' as const, label: 'Recensione', suffix: 'BiPoint' },
    { key: 'appointmentCompleted' as const, label: 'Appuntamento completato', suffix: 'BiPoint' },
    { key: 'earlyBooking' as const, label: 'Prenotazione anticipata', suffix: 'BiPoint' },
    { key: 'noShowRecovery' as const, label: 'Riprenotazione no-show', suffix: 'BiPoint' },
    { key: 'streakBonus' as const, label: 'Bonus serie consecutiva', suffix: 'BiPoint' },
    { key: 'streakTarget' as const, label: 'App. per bonus serie', suffix: 'appuntamenti' },
  ];

  const tabs = [
    { id: 'config' as const, label: 'Regole', icon: <Settings className="h-3.5 w-3.5" /> },
    { id: 'missions' as const, label: 'Missioni', icon: <Target className="h-3.5 w-3.5" /> },
    { id: 'rewards' as const, label: 'Premi', icon: <Gift className="h-3.5 w-3.5" /> },
    { id: 'stats' as const, label: 'Statistiche', icon: <BarChart3 className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <BifaseLogo size="navbar" />
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="rounded-full gap-1"><Settings className="h-3 w-3" /> Admin</Badge>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/'); }}><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-2xl px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">⚙️ Admin BiPremia</h1>
          <p className="text-sm text-muted-foreground mb-6">Configura il programma fedeltà</p>

          <div className="flex gap-1.5 overflow-x-auto pb-1 mb-6">
            {tabs.map((t) => (
              <Button key={t.id} variant={tab === t.id ? 'default' : 'outline'} size="sm" className="rounded-full gap-1 shrink-0 text-xs" onClick={() => setTab(t.id)}>
                {t.icon} {t.label}
              </Button>
            ))}
          </div>

          {tab === 'config' && (
            <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-4">
              <h3 className="font-display font-bold text-foreground">Regole punti</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {configFields.map((f) => (
                  <div key={f.key} className="space-y-1">
                    <Label className="text-xs">{f.label}</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        value={localConfig[f.key]}
                        onChange={(e) => setLocalConfig({ ...localConfig, [f.key]: parseInt(e.target.value) || 0 })}
                        className="h-9 rounded-lg text-center"
                      />
                      <span className="text-xs text-muted-foreground shrink-0">{f.suffix}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 pt-2 border-t border-border/40">
                <div className="space-y-1">
                  <Label className="text-xs">Scadenza punti (giorni, 0 = nessuna)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={localConfig.expirationDays || 0}
                    onChange={(e) => setLocalConfig({ ...localConfig, expirationDays: parseInt(e.target.value) || null })}
                    className="h-9 rounded-lg text-center"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Limite accumulo (0 = nessuno)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={localConfig.maxAccumulation || 0}
                    onChange={(e) => setLocalConfig({ ...localConfig, maxAccumulation: parseInt(e.target.value) || null })}
                    className="h-9 rounded-lg text-center"
                  />
                </div>
              </div>
              <Button onClick={handleSaveConfig} className="w-full rounded-xl gap-2">
                <Save className="h-4 w-4" /> Salva configurazione
              </Button>
            </div>
          )}

          {tab === 'missions' && (
            <div className="space-y-3">
              {missions.map((m) => (
                <div key={m.id} className="rounded-2xl border border-border/60 bg-card p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-foreground">{m.title}</h4>
                      <Badge variant="secondary" className="rounded-full text-xs gap-1">
                        <Coins className="h-3 w-3" />+{m.reward}
                      </Badge>
                      {m.completed && <Badge className="rounded-full text-xs bg-success text-success-foreground">Completata</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{m.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">Progresso: {m.progress}/{m.target}</p>
                  </div>
                  <Switch checked={m.active} onCheckedChange={() => toggleMission(m.id)} />
                </div>
              ))}
            </div>
          )}

          {tab === 'rewards' && (
            <div className="space-y-3">
              {rewards.map((r) => (
                <div key={r.id} className="rounded-2xl border border-border/60 bg-card p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-foreground">{r.name}</h4>
                      <Badge variant="secondary" className="rounded-full text-xs">{r.cost} BiPoint</Badge>
                      <Badge variant="outline" className="rounded-full text-xs capitalize">{r.tier}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.description}</p>
                  </div>
                  <Switch checked={r.active} onCheckedChange={() => toggleReward(r.id)} />
                </div>
              ))}
            </div>
          )}

          {tab === 'stats' && (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-card p-5 text-center card-elevated">
                  <Coins className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold text-foreground">{balance}</p>
                  <p className="text-xs text-muted-foreground">Saldo attuale</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-5 text-center card-elevated">
                  <BarChart3 className="h-6 w-6 text-success mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold text-success">{totalEarned}</p>
                  <p className="text-xs text-muted-foreground">Totale emessi</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card p-5 text-center card-elevated">
                  <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-display text-2xl font-bold text-foreground">{referral.totalInvited}</p>
                  <p className="text-xs text-muted-foreground">Referral</p>
                </div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <h4 className="font-display font-bold text-foreground mb-3">Ultime transazioni</h4>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {transactions.slice(0, 20).map((tx) => (
                    <div key={tx.id} className="flex justify-between text-sm py-1.5 border-b border-border/30 last:border-0">
                      <span className="text-muted-foreground">{tx.reason}</span>
                      <span className={`font-semibold ${tx.type === 'earn' ? 'text-success' : 'text-destructive'}`}>
                        {tx.type === 'earn' ? '+' : '-'}{tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BiPremiaAdmin;
