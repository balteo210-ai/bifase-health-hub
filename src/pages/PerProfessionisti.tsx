import { Link } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2, ArrowRight, ShieldCheck, Euro, Calendar, TrendingUp, Users,
  Stethoscope, Apple, Pill, HeartPulse, Eye, Brain, Clock, BarChart3, Zap,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SUBSCRIPTION_PRICE, COMMISSION_RATE } from '@/lib/store';

const categories = [
  { icon: Stethoscope, name: 'Infermieri', desc: 'Gestisci visite domiciliari e ambulatoriali con un calendario digitale' },
  { icon: Apple, name: 'Nutrizionisti', desc: 'Organizza consulenze, follow-up e piani alimentari senza perdere pazienti' },
  { icon: Pill, name: 'Farmacie', desc: 'Offri servizi su prenotazione: tamponi, vaccini, consulenze farmaceutiche' },
  { icon: HeartPulse, name: 'Fisioterapisti', desc: 'Riduci le assenze e riempi gli slot con il recupero intelligente' },
  { icon: Eye, name: 'Oculisti', desc: 'Più visibilità nella tua zona, più pazienti nel tuo studio' },
  { icon: Brain, name: 'Psicologi', desc: 'Gestisci le sedute, i promemoria automatici e la lista d\'attesa' },
];

const benefits = [
  { icon: Calendar, title: 'Agenda digitale completa', desc: 'Gestisci tutti i tuoi appuntamenti da un\'unica dashboard intuitiva' },
  { icon: Zap, title: 'Recupero slot intelligente', desc: 'Gli slot cancellati vengono automaticamente proposti ad altri pazienti in lista d\'attesa' },
  { icon: Users, title: 'Nuovi pazienti dalla tua zona', desc: 'Il tuo profilo è visibile a tutti i cittadini che cercano servizi sanitari vicino a loro' },
  { icon: TrendingUp, title: 'Fino al 40% meno no-show', desc: 'Promemoria automatici via SMS e notifiche riducono drasticamente le assenze' },
  { icon: BarChart3, title: 'Analytics e statistiche', desc: 'Monitora il tuo tasso di occupazione, i ricavi e le performance nel tempo' },
  { icon: ShieldCheck, title: 'BiPremia — Fedeltà pazienti', desc: 'I tuoi pazienti accumulano punti ad ogni visita, incentivando il ritorno' },
];

