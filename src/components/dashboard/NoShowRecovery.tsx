import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LifeBuoy, Mail, Tag, BarChart3, Save } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface NoShowStats {
  total: number;
  recovered: number;
}

interface NoShowRecoveryProps {
  stats?: NoShowStats;
}

const NoShowRecovery = ({ stats = { total: 3, recovered: 1 } }: NoShowRecoveryProps) => {
  const [autoFollowUp, setAutoFollowUp] = useState(true);
  const [offerDiscount, setOfferDiscount] = useState(false);
  const [discountPercent, setDiscountPercent] = useState('10');
  const [priorityRebooking, setPriorityRebooking] = useState(true);

  const handleSave = () => {
    toast.success('Sistema salvagente configurato!', {
      description: 'Le email di recupero verranno inviate automaticamente.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-2">
        <LifeBuoy className="h-5 w-5 text-primary" />
        <h3 className="font-display text-lg font-bold text-foreground">Sistema Salvagente</h3>
        <Badge variant="secondary" className="rounded-full text-xs">Recupero appuntamenti</Badge>
      </div>

      {/* Stats */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-destructive/5 p-3 text-center">
          <p className="font-display text-2xl font-bold text-destructive">{stats.total}</p>
          <p className="text-xs text-muted-foreground">No-show totali</p>
        </div>
        <div className="rounded-xl bg-success/5 p-3 text-center">
          <p className="font-display text-2xl font-bold text-success">{stats.recovered}</p>
          <p className="text-xs text-muted-foreground">Recuperati</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Auto follow-up */}
        <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <Label className="cursor-pointer">Email di follow-up automatica</Label>
          </div>
          <Switch checked={autoFollowUp} onCheckedChange={setAutoFollowUp} />
        </div>

        {/* Priority rebooking */}
        <div className="flex items-center justify-between rounded-xl bg-secondary/50 p-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <Label className="cursor-pointer">Priorità nella riprenotazione</Label>
          </div>
          <Switch checked={priorityRebooking} onCheckedChange={setPriorityRebooking} />
        </div>

        {/* Discount incentive */}
        <div className="rounded-xl bg-secondary/50 p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <Label className="cursor-pointer">Offri sconto per recupero</Label>
            </div>
            <Switch checked={offerDiscount} onCheckedChange={setOfferDiscount} />
          </div>
          {offerDiscount && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <Input
                type="number"
                min="1"
                max="50"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="h-9 w-20 rounded-lg text-center"
              />
              <span className="text-sm text-muted-foreground">% di sconto sulla riprenotazione</span>
            </motion.div>
          )}
        </div>

        <Button onClick={handleSave} className="w-full rounded-xl gap-2">
          <Save className="h-4 w-4" /> Salva configurazione
        </Button>
      </div>
    </motion.div>
  );
};

export default NoShowRecovery;
