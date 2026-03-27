import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import BifaseLogo from '@/components/BifaseLogo';
import { Search, MapPin, Star, Clock, Phone, ArrowRight, Navigation, Loader2 } from 'lucide-react';
import { useGeolocation, getDistanceKm, CITY_COORDS } from '@/hooks/use-geolocation';

interface Provider {
  id: string;
  name: string;
  type: string;
  category: string;
  location: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  phone: string;
  availableToday: boolean;
  nextSlot: string;
  services: string[];
  image: string;
}

const providers: Provider[] = [
  {
    id: '1', name: 'Dott.ssa Sara Martini', type: 'Medico di base', category: 'Medicina Generale',
    location: 'Milano', address: 'Via Montenapoleone 12, Milano', lat: 45.4685, lng: 9.1954,
    rating: 4.8, reviews: 124, phone: '+39 02 1234567', availableToday: true, nextSlot: '09:30',
    services: ['Visita Generale', 'Certificati Medici', 'Prescrizioni'], image: '👩‍⚕️',
  },
  {
    id: '2', name: 'Studio Dentistico Luce', type: 'Dentista', category: 'Odontoiatria',
    location: 'Roma', address: 'Via Cola di Rienzo 45, Roma', lat: 41.9100, lng: 12.4650,
    rating: 4.9, reviews: 89, phone: '+39 06 7654321', availableToday: true, nextSlot: '11:00',
    services: ['Pulizia Dentale', 'Otturazione', 'Sbiancamento', 'Ortodonzia'], image: '🦷',
  },
  {
    id: '3', name: 'Farmacia Centrale', type: 'Farmacia', category: 'Farmacia',
    location: 'Napoli', address: 'Piazza del Plebiscito 3, Napoli', lat: 40.8359, lng: 14.2488,
    rating: 4.6, reviews: 203, phone: '+39 081 9876543', availableToday: true, nextSlot: '08:00',
    services: ['Ritiro Farmaci', 'Vaccini', 'Test Rapidi', 'Consulenza'], image: '💊',
  },
  {
    id: '4', name: 'Fisio Plus', type: 'Fisioterapista', category: 'Fisioterapia',
    location: 'Torino', address: 'Corso Vittorio Emanuele II 78, Torino', lat: 45.0672, lng: 7.6836,
    rating: 4.7, reviews: 67, phone: '+39 011 2468135', availableToday: false, nextSlot: 'Domani 09:00',
    services: ['Riabilitazione', 'Massoterapia', 'Terapia Manuale'], image: '🏃',
  },
  {
    id: '5', name: 'Dott. Pietro Bianchi', type: 'Oculista', category: 'Oculistica',
    location: 'Firenze', address: 'Via dei Calzaiuoli 22, Firenze', lat: 43.7710, lng: 11.2535,
    rating: 4.9, reviews: 156, phone: '+39 055 1357924', availableToday: true, nextSlot: '14:00',
    services: ['Visita Oculistica', 'Fondo Oculare', 'Prescrizione Lenti'], image: '👁️',
  },
  {
    id: '6', name: 'Centro Analisi MedLab', type: 'Laboratorio Analisi', category: 'Analisi Cliniche',
    location: 'Bologna', address: 'Via Indipendenza 56, Bologna', lat: 44.4963, lng: 11.3437,
    rating: 4.5, reviews: 312, phone: '+39 051 8642097', availableToday: true, nextSlot: '07:30',
    services: ['Analisi del Sangue', 'Esami Urine', 'Tamponi', 'ECG'], image: '🔬',
  },
  {
    id: '7', name: 'Dott.ssa Elena Rossi', type: 'Dermatologa', category: 'Dermatologia',
    location: 'Milano', address: 'Corso Buenos Aires 34, Milano', lat: 45.4773, lng: 9.2078,
    rating: 4.8, reviews: 98, phone: '+39 02 9753186', availableToday: false, nextSlot: 'Domani 10:00',
    services: ['Visita Dermatologica', 'Mappatura Nei', 'Trattamenti Acne'], image: '🩺',
  },
  {
    id: '8', name: 'Farmacia San Marco', type: 'Farmacia', category: 'Farmacia',
    location: 'Venezia', address: 'Calle Larga XXII Marzo 18, Venezia', lat: 45.4336, lng: 12.3357,
    rating: 4.4, reviews: 87, phone: '+39 041 5283746', availableToday: true, nextSlot: '08:30',
    services: ['Ritiro Farmaci', 'Misurazione Pressione', 'Consulenza Nutrizionale'], image: '💊',
  },
  {
    id: '9', name: 'Dott. Marco Verdi', type: 'Cardiologo', category: 'Cardiologia',
    location: 'Roma', address: 'Via del Corso 112, Roma', lat: 41.9030, lng: 12.4802,
    rating: 4.9, reviews: 201, phone: '+39 06 3692581', availableToday: true, nextSlot: '15:30',
    services: ['Visita Cardiologica', 'Elettrocardiogramma', 'Holter Pressorio'], image: '❤️',
  },
  {
    id: '10', name: 'Centro Pediatrico Arcobaleno', type: 'Pediatra', category: 'Pediatria',
    location: 'Palermo', address: 'Via Libertà 90, Palermo', lat: 38.1249, lng: 13.3531,
    rating: 4.7, reviews: 145, phone: '+39 091 7418529', availableToday: true, nextSlot: '10:00',
    services: ['Visita Pediatrica', 'Vaccinazioni', 'Bilancio di Crescita'], image: '👶',
  },
];

