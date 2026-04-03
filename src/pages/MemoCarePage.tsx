import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';
import BifaseLogo from '@/components/BifaseLogo';
import {
  FileText, Upload, FolderOpen, Clock, Search, 
  Heart, Activity, Pill, Stethoscope, Eye,
  Download, Share2, Trash2, Plus, Shield,
  Calendar, User, ChevronRight, LogOut, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface HealthDocument {
  id: string;
  name: string;
  type: 'referto' | 'prescrizione' | 'certificato' | 'immagine' | 'altro';
  category: string;
  date: string;
  provider: string;
  size: string;
  notes?: string;
}

interface HealthEvent {
  id: string;
  type: 'appointment' | 'prescription' | 'test' | 'vaccine';
  title: string;
  provider: string;
  date: string;
  result?: string;
  icon: string;
}

const mockDocuments: HealthDocument[] = [
  { id: 'd1', name: 'Esami del sangue - Emocromo completo', type: 'referto', category: 'Analisi', date: '2026-03-15', provider: 'Centro Diagnostico Rapido', size: '245 KB' },
  { id: 'd2', name: 'Elettrocardiogramma (ECG)', type: 'referto', category: 'Cardiologia', date: '2026-02-28', provider: 'CardioTelemedicina Italia', size: '1.2 MB', notes: 'Risultato nella norma' },
  { id: 'd3', name: 'Prescrizione - Omeprazolo 20mg', type: 'prescrizione', category: 'Farmaci', date: '2026-02-10', provider: 'Dott. Marco Benedetti', size: '120 KB' },
  { id: 'd4', name: 'Certificato medico sportivo', type: 'certificato', category: 'Certificati', date: '2026-01-20', provider: 'Ambulatorio Sport & Salute', size: '340 KB' },
  { id: 'd5', name: 'RX Torace', type: 'immagine', category: 'Radiologia', date: '2025-12-05', provider: 'Ospedale San Raffaele', size: '4.5 MB', notes: 'Nessuna anomalia rilevata' },
  { id: 'd6', name: 'Test allergologico', type: 'referto', category: 'Allergologia', date: '2025-11-12', provider: 'Centro Allergologico Milano', size: '890 KB' },
  { id: 'd7', name: 'Piano alimentare personalizzato', type: 'altro', category: 'Nutrizione', date: '2026-03-01', provider: 'NutriVita Studio', size: '560 KB' },
];

const mockHistory: HealthEvent[] = [
  { id: 'h1', type: 'appointment', title: 'Visita cardiologica', provider: 'CardioTelemedicina Italia', date: '2026-03-20', result: 'Nella norma', icon: '❤️' },
  { id: 'h2', type: 'test', title: 'Controllo glicemia', provider: 'Farmacia Salute Più', date: '2026-03-15', result: '92 mg/dL - Normale', icon: '🧪' },
  { id: 'h3', type: 'prescription', title: 'Prescrizione Omeprazolo', provider: 'Dott. Marco Benedetti', date: '2026-02-10', icon: '💊' },
  { id: 'h4', type: 'vaccine', title: 'Vaccino antinfluenzale', provider: 'Farmacia Centrale Vaccini', date: '2026-01-15', icon: '💉' },
  { id: 'h5', type: 'appointment', title: 'Consulenza nutrizionale', provider: 'NutriVita Studio', date: '2026-01-08', result: 'Piano alimentare aggiornato', icon: '🥗' },
  { id: 'h6', type: 'test', title: 'Emocromo completo', provider: 'Centro Diagnostico Rapido', date: '2025-12-20', result: 'Valori nella norma', icon: '🔬' },
  { id: 'h7', type: 'appointment', title: 'RX Torace', provider: 'Ospedale San Raffaele', date: '2025-12-05', result: 'Nessuna anomalia', icon: '📷' },
  { id: 'h8', type: 'vaccine', title: 'Richiamo tetano', provider: 'ASL Milano', date: '2025-09-10', icon: '💉' },
];

const docTypeIcons: Record<string, typeof FileText> = {
  referto: FileText,
  prescrizione: Pill,
  certificato: Shield,
  immagine: Eye,
  altro: FolderOpen,
};

const docCategories = ['Tutti', 'Analisi', 'Cardiologia', 'Farmaci', 'Certificati', 'Radiologia', 'Allergologia', 'Nutrizione'];

const MemoCarePage = () => {
  const { user, logout } = useAppStore();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'documents' | 'history'>('documents');
  const [searchDoc, setSearchDoc] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [documents, setDocuments] = useState(mockDocuments);

  if (!user) { navigate('/role-select'); return null; }

  const filteredDocs = documents
    .filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(searchDoc.toLowerCase()) || d.provider.toLowerCase().includes(searchDoc.toLowerCase());
      const matchCat = selectedCategory === 'Tutti' || d.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleUpload = () => {
    const newDoc: HealthDocument = {
      id: `d-${Date.now()}`,
      name: 'Nuovo documento caricato',
      type: 'altro',
      category: 'Altro',
      date: new Date().toISOString().split('T')[0],
      provider: 'Caricato manualmente',
      size: '150 KB',
    };
    setDocuments((docs) => [newDoc, ...docs]);
    setUploadOpen(false);
    toast.success('Documento caricato con successo!', { description: 'Salvato nella tua cartella sanitaria' });
  };

  const handleDelete = (docId: string) => {
    setDocuments((docs) => docs.filter((d) => d.id !== docId));
    toast('Documento eliminato');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <BifaseLogo size="navbar" />
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
              <Heart className="h-4 w-4" /> MemoCare
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                <ArrowLeft className="h-4 w-4" /> Dashboard
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/'); }}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header section */}
        <motion.div className="mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-2xl font-bold text-foreground">La tua Cartella Sanitaria Digitale</h1>
          <p className="text-muted-foreground">Gestisci documenti, referti e il tuo storico sanitario in un unico posto sicuro.</p>
        </motion.div>

        {/* Stats cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Documenti', value: documents.length, icon: FileText, color: 'text-primary' },
            { label: 'Visite', value: mockHistory.filter((h) => h.type === 'appointment').length, icon: Stethoscope, color: 'text-emerald-500' },
            { label: 'Analisi', value: mockHistory.filter((h) => h.type === 'test').length, icon: Activity, color: 'text-amber-500' },
            { label: 'Vaccini', value: mockHistory.filter((h) => h.type === 'vaccine').length, icon: Shield, color: 'text-violet-500' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border/60 bg-card p-4">
              <div className="flex items-center gap-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tab switcher */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={activeSection === 'documents' ? 'default' : 'outline'}
            className="rounded-full gap-1"
            onClick={() => setActiveSection('documents')}
          >
            <FolderOpen className="h-4 w-4" /> Documenti
          </Button>
          <Button
            variant={activeSection === 'history' ? 'default' : 'outline'}
            className="rounded-full gap-1"
            onClick={() => setActiveSection('history')}
          >
            <Clock className="h-4 w-4" /> Storico Sanitario
          </Button>
        </div>

        {/* Documents section */}
        {activeSection === 'documents' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-10 rounded-xl pl-10"
                  placeholder="Cerca documenti..."
                  value={searchDoc}
                  onChange={(e) => setSearchDoc(e.target.value)}
                />
              </div>
              <Button className="gap-1 rounded-full" onClick={() => setUploadOpen(true)}>
                <Upload className="h-4 w-4" /> Carica documento
              </Button>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {docCategories.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  className="rounded-full text-xs"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredDocs.map((doc, i) => {
                const Icon = docTypeIcons[doc.type] || FileText;
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-semibold text-foreground">{doc.name}</h4>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{doc.provider}</span>
                        <span>·</span>
                        <span>{new Date(doc.date).toLocaleDateString('it-IT')}</span>
                        <span>·</span>
                        <span>{doc.size}</span>
                      </div>
                      {doc.notes && (
                        <p className="mt-1 text-xs text-muted-foreground italic">📝 {doc.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Badge variant="secondary" className="text-xs">{doc.type}</Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast('Download simulato')}>
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast('Condivisione simulata')}>
                        <Share2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(doc.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredDocs.length === 0 && (
              <div className="py-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground/30" />
                <p className="mt-3 text-muted-foreground">Nessun documento trovato</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Health history / storico sanitario */}
        {activeSection === 'history' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="relative ml-6 border-l-2 border-border/60 space-y-0">
              {mockHistory.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative pb-8 pl-8"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-card text-sm shadow-sm">
                    {event.icon}
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{event.title}</h4>
                        <p className="mt-0.5 text-xs text-muted-foreground">{event.provider}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                    {event.result && (
                      <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
                        <Activity className="h-3 w-3" />
                        {event.result}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Upload dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" /> Carica documento
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-secondary/30 p-8">
              <FolderOpen className="mb-3 h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">Trascina un file qui o clicca per selezionare</p>
              <p className="mt-1 text-xs text-muted-foreground/60">PDF, JPG, PNG fino a 10MB</p>
            </div>
            <Button className="w-full rounded-xl" onClick={handleUpload}>
              <Plus className="mr-1 h-4 w-4" /> Carica (demo)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemoCarePage;
