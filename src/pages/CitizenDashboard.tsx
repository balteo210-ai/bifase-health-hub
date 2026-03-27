import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { useAppStore } from '@/lib/store';
import { Search, MapPin, Clock, LogOut, X, CheckCircle2, CreditCard, ShieldCheck, Navigation, Loader2 } from 'lucide-react';
import BifaseLogo from '@/components/BifaseLogo';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGeolocation, getDistanceKm } from '@/hooks/use-geolocation';

const CitizenDashboard = () => {
  const { user, services, appointments, bookAppointment, cancelAppointment, logout } = useAppStore();
  const navigate = useNavigate();
  const location = useGeolocation();
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<{ serviceId: string; slotId: string; time: string } | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paying, setPaying] = useState(false);

  const servicesWithDistance = useMemo(() => {
    if (!location.lat && !location.lng) return services.map((s) => ({ ...s, distance: null as number | null }));
    return services.map((s) => ({
      ...s,
      distance: getDistanceKm(location.lat, location.lng, s.lat, s.lng),
    }));
  }, [services, location.lat, location.lng]);

  const filteredServices = servicesWithDistance
    .filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.providerName.toLowerCase().includes(search.toLowerCase()) ||
        s.location.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (a.distance ?? 9999) - (b.distance ?? 9999));

  const activeAppointments = appointments.filter((a) => a.status === 'confirmed');
  const currentService = selectedSlot ? services.find((s) => s.id === selectedSlot.serviceId) : null;

  if (!user) { navigate('/role-select'); return null; }

  const handleSelectSlot = (serviceId: string, slotId: string, time: string) => {
    setSelectedSlot({ serviceId, slotId, time });
    setPaymentOpen(true);
  };

  const handleConfirmPayment = () => {
    if (!selectedSlot || !selectedDate) return;
    setPaying(true);
    setTimeout(() => {
      bookAppointment(selectedSlot.serviceId, selectedSlot.slotId, format(selectedDate, 'yyyy-MM-dd'));
      setPaying(false);
      setPaymentOpen(false);
      setSelectedSlot(null);
      setSelectedService(null);
      setSelectedDate(undefined);
      toast.success('Pagamento completato! Appuntamento confermato.');
    }, 1500);
  };

  const handleCancel = (appointmentId: string) => {
    cancelAppointment(appointmentId);
    toast('Appuntamento cancellato. Lo slot è ora disponibile per altri.', {
      icon: '🔄',
      description: 'Recupero intelligente dello slot attivato',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <BifaseLogo size="navbar" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Ciao, <span className="font-medium text-foreground">{user.name}</span></span>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/'); }} className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-12 rounded-2xl border-border/60 bg-card pl-12 text-base shadow-sm focus-visible:ring-primary/30"
              placeholder="Cerca servizi, operatori o località..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Location indicator */}
        <motion.div
          className="mb-6 flex items-center gap-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {location.loading ? (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Rilevamento posizione...
            </span>
          ) : (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Navigation className="h-4 w-4 text-primary" />
              <span>Posizione: <span className="font-medium text-foreground">{location.city || 'Italia'}</span></span>
              <span className="text-xs">· Servizi ordinati per distanza</span>
            </span>
          )}
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-5 font-display text-xl font-bold text-foreground">Servizi vicino a te</h2>
            <div className="space-y-4">
              {filteredServices.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-2xl border border-border/60 bg-card p-6 card-elevated"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.providerName}</p>
                      <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {service.location}</span>
                        {service.distance !== null && (
                          <Badge variant="outline" className="rounded-full text-xs gap-1">
                            <Navigation className="h-3 w-3" />
                            {service.distance < 1 ? `${(service.distance * 1000).toFixed(0)} m` : `${service.distance.toFixed(1)} km`}
                          </Badge>
                        )}
                        <Badge variant="secondary" className="rounded-full text-xs">{service.type}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-display text-lg font-bold text-primary">€{service.price.toFixed(2)}</span>
                      <Button size="sm" className="rounded-full" variant={selectedService === service.id ? 'outline' : 'default'}
                        onClick={() => { setSelectedService(selectedService === service.id ? null : service.id); setSelectedDate(undefined); }}>
                        {selectedService === service.id ? 'Chiudi' : 'Prenota'}
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedService === service.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden border-t pt-4"
                      >
                        <p className="mb-3 text-sm font-semibold text-foreground">1. Scegli una data:</p>
                        <div className="mb-4 flex justify-center">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            locale={it}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            className="rounded-2xl border border-border/60 bg-background p-3 pointer-events-auto"
                          />
                        </div>

                        {selectedDate && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="mb-3 text-sm font-semibold text-foreground">
                              2. Scegli un orario per il {format(selectedDate, 'd MMMM yyyy', { locale: it })}:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {service.slots.map((slot) => (
                                <Button key={slot.id} size="sm" variant={slot.available ? 'outline' : 'ghost'} disabled={!slot.available}
                                  className={`rounded-full ${slot.available ? 'border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground' : 'opacity-30'}`}
                                  onClick={() => handleSelectSlot(service.id, slot.id, slot.time)}>
                                  <Clock className="mr-1 h-3 w-3" />{slot.time}
                                </Button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-5 font-display text-xl font-bold text-foreground">I miei appuntamenti</h2>
            {activeAppointments.length === 0 ? (
              <div className="rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm">
                <p className="text-muted-foreground">Nessun appuntamento in programma</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeAppointments.map((apt) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span className="font-display font-semibold text-foreground">{apt.serviceName}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{apt.providerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {apt.date && !isNaN(new Date(apt.date).getTime())
                            ? format(new Date(apt.date), 'd MMMM yyyy', { locale: it })
                            : apt.date} alle {apt.time}
                        </p>
                        <p className="mt-1 text-sm font-medium text-primary">€{apt.price.toFixed(2)}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleCancel(apt.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={paymentOpen} onOpenChange={(open) => { if (!paying) setPaymentOpen(open); }}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Conferma e Paga
            </DialogTitle>
          </DialogHeader>
          {currentService && selectedDate && selectedSlot && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-secondary/50 p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Servizio</span>
                  <span className="font-medium text-foreground">{currentService.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Professionista</span>
                  <span className="font-medium text-foreground">{currentService.providerName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Data</span>
                  <span className="font-medium text-foreground">{format(selectedDate, 'd MMMM yyyy', { locale: it })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Orario</span>
                  <span className="font-medium text-foreground">{selectedSlot.time}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 p-4">
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Totale da pagare</span>
                  <span className="text-primary text-lg">€{currentService.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-success" />
                Pagamento sicuro e protetto
              </div>

              <Button
                onClick={handleConfirmPayment}
                disabled={paying}
                className="h-12 w-full rounded-xl text-base shadow-lg shadow-primary/20"
              >
                {paying ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Elaborazione in corso...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Paga €{currentService?.price.toFixed(2)}
                  </span>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CitizenDashboard;