const categories = ['Tutti', 'Medicina Generale', 'Odontoiatria', 'Farmacia', 'Fisioterapia', 'Oculistica', 'Analisi Cliniche', 'Dermatologia', 'Cardiologia', 'Pediatria'];

const ExplorePage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const location = useGeolocation();

  const providersWithDistance = useMemo(() => {
    if (!location.lat && !location.lng) return providers.map((p) => ({ ...p, distance: null as number | null }));
    return providers.map((p) => ({
      ...p,
      distance: getDistanceKm(location.lat, location.lng, p.lat, p.lng),
    }));
  }, [location.lat, location.lng]);

  const filtered = providersWithDistance
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.services.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategory === 'Tutti' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => (a.distance ?? 9999) - (b.distance ?? 9999));

  return (
    <div className="min-h-screen bg-secondary">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <BifaseLogo size="sm" />
          <div className="flex items-center gap-3">
            <Link to="/role-select">
              <Button size="sm">Accedi</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Trova il tuo professionista sanitario</h1>
          <p className="text-muted-foreground">Cerca tra farmacie, medici, dentisti e altri professionisti nella tua zona</p>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
            {location.loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Rilevamento posizione...</>
            ) : (
              <><Navigation className="h-4 w-4 text-primary" /> Posizione: <span className="font-medium text-foreground">{location.city || 'Italia'}</span> · Ordinati per distanza</>
            )}
          </div>
        </div>

        <div className="mx-auto mb-6 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-12 rounded-xl bg-card pl-12 text-base shadow-sm"
              placeholder="Cerca per nome, specialità, città o servizio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className="rounded-full"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((provider) => (
            <div
              key={provider.id}
              className="group rounded-2xl border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-2xl">
                    {provider.image}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{provider.name}</h3>
                    <p className="text-sm text-muted-foreground">{provider.type}</p>
                  </div>
                </div>
              </div>

              <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {provider.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  {provider.rating} ({provider.reviews})
                </span>
              </div>

              <div className="mb-3 flex items-center gap-1 text-sm">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">{provider.phone}</span>
              </div>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {provider.services.slice(0, 3).map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
                {provider.services.length > 3 && (
                  <Badge variant="secondary" className="text-xs">+{provider.services.length - 3}</Badge>
                )}
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock className="h-3.5 w-3.5" />
                  {provider.availableToday ? (
                    <span className="text-green-600 font-medium">Disponibile oggi · {provider.nextSlot}</span>
                  ) : (
                    <span className="text-muted-foreground">{provider.nextSlot}</span>
                  )}
                </div>
                <Link to="/role-select">
                  <Button size="sm" className="gap-1">
                    Prenota <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">Nessun professionista trovato per la tua ricerca.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSearch(''); setSelectedCategory('Tutti'); }}>
              Mostra tutti
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
