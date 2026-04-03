import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellRing, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface WaitlistButtonProps {
  serviceName: string;
  providerName: string;
  serviceId: string;
}

const WaitlistButton = ({ serviceName, providerName, serviceId }: WaitlistButtonProps) => {
  const [inWaitlist, setInWaitlist] = useState(false);
  const [notified, setNotified] = useState(false);

  const handleJoinWaitlist = () => {
    setInWaitlist(true);
    toast.success('Sei in lista d\'attesa!', {
      description: `Ti notificheremo quando si libera uno slot per "${serviceName}"`,
      icon: '🔔',
    });

    // Simulate a slot opening after some time
    setTimeout(() => {
      setNotified(true);
      toast('Uno slot si è liberato! 🎉', {
        description: `${providerName} - ${serviceName}: nuovo slot disponibile`,
        action: {
          label: 'Prenota ora',
          onClick: () => {
            toast.success('Reindirizzamento alla prenotazione...');
          },
        },
        duration: 10000,
      });
    }, 8000);
  };

  const handleLeaveWaitlist = () => {
    setInWaitlist(false);
    setNotified(false);
    toast('Rimosso dalla lista d\'attesa');
  };

  if (notified) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-2"
      >
        <Badge className="gap-1 bg-success/10 text-success border-success/20 animate-pulse">
          <CheckCircle2 className="h-3 w-3" />
          Slot disponibile!
        </Badge>
      </motion.div>
    );
  }

  if (inWaitlist) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-2"
      >
        <Badge variant="outline" className="gap-1 border-amber-500/30 text-amber-600">
          <BellRing className="h-3 w-3 animate-pulse" />
          In lista d'attesa
        </Badge>
        <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground" onClick={handleLeaveWaitlist}>
          Rimuovi
        </Button>
      </motion.div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1 rounded-full border-amber-500/30 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
      onClick={handleJoinWaitlist}
    >
      <Bell className="h-3.5 w-3.5" />
      Lista d'attesa
    </Button>
  );
};

export default WaitlistButton;
