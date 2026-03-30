import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bell, Clock, Mail, MessageSquare, Save } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const ReminderSettings = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [timing24h, setTiming24h] = useState(true);
  const [timing2h, setTiming2h] = useState(true);
  const [customMessage, setCustomMessage] = useState(
    'Ciao {nome}, ti ricordiamo il tuo appuntamento di {servizio} previsto per {data} alle {ora}. Ti aspettiamo!'
  );

  const handleSave = () => {
    toast.success('Impostazioni promemoria salvate!', {
      description: 'I promemoria verranno inviati automaticamente prima di ogni appuntamento.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-2">
        <Bell className="h-5 w-5 text-primary" />
        <h3 className="font-display text-lg font-bold text-foreground">Promemoria Appuntamenti</h3>
      </div>

      <div className="space-y-5">
        {/* Channels */}
        <div>
          <p className="mb-3 text-sm font-semibold text-foreground">Canali di notifica</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Label className="cursor-pointer">Email</Label>
              </div>
              <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <Label className="cursor-pointer">SMS / WhatsApp</Label>
                <Badge variant="outline" className="rounded-full text-xs">Prossimamente</Badge>
              </div>
              <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} disabled />
            </div>
          </div>
        </div>

        {/* Timing */}
        <div>
          <p className="mb-3 text-sm font-semibold text-foreground">Quando inviare</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={timing24h ? 'default' : 'outline'}
              size="sm"
              className="rounded-full gap-1"
              onClick={() => setTiming24h(!timing24h)}
            >
              <Clock className="h-3.5 w-3.5" /> 24 ore prima
            </Button>
            <Button
              variant={timing2h ? 'default' : 'outline'}
              size="sm"
              className="rounded-full gap-1"
              onClick={() => setTiming2h(!timing2h)}
            >
              <Clock className="h-3.5 w-3.5" /> 2 ore prima
            </Button>
          </div>
        </div>

        {/* Custom Message */}
        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">Messaggio personalizzato</p>
          <Input
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="rounded-xl text-sm"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Variabili: {'{nome}'}, {'{servizio}'}, {'{data}'}, {'{ora}'}
          </p>
        </div>

        <Button onClick={handleSave} className="w-full rounded-xl gap-2">
          <Save className="h-4 w-4" /> Salva impostazioni
        </Button>
      </div>
    </motion.div>
  );
};

export default ReminderSettings;
