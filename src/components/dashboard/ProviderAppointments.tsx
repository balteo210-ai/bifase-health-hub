import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO, isToday } from 'date-fns';
import { it } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  CheckCircle2, X, Clock, Phone, AlertTriangle, CalendarDays,
  User, LayoutList, CalendarRange, Ban
} from 'lucide-react';
import { Appointment } from '@/lib/store';
import { toast } from 'sonner';

interface ProviderAppointmentsProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
  onNoShow: (id: string) => void;
}

const statusConfig = {
  confirmed: { label: 'Confermato', color: 'text-success', badgeVariant: 'default' as const, dotColor: 'bg-success' },
  completed: { label: 'Completato', color: 'text-primary', badgeVariant: 'secondary' as const, dotColor: 'bg-primary' },
  cancelled: { label: 'Cancellato', color: 'text-destructive', badgeVariant: 'destructive' as const, dotColor: 'bg-destructive' },
  'no-show': { label: 'No-show', color: 'text-destructive', badgeVariant: 'destructive' as const, dotColor: 'bg-destructive' },
};

const ProviderAppointments = ({ appointments, onCancel, onComplete, onNoShow }: ProviderAppointmentsProps) => {
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');

  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);

  // Group by date for agenda view
  const grouped = filtered.reduce<Record<string, Appointment[]>>((acc, apt) => {
    const key = apt.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(apt);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const handleComplete = (id: string) => {
    onComplete(id);
    toast.success('Appuntamento completato!', { description: 'BiPoint accreditati al paziente 🪙' });
  };

  const handleNoShow = (id: string) => {
    onNoShow(id);
    toast('Paziente segnalato come non presentato', { icon: '⚠️' });
  };

  const handleContact = (phone?: string) => {
    if (phone) {
      window.open(`tel:${phone}`);
    } else {
      toast.info('Numero non disponibile');
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-8 text-center shadow-sm">
        <CalendarDays className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="font-medium text-foreground">Nessun appuntamento</p>
        <p className="mt-1 text-sm text-muted-foreground">Gli appuntamenti dei pazienti appariranno qui</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter badges */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all' as const, label: 'Tutti', count: appointments.length },
          { key: 'confirmed' as const, label: 'Confermati', count: appointments.filter(a => a.status === 'confirmed').length },
          { key: 'completed' as const, label: 'Completati', count: appointments.filter(a => a.status === 'completed').length },
          { key: 'cancelled' as const, label: 'Cancellati', count: appointments.filter(a => a.status === 'cancelled' || a.status === 'no-show').length },
        ].map(f => (
          <Button
            key={f.key}
            variant={filter === f.key ? 'default' : 'outline'}
            size="sm"
            className="rounded-full text-xs gap-1.5 h-8"
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <Badge variant="secondary" className="rounded-full text-[10px] px-1.5 py-0 h-4">{f.count}</Badge>
          </Button>
        ))}
      </div>

      <Tabs defaultValue="agenda" className="w-full">
        <TabsList className="rounded-xl w-full">
          <TabsTrigger value="agenda" className="rounded-lg gap-1.5 flex-1">
            <CalendarRange className="h-3.5 w-3.5" />
            Agenda
          </TabsTrigger>
          <TabsTrigger value="table" className="rounded-lg gap-1.5 flex-1">
            <LayoutList className="h-3.5 w-3.5" />
            Tabella
          </TabsTrigger>
        </TabsList>

        {/* AGENDA VIEW */}
        <TabsContent value="agenda" className="mt-4">
          <div className="space-y-6">
            {sortedDates.map(date => {
              const dateObj = parseISO(date);
              const today = isToday(dateObj);
              return (
                <div key={date}>
                  <div className="mb-3 flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${today ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'}`} />
                    <h4 className={`text-sm font-semibold ${today ? 'text-primary' : 'text-muted-foreground'}`}>
                      {today ? '📅 Oggi' : format(dateObj, 'EEEE d MMMM', { locale: it })}
                    </h4>
                  </div>
                  <div className="space-y-2 pl-4 border-l-2 border-border/50">
                    {grouped[date]
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((apt, i) => {
                        const config = statusConfig[apt.status];
                        return (
                          <motion.div
                            key={apt.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="rounded-xl border border-border/60 bg-card p-4 card-elevated"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-mono text-sm font-semibold text-foreground">{apt.time}</span>
                                  <div className={`h-1.5 w-1.5 rounded-full ${config.dotColor}`} />
                                  <span className="font-display font-semibold text-foreground">{apt.serviceName}</span>
                                  <Badge variant={config.badgeVariant} className="rounded-full text-[10px]">{config.label}</Badge>
                                </div>
                                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <User className="h-3.5 w-3.5" />
                                    {apt.patientName || 'Paziente'}
                                  </span>
                                  <span className="font-medium text-foreground">€{apt.price.toFixed(2)}</span>
                                  <span className="text-xs">(-€{apt.commission.toFixed(2)})</span>
                                </div>
                              </div>
                              {apt.status === 'confirmed' && (
                                <div className="flex gap-1 shrink-0">
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-success hover:bg-success/10 rounded-lg" onClick={() => handleComplete(apt.id)} title="Completato">
                                    <CheckCircle2 className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:bg-accent rounded-lg" onClick={() => handleContact(apt.patientPhone)} title="Contatta">
                                    <Phone className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-amber-500 hover:bg-amber-500/10 rounded-lg" onClick={() => handleNoShow(apt.id)} title="No-show">
                                    <AlertTriangle className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 rounded-lg" onClick={() => onCancel(apt.id)} title="Cancella">
                                    <Ban className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* TABLE VIEW */}
        <TabsContent value="table" className="mt-4">
          <div className="rounded-xl border border-border/60 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data / Ora</TableHead>
                  <TableHead>Paziente</TableHead>
                  <TableHead>Servizio</TableHead>
                  <TableHead>Importo</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered
                  .sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time))
                  .map(apt => {
                    const config = statusConfig[apt.status];
                    const dateObj = parseISO(apt.date);
                    return (
                      <TableRow key={apt.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span className="text-sm">{isToday(dateObj) ? 'Oggi' : format(dateObj, 'd MMM', { locale: it })}</span>
                            <span className="text-xs text-muted-foreground">{apt.time}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center">
                              <User className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{apt.patientName || 'Paziente'}</p>
                              {apt.patientPhone && (
                                <p className="text-[11px] text-muted-foreground">{apt.patientPhone}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{apt.serviceName}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">€{apt.price.toFixed(2)}</span>
                            <span className="text-[11px] text-muted-foreground">netto €{(apt.price - apt.commission).toFixed(2)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={config.badgeVariant} className="rounded-full text-[10px]">{config.label}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {apt.status === 'confirmed' && (
                            <div className="flex justify-end gap-1">
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-success hover:bg-success/10 rounded-lg" onClick={() => handleComplete(apt.id)} title="Completato">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-muted-foreground hover:bg-accent rounded-lg" onClick={() => handleContact(apt.patientPhone)} title="Contatta">
                                <Phone className="h-3.5 w-3.5" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-amber-500 hover:bg-amber-500/10 rounded-lg" onClick={() => handleNoShow(apt.id)} title="No-show">
                                <AlertTriangle className="h-3.5 w-3.5" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10 rounded-lg" onClick={() => onCancel(apt.id)} title="Cancella">
                                <Ban className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderAppointments;
