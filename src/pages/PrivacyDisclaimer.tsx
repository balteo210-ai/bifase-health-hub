import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { motion } from 'framer-motion';

const PrivacyDisclaimer = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-2 text-xs font-medium text-primary">
            MVP Capstone Project — Rome Business School
          </div>
          <h1 className="mb-6 font-display text-3xl font-extrabold md:text-4xl">
            Privacy & Demo Disclaimer
          </h1>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Bifase Health Hub</strong> è un MVP dimostrativo
              sviluppato come Capstone Project nell'ambito dell'Executive Master in Digital
              Marketing presso <strong className="text-foreground">Rome Business School</strong>.
            </p>
            <p>
              Il progetto è stato realizzato per finalità formative, accademiche e di presentazione
              professionale. Non rappresenta un servizio sanitario reale, non è una piattaforma
              medica certificata, non consente prenotazioni effettive, non fornisce consulenze
              mediche, diagnosi, trattamenti o indicazioni terapeutiche.
            </p>
            <p>
              Tutti i dati, i profili, i servizi, le città, le disponibilità, le recensioni e le
              informazioni presenti nella piattaforma sono fittizi o utilizzati esclusivamente a
              scopo dimostrativo.
            </p>
            <p>
              Gli utenti <strong className="text-foreground">non devono inserire dati personali,
              dati sanitari, informazioni sensibili, credenziali reali, numeri di telefono reali,
              indirizzi email personali</strong> o informazioni relative al proprio stato di salute.
            </p>
            <p>
              Eventuali form, login, registrazioni o flussi di prenotazione sono esclusivamente
              dimostrativi e non devono essere utilizzati per inviare dati reali.
            </p>
            <p>
              Questo MVP ha il solo scopo di mostrare un concept digitale relativo alla ricerca,
              confronto e prenotazione simulata di servizi sanitari, con focus su user experience,
              digital customer journey, marketplace design, digital marketing e sviluppo di
              soluzioni digitali.
            </p>
            <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="mb-2 font-display text-lg font-bold text-foreground">
                Cookie, tracking e analytics
              </h2>
              <p>
                Il prototipo non utilizza cookie di profilazione, strumenti di tracking pubblicitario
                o sistemi di analytics reali.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="mb-2 font-display text-lg font-bold text-foreground">
                Credenziali demo
              </h2>
              <p>
                Per esplorare l'area riservata puoi utilizzare le credenziali fittizie:<br />
                Email: <code className="text-foreground">demo@bifase.it</code><br />
                Password: <code className="text-foreground">demo123</code>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyDisclaimer;
