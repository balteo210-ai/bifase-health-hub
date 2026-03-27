import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { Search, MapPin, Clock, LogOut, X, CheckCircle2 } from 'lucide-react';
import BifaseLogo from '@/components/BifaseLogo';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const CitizenDashboard = () => {
  const { user, services, appointments, bookAppointment, cancelAppointment, logout } = useAppStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  if (!user) { navigate('/role-select'); return null; }

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.providerName.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
  );

  const activeAppointments = appointments.filter((a) => a.status === 'confirmed');

  const handleBook = (serviceId: string, slotId: string) => {
    bookAppointment(serviceId, slotId);
    setSelectedService(null);
    toast.success('Appuntamento prenotato con successo!');
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
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
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

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-5 font-display text-xl font-bold text-foreground">Servizi disponibili</h2>
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
                        <Badge variant="secondary" className="rounded-full text-xs">{service.type}</Badge>
                      </div>
                    </div>
                    <Button size="sm" className="rounded-full" variant={selectedService === service.id ? 'outline' : 'default'}
                      onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}>
                      {selectedService === service.id ? 'Chiudi' : 'Prenota'}
                    </Button>
                  </div>
                  {selectedService === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t pt-4"
                    >
                      <p className="mb-3 text-sm font-medium text-foreground">Orari disponibili:</p>
                      <div className="flex flex-wrap gap-2">
                        {service.slots.map((slot) => (
                          <Button key={slot.id} size="sm" variant={slot.available ? 'outline' : 'ghost'} disabled={!slot.available}
                            className={`rounded-full ${slot.available ? 'border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground' : 'opacity-30'}`}
                            onClick={() => handleBook(service.id, slot.id)}>
                            <Clock className="mr-1 h-3 w-3" />{slot.time}
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )}
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
                        <p className="text-sm text-muted-foreground">{apt.date} alle {apt.time}</p>
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
    </div>
  );
};

export default CitizenDashboard;