const faqs = [
  { q: 'Quanto costa l\'abbonamento?', a: `L'abbonamento annuale costa €${SUBSCRIPTION_PRICE}. È l'unico costo fisso. In più, si applica una commissione del ${COMMISSION_RATE * 100}% su ogni prestazione erogata tramite la piattaforma.` },
  { q: 'Come funziona la commissione del 2%?', a: 'La commissione viene dedotta automaticamente dal tuo incasso per ogni prestazione completata. Il paziente non paga nulla in più — è interamente a carico del professionista.' },
  { q: 'Posso cancellare l\'abbonamento?', a: 'Sì, puoi cancellare in qualsiasi momento. L\'accesso resta attivo fino alla fine del periodo già pagato.' },
  { q: 'Che tipi di professionisti possono iscriversi?', a: 'Tutti i professionisti sanitari: infermieri, nutrizionisti, farmacie, fisioterapisti, oculisti, psicologi, dentisti e molti altri.' },
  { q: 'Come ricevo i pagamenti?', a: 'I pagamenti vengono elaborati attraverso la piattaforma e accreditati direttamente sul tuo conto, al netto della commissione Bifase.' },
  { q: 'Il recupero degli slot è automatico?', a: 'Sì. Quando un paziente cancella, lo slot viene immediatamente proposto ai pazienti in lista d\'attesa nella tua zona, massimizzando l\'occupazione.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const PerProfessionisti = () => {
  // ROI example calculation
  const avgPrice = 60;
  const monthlyAppointments = 80;
  const monthlyRevenue = avgPrice * monthlyAppointments;
  const yearlyRevenue = monthlyRevenue * 12;
  const yearlyCommission = yearlyRevenue * COMMISSION_RATE;
  const netGain = yearlyRevenue - yearlyCommission - SUBSCRIPTION_PRICE;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-primary/[0.06] blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Per professionisti sanitari
            </Badge>
            <h1 className="mx-auto max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
              Più pazienti, meno assenze,{' '}
              <span className="text-primary">zero stress</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Bifase è la piattaforma che semplifica la gestione degli appuntamenti sanitari.
              Unisciti a centinaia di professionisti che stanno già risparmiando tempo e guadagnando di più.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/role-select">
                <Button size="lg" className="h-14 gap-2 rounded-full px-10 text-base shadow-lg shadow-primary/25">
                  Inizia ora — €{SUBSCRIPTION_PRICE}/anno
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#pricing">
                <Button variant="outline" size="lg" className="h-14 rounded-full px-10 text-base">
                  Vedi i dettagli
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category-specific benefits */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Pensato per ogni professionista
            </h2>
            <p className="mt-4 text-muted-foreground">
              Qualunque sia la tua specializzazione, Bifase si adatta alle tue esigenze.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl border border-border/60 bg-card p-6 card-elevated transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
                  <cat.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">{cat.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-secondary/30 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Tutto ciò che ti serve per crescere
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex gap-4 rounded-2xl border border-border/60 bg-card p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & ROI */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-14">
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Un investimento che si ripaga da solo
              </h2>
              <p className="mt-4 text-muted-foreground">Prezzi trasparenti, nessun costo nascosto.</p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="grid gap-8 lg:grid-cols-2">
              {/* Pricing Card */}
              <div className="rounded-3xl border-2 border-primary/20 bg-card p-8 shadow-xl" style={{ boxShadow: 'var(--shadow-elevated)' }}>
                <Badge className="mb-4 rounded-full">Piano Professionale</Badge>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-6xl font-extrabold text-foreground">€{SUBSCRIPTION_PRICE}</span>
                  <span className="text-lg text-muted-foreground">/anno</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  + {COMMISSION_RATE * 100}% di commissione su ogni prestazione
                </p>

                <div className="my-8 h-px bg-border" />

                <ul className="space-y-3">
                  {[
                    'Agenda digitale illimitata',
                    'Recupero slot automatico',
                    'Profilo visibile ai cittadini',
                    'Promemoria automatici',
                    'Dashboard analytics',
                    'Programma fedeltà BiPremia',
                    'Supporto dedicato',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link to="/role-select" className="mt-8 block">
                  <Button className="h-12 w-full rounded-xl text-base shadow-lg shadow-primary/20">
                    Abbonati ora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  Cancella quando vuoi · Pagamento sicuro
                </div>
              </div>

              {/* ROI Calculator */}
              <div className="rounded-3xl border border-border/60 bg-secondary/50 p-8">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  <Euro className="inline h-5 w-5 text-primary mr-2" />
                  Calcola il tuo ritorno
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Esempio basato su {monthlyAppointments} appuntamenti/mese a €{avgPrice} medi:
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between rounded-xl bg-card p-4 border border-border/60">
                    <span className="text-sm text-muted-foreground">Ricavo annuo stimato</span>
                    <span className="font-display font-bold text-foreground">€{yearlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-card p-4 border border-border/60">
                    <span className="text-sm text-muted-foreground">Commissione Bifase ({COMMISSION_RATE * 100}%)</span>
                    <span className="font-display font-bold text-destructive">−€{yearlyCommission.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-card p-4 border border-border/60">
                    <span className="text-sm text-muted-foreground">Abbonamento annuale</span>
                    <span className="font-display font-bold text-destructive">−€{SUBSCRIPTION_PRICE}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between rounded-xl bg-primary/[0.06] p-4 border border-primary/20">
                    <span className="text-sm font-medium text-foreground">Guadagno netto annuo</span>
                    <span className="font-display text-xl font-extrabold text-success">€{netGain.toLocaleString()}</span>
                  </div>
                </div>

                <p className="mt-6 text-xs text-muted-foreground text-center">
                  Senza contare i pazienti extra ottenuti grazie alla visibilità su Bifase e al recupero degli slot.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/30 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Domande frequenti
            </h2>
          </motion.div>

          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-border/60 bg-card px-6 overflow-hidden">
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-navy py-20 text-navy-foreground md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-primary/[0.08] blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold md:text-4xl">
              Pronto a semplificare la tua attività?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg opacity-70">
              Unisciti a Bifase oggi e inizia a gestire i tuoi appuntamenti in modo intelligente.
            </p>
            <Link to="/role-select" className="mt-10 inline-block">
              <Button size="lg" className="h-14 gap-2 rounded-full px-12 text-base shadow-lg shadow-primary/25">
                Inizia ora
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PerProfessionisti;
