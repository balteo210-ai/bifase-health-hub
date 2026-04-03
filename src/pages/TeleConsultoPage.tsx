import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BifaseLogo from '@/components/BifaseLogo';
import { 
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff, 
  Monitor, MessageSquare, Clock, User, Shield, 
  Maximize2, Volume2, Settings
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const TeleConsultoPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceName = searchParams.get('service') || 'Teleconsulto Medico';
  const providerName = searchParams.get('provider') || 'Dott. Marco Benedetti';

  const [callState, setCallState] = useState<'waiting' | 'connecting' | 'active' | 'ended'>('waiting');
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [msgInput, setMsgInput] = useState('');

  // Timer
  useEffect(() => {
    if (callState !== 'active') return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [callState]);

  // Auto-connect simulation
  const startCall = () => {
    setCallState('connecting');
    setTimeout(() => {
      setCallState('active');
      toast.success('Connessione stabilita!');
      // Simulate doctor messages
      setTimeout(() => {
        setMessages((m) => [...m, { from: 'doctor', text: 'Buongiorno! Sono il Dott. Benedetti. Come posso aiutarla oggi?' }]);
      }, 3000);
    }, 2500);
  };

  const endCall = () => {
    setCallState('ended');
    toast('Teleconsulto terminato', { icon: '📋', description: 'Il riepilogo è stato salvato nel tuo storico.' });
  };

  const sendMessage = () => {
    if (!msgInput.trim()) return;
    setMessages((m) => [...m, { from: 'user', text: msgInput }]);
    setMsgInput('');
    // Simulate doctor reply
    setTimeout(() => {
      const replies = [
        'Capisco, mi può descrivere meglio i sintomi?',
        'Le consiglio di effettuare un controllo più approfondito.',
        'Ha già assunto qualche farmaco per questo?',
        'Va bene, prendo nota di tutto.',
      ];
      setMessages((m) => [...m, { from: 'doctor', text: replies[Math.floor(Math.random() * replies.length)] }]);
    }, 2000);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex h-screen flex-col bg-[hsl(220,30%,8%)]">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-white/10 bg-[hsl(220,30%,6%)] px-4 py-2">
        <div className="flex items-center gap-3">
          <BifaseLogo size="sm" />
          <div className="h-5 w-px bg-white/20" />
          <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-xs gap-1">
            <Video className="h-3 w-3" /> Teleconsulto
          </Badge>
        </div>
        <div className="flex items-center gap-3 text-sm text-white/70">
          <Shield className="h-4 w-4 text-emerald-400" />
          <span>Connessione crittografata end-to-end</span>
          {callState === 'active' && (
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 gap-1">
              <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
              {formatTime(elapsed)}
            </Badge>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Video area */}
        <div className="flex flex-1 flex-col">
          {callState === 'waiting' && (
            <div className="flex flex-1 items-center justify-center">
              <motion.div 
                className="text-center space-y-6"
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary/20 ring-4 ring-primary/10">
                  <User className="h-14 w-14 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{providerName}</h2>
                  <p className="text-white/60">{serviceName}</p>
                </div>
                <p className="text-sm text-white/40">Quando sei pronto, avvia il teleconsulto</p>
                <Button 
                  size="lg" 
                  className="gap-2 rounded-full bg-emerald-600 px-8 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30"
                  onClick={startCall}
                >
                  <Phone className="h-5 w-5" /> Avvia teleconsulto
                </Button>
                <Button variant="ghost" className="text-white/40 hover:text-white/60" onClick={() => navigate(-1)}>
                  Torna indietro
                </Button>
              </motion.div>
            </div>
          )}

          {callState === 'connecting' && (
            <div className="flex flex-1 items-center justify-center">
              <motion.div 
                className="text-center space-y-6"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
              >
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary/20">
                  <motion.div 
                    className="h-28 w-28 rounded-full border-4 border-primary/40 border-t-primary"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Connessione in corso...</h2>
                  <p className="text-white/50">Attendere, il professionista sta per collegarsi</p>
                </div>
              </motion.div>
            </div>
          )}

          {(callState === 'active' || callState === 'ended') && (
            <div className="relative flex flex-1">
              {/* Doctor's video (fake) */}
              <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-[hsl(220,30%,12%)] to-[hsl(220,30%,8%)]">
                {callState === 'ended' ? (
                  <motion.div className="text-center space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                      <PhoneOff className="h-10 w-10 text-white/40" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Teleconsulto terminato</h2>
                    <p className="text-white/50">Durata: {formatTime(elapsed)}</p>
                    <div className="flex justify-center gap-3">
                      <Button className="rounded-full" onClick={() => navigate('/dashboard')}>
                        Torna alla dashboard
                      </Button>
                      <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10" onClick={() => navigate('/memocare')}>
                        Vedi MemoCare
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* Simulated doctor video with avatar */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 ring-2 ring-primary/20">
                        <User className="h-20 w-20 text-primary/70" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-white">{providerName}</p>
                        <p className="text-sm text-white/50">{serviceName}</p>
                      </div>
                    </div>

                    {/* Self video (small overlay) */}
                    <motion.div
                      className="absolute bottom-6 right-6 h-36 w-48 rounded-2xl border-2 border-white/20 bg-gradient-to-br from-[hsl(220,30%,18%)] to-[hsl(220,30%,14%)] shadow-2xl overflow-hidden"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      drag
                      dragConstraints={{ left: -400, right: 0, top: -300, bottom: 0 }}
                    >
                      {videoOn ? (
                        <div className="flex h-full w-full items-center justify-center">
                          <User className="h-12 w-12 text-white/30" />
                          <span className="absolute bottom-2 left-2 text-xs text-white/50">Tu</span>
                        </div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[hsl(220,30%,10%)]">
                          <VideoOff className="h-8 w-8 text-white/30" />
                          <span className="absolute bottom-2 left-2 text-xs text-white/50">Camera off</span>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </div>

              {/* Chat sidebar */}
              {chatOpen && callState === 'active' && (
                <motion.div 
                  className="flex w-80 flex-col border-l border-white/10 bg-[hsl(220,30%,6%)]"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 320, opacity: 1 }}
                >
                  <div className="border-b border-white/10 p-3">
                    <h3 className="text-sm font-semibold text-white">Chat</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                          msg.from === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-white/10 text-white/90'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 p-3">
                    <div className="flex gap-2">
                      <input 
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Scrivi un messaggio..."
                        value={msgInput}
                        onChange={(e) => setMsgInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      />
                      <Button size="sm" className="rounded-xl" onClick={sendMessage}>Invia</Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom controls */}
      {callState === 'active' && (
        <motion.div 
          className="flex items-center justify-center gap-4 border-t border-white/10 bg-[hsl(220,30%,6%)] py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 rounded-full ${micOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'}`}
            onClick={() => setMicOn(!micOn)}
          >
            {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 rounded-full ${videoOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'}`}
            onClick={() => setVideoOn(!videoOn)}
          >
            {videoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => toast('Condivisione schermo non disponibile nella demo')}
          >
            <Monitor className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`h-12 w-12 rounded-full ${chatOpen ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white hover:bg-white/20'}`}
            onClick={() => setChatOpen(!chatOpen)}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => toast('Impostazioni non disponibili nella demo')}
          >
            <Settings className="h-5 w-5" />
          </Button>

          <div className="mx-2 h-8 w-px bg-white/10" />

          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30"
            onClick={endCall}
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default TeleConsultoPage;
