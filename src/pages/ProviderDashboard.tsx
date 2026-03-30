import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BifaseLogo from '@/components/BifaseLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAppStore, COMMISSION_RATE, SUBSCRIPTION_PRICE } from '@/lib/store';
import { LogOut, Plus, Trash2, Calendar, Users, Clock, X, CheckCircle2, Euro, Crown, ShieldCheck, Bell, LifeBuoy, Coins } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import ReminderSettings from '@/components/dashboard/ReminderSettings';
import NoShowRecovery from '@/components/dashboard/NoShowRecovery';

const ProviderDashboard = () => {
  const { user, providerServices, providerAppointments, addProviderService, removeProviderService, cancelAppointment, logout, subscribe } = useAppStore();
  const navigate = useNavigate();
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  if (!user) { navigate('/role-select'); return null; }

  // Show subscription gate if not subscribed
  if (!user.subscribed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4" style={{ background: 'var(--gradient-hero)' }}>
        <motion.div
          className="w-full max-w-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-3xl border border-border/60 bg-card p-10 shadow-xl" style={{ boxShadow: 'var(--shadow-elevated)' }}>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5">
              <Crown className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Piano Professionale</h1>
            <p className="mb-8 text-muted-foreground">
              Per iniziare a gestire i tuoi appuntamenti su Bifase, attiva il piano annuale.
            </p>

            <div className="mb-8 rounded-2xl bg-secondary/50 p-6">
              <div className="mb-2 text-sm text-muted-foreground">Abbonamento annuale</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-5xl font-extrabold text-foreground">€{SUBSCRIPTION_PRICE}</span>
                <span className="text-muted-foreground">/anno</span>
              </div>
              <div className="mt-4 space-y-2 text-left text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Gestione completa appuntamenti</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Profilo visibile ai cittadini</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Recupero intelligente degli slot</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Dashboard analytics</div>
              </div>
              <div className="mt-4 rounded-xl bg-accent/50 px-3 py-2 text-xs text-accent-foreground">
                Commissione del {COMMISSION_RATE * 100}% su ogni prestazione erogata
              </div>
            </div>

            <Button
              onClick={() => {
                setSubscribing(true);
                setTimeout(() => {
                  subscribe();
                  setSubscribing(false);
                  toast.success('Abbonamento attivato! Benvenuto su Bifase.');
                }, 1500);
              }}
              disabled={subscribing}
              className="h-12 w-full rounded-xl text-base shadow-lg shadow-primary/20"
            >
              {subscribing ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Elaborazione...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Euro className="h-4 w-4" />
                  Abbonati ora — €{SUBSCRIPTION_PRICE}/anno
                </span>
              )}
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-success" />
              Pagamento sicuro e protetto
            </div>

            <button onClick={() => { logout(); navigate('/'); }} className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Torna alla home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const confirmedAppointments = providerAppointments.filter((a) => a.status === 'confirmed');
  const totalSlots = providerServices.reduce((acc, s) => acc + s.slots.length, 0);
  const availableSlots = providerServices.reduce((acc, s) => acc + s.slots.filter((sl) => sl.available).length, 0);
  const totalRevenue = providerAppointments.filter((a) => a.status === 'confirmed').reduce((acc, a) => acc + a.price, 0);
  const totalCommission = providerAppointments.filter((a) => a.status === 'confirmed').reduce((acc, a) => acc + a.commission, 0);

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    addProviderService({
      name: newName, providerName: user.name, location: newLocation, type: newType,
      price: parseFloat(newPrice) || 0,
      lat: 45.4642, lng: 9.1900,
      slots: [
        { id: `ns-${Date.now()}-1`, time: '09:00', available: true },
        { id: `ns-${Date.now()}-2`, time: '10:00', available: true },
        { id: `ns-${Date.now()}-3`, time: '11:00', available: true },
        { id: `ns-${Date.now()}-4`, time: '14:00', available: true },
        { id: `ns-${Date.now()}-5`, time: '15:00', available: true },
      ],
    });
    setNewName(''); setNewType(''); setNewLocation(''); setNewPrice('');
    setDialogOpen(false);
    toast.success('Servizio aggiunto con successo!');
  };

  const handleCancelAppointment = (id: string) => {
    cancelAppointment(id);
    toast('Appuntamento cancellato. Slot recuperato.', { icon: '🔄', description: 'Recupero intelligente dello slot attivato' });
  };

  const stats = [
    { icon: Calendar, label: 'In programma', value: confirmedAppointments.length, color: 'text-primary', bg: 'from-primary/10 to-primary/5' },
    { icon: Euro, label: 'Ricavo netto', value: `€${(totalRevenue - totalCommission).toFixed(0)}`, color: 'text-success', bg: 'from-success/10 to-success/5' },
    { icon: Clock, label: 'Slot disponibili', value: `${availableSlots}/${totalSlots}`, color: 'text-accent-foreground', bg: 'from-accent to-accent/50' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <BifaseLogo size="navbar" />
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="rounded-full gap-1"><Crown className="h-3 w-3" /> Pro</Badge>
            <span className="text-sm text-muted-foreground">{user.name}</span>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => { logout(); navigate('/'); }}><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Commission banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl border border-primary/20 bg-primary/[0.04] p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Euro className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Commissioni Bifase ({COMMISSION_RATE * 100}%)</p>
              <p className="text-xs text-muted-foreground">Totale commissioni: €{totalCommission.toFixed(2)}</p>
            </div>
          </div>
          <Badge className="rounded-full">Piano attivo</Badge>
        </motion.div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="rounded-2xl border border-border/60 bg-card p-6 card-elevated"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-foreground">I miei servizi</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1 rounded-full"><Plus className="h-4 w-4" /> Aggiungi</Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl">
                  <DialogHeader><DialogTitle className="font-display">Aggiungi nuovo servizio</DialogTitle></DialogHeader>
                  <form onSubmit={handleAddService} className="space-y-4">
                    <div className="space-y-2"><Label>Nome del servizio</Label><Input value={newName} onChange={(e) => setNewName(e.target.value)} required placeholder="es. Visita generale" className="h-11 rounded-xl" /></div>
                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <Select value={newType} onValueChange={setNewType}>
                        <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Seleziona tipo" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Medicina Generale">Medicina Generale</SelectItem>
                          <SelectItem value="Odontoiatria">Odontoiatria</SelectItem>
                          <SelectItem value="Farmacia">Farmacia</SelectItem>
                          <SelectItem value="Fisioterapia">Fisioterapia</SelectItem>
                          <SelectItem value="Oculistica">Oculistica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Località</Label><Input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} required placeholder="es. Milano Centro" className="h-11 rounded-xl" /></div>
                    <div className="space-y-2">
                      <Label>Prezzo (€)</Label>
                      <Input type="number" min="0" step="0.01" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required placeholder="es. 80.00" className="h-11 rounded-xl" />
                      <p className="text-xs text-muted-foreground">Commissione Bifase: {COMMISSION_RATE * 100}% su ogni prestazione</p>
                    </div>
                    <Button type="submit" className="h-11 w-full rounded-xl">Aggiungi servizio</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-3">
              {providerServices.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-2xl border border-border/60 bg-card p-5 card-elevated"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-bold text-foreground">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.location}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full text-xs">{service.type}</Badge>
                        <span className="text-sm font-semibold text-primary">€{service.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => { removeProviderService(service.id); toast.success('Servizio rimosso'); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.slots.map((slot) => (
                      <span key={slot.id} className={`rounded-full px-3 py-1 text-xs font-medium ${slot.available ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground line-through'}`}>
                        {slot.time}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-5 font-display text-xl font-bold text-foreground">Appuntamenti</h2>
            {providerAppointments.length === 0 ? (
              <div className="rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm"><p className="text-muted-foreground">Nessun appuntamento</p></div>
            ) : (
              <div className="space-y-3">
                {providerAppointments.map((apt, i) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="rounded-2xl border border-border/60 bg-card p-4 card-elevated"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          {apt.status === 'confirmed' ? <CheckCircle2 className="h-4 w-4 text-success" /> : <X className="h-4 w-4 text-destructive" />}
                          <span className="font-display font-semibold text-foreground">{apt.serviceName}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{apt.date} alle {apt.time}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-sm font-medium text-foreground">€{apt.price.toFixed(2)}</span>
                          <span className="text-xs text-muted-foreground">- €{apt.commission.toFixed(2)} comm.</span>
                          <Badge variant={apt.status === 'confirmed' ? 'default' : 'destructive'} className="rounded-full text-xs">
                            {apt.status === 'confirmed' ? 'confermato' : 'cancellato'}
                          </Badge>
                        </div>
                      </div>
                      {apt.status === 'confirmed' && (
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleCancelAppointment(apt.id)}>
                          Cancella
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reminder & Salvagente Section */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <ReminderSettings />
          <NoShowRecovery />
        </div>

        {/* BiPremia Admin Link */}
        <div className="mt-8">
          <Link to="/bipremia/admin">
            <Button variant="outline" className="w-full rounded-2xl h-14 gap-2 text-base">
              <Coins className="h-5 w-5 text-primary" />
              Gestisci BiPremia — Programma Fedeltà
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
