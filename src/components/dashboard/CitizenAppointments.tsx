import { motion, AnimatePresence } from 'framer-motion';
import { format, isAfter, isBefore, isToday, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, X, Clock, MapPin, Phone, AlertTriangle, CalendarDays } from 'lucide-react';
import { Appointment } from '@/lib/store';

interface CitizenAppointmentsProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
}

const statusConfig = {
  confirmed: { label: 'Confermato', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', badge: 'default' as const },
  completed: { label: 'Completato', icon: CheckCircle2, color: 'text-primary', bg: 'bg-primary/10', badge: 'secondary' as const },
  cancelled: { label: 'Cancellato', icon: X, color: 'text-destructive', bg: 'bg-destructive/10', badge: 'destructive' as const },
  'no-show': { label: 'Non presentato', icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10', badge: 'destructive' as const },
};

const CitizenAppointments = ({ appointments, onCancel }: CitizenAppointmentsProps) => {
  if (appointments.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm">
        <CalendarDays className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="font-medium text-foreground">Nessun appuntamento</p>
        <p className="mt-1 text-sm text-muted-foreground">Prenota il tuo primo servizio dalla lista</p>
      </div>
    );
  }

  // Sort: upcoming first, then past
  const sorted = [...appointments].sort((a, b) => {
    const dateA = parseISO(a.date);
    const dateB = parseISO(b.date);
    if (a.status === 'confirmed' && b.status !== 'confirmed') return -1;
    if (a.status !== 'confirmed' && b.status === 'confirmed') return 1;
    return dateA.getTime() - dateB.getTime();
  });

  const upcoming = sorted.filter(a => a.status === 'confirmed');
  const past = sorted.filter(a => a.status !== 'confirmed');

  return (
    <div className="space-y-4">
      {upcoming.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">In programma</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />
            <div className="space-y-3">
              <AnimatePresence>
                {upcoming.map((apt, i) => (
                  <AppointmentCard key={apt.id} apt={apt} index={i} onCancel={onCancel} showCancel />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Passati</h3>
          <div className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-border/50" />
            <div className="space-y-3">
              {past.map((apt, i) => (
                <AppointmentCard key={apt.id} apt={apt} index={i} onCancel={onCancel} showCancel={false} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AppointmentCard = ({
  apt,
  index,
  onCancel,
  showCancel,
}: {
  apt: Appointment;
  index: number;
  onCancel: (id: string) => void;
  showCancel: boolean;
}) => {
  const config = statusConfig[apt.status];
  const StatusIcon = config.icon;
  const dateObj = parseISO(apt.date);
  const isUpcoming = isAfter(dateObj, new Date()) || isToday(dateObj);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative pl-10"
    >
      {/* Timeline dot */}
      <div className={`absolute left-3.5 top-5 h-3 w-3 rounded-full border-2 border-background ${config.bg} ring-2 ring-background`}>
        <div className={`h-full w-full rounded-full ${apt.status === 'confirmed' ? 'bg-success' : apt.status === 'completed' ? 'bg-primary' : 'bg-destructive'}`} />
      </div>

      <div className={`rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-all ${isUpcoming ? 'card-elevated' : 'opacity-75'}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <StatusIcon className={`h-4 w-4 shrink-0 ${config.color}`} />
              <span className="font-display font-semibold text-foreground truncate">{apt.serviceName}</span>
              <Badge variant={config.badge} className="rounded-full text-xs shrink-0">
                {config.label}
              </Badge>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">{apt.providerName}</p>
            <div className="mt-2 flex items-center gap-3 flex-wrap text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {isToday(dateObj) ? (
                  <span className="font-medium text-foreground">Oggi</span>
                ) : (
                  format(dateObj, 'd MMM yyyy', { locale: it })
                )}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {apt.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {apt.location}
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold text-primary">€{apt.price.toFixed(2)}</p>
          </div>

          {showCancel && apt.status === 'confirmed' && (
            <div className="flex flex-col gap-1.5 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl text-xs h-8"
                onClick={() => onCancel(apt.id)}
              >
                <X className="mr-1 h-3 w-3" />
                Cancella
              </Button>
              {apt.providerName && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground rounded-xl text-xs h-8"
                  onClick={() => window.open(`tel:+39000000000`)}
                >
                  <Phone className="mr-1 h-3 w-3" />
                  Contatta
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CitizenAppointments;
