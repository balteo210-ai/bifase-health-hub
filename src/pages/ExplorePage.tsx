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
    id: '1', name: 'Farmacia Salute Più', type: 'Farmacia', category: 'Screening & Test',
    location: 'Milano', address: 'Via Torino 25, Milano', lat: 45.4625, lng: 9.1863,
    rating: 4.8, reviews: 214, phone: '+39 02 8374651', availableToday: true, nextSlot: '08:30',
    services: ['Controllo glicemia', 'Controllo colesterolo', 'Test emoglobina glicata (HbA1c)', 'Test pressione arteriosa', 'Screening cardiovascolare'], image: '🧪',
  },
  {
    id: '2', name: 'Centro Diagnostico Rapido', type: 'Laboratorio Analisi', category: 'Diagnostica Rapida',
    location: 'Roma', address: 'Via Nazionale 88, Roma', lat: 41.9005, lng: 12.4942,
    rating: 4.7, reviews: 178, phone: '+39 06 4521389', availableToday: true, nextSlot: '09:00',
    services: ['Test urine', 'Test gravidanza', 'Test vitamina D', 'Test PSA', 'Test infezioni respiratorie'], image: '🔬',
  },
  {
    id: '3', name: 'CardioTelemedicina Italia', type: 'Centro Telemedicina', category: 'Telemedicina',
    location: 'Torino', address: 'Corso Francia 12, Torino', lat: 45.0735, lng: 7.6590,
    rating: 4.9, reviews: 96, phone: '+39 011 5628743', availableToday: true, nextSlot: '10:00',
    services: ['Elettrocardiogramma (ECG)', 'Holter cardiaco', 'Holter pressorio', 'Spirometria', 'Teleconsulto medico'], image: '❤️',
  },
  {
    id: '4', name: 'Ambulatorio Infermieristico CuraSì', type: 'Servizio Infermieristico', category: 'Infermieristica',
    location: 'Napoli', address: 'Via Toledo 56, Napoli', lat: 40.8469, lng: 14.2530,
    rating: 4.6, reviews: 132, phone: '+39 081 7629431', availableToday: true, nextSlot: '08:00',
    services: ['Iniezione intramuscolare', 'Medicazione semplice', 'Medicazione avanzata', 'Rimozione punti', 'Monitoraggio parametri'], image: '💉',
  },
  {
    id: '5', name: 'Centro Cronicità MedCare', type: 'Centro Medico', category: 'Cronicità',
    location: 'Bologna', address: 'Via Indipendenza 34, Bologna', lat: 44.4963, lng: 11.3437,
    rating: 4.8, reviews: 87, phone: '+39 051 3928174', availableToday: false, nextSlot: 'Domani 09:00',
    services: ['Monitoraggio diabete', 'Monitoraggio ipertensione', 'Aderenza terapeutica', 'Follow-up pazienti cronici'], image: '🧠',
  },
  {
    id: '6', name: 'NutriVita Studio', type: 'Nutrizionista', category: 'Nutrizione',
    location: 'Firenze', address: 'Via dei Calzaiuoli 18, Firenze', lat: 43.7710, lng: 11.2535,
    rating: 4.7, reviews: 63, phone: '+39 055 2847193', availableToday: true, nextSlot: '11:00',
    services: ['Consulenza nutrizionale', 'Piano alimentare', 'Analisi corporea', 'Test intolleranze'], image: '🥗',
  },
  {
    id: '7', name: 'Farmacia Centrale Vaccini', type: 'Farmacia', category: 'Vaccini',
    location: 'Palermo', address: 'Via Libertà 72, Palermo', lat: 38.1249, lng: 13.3531,
    rating: 4.5, reviews: 198, phone: '+39 091 6183924', availableToday: true, nextSlot: '09:30',
    services: ['Vaccino antinfluenzale', 'Vaccino COVID', 'Vaccini adulti'], image: '💉',
  },
  {
    id: '8', name: 'Farmacia San Marco Screening', type: 'Farmacia', category: 'Screening & Test',
    location: 'Venezia', address: 'Calle Larga XXII Marzo 10, Venezia', lat: 45.4336, lng: 12.3357,
    rating: 4.6, reviews: 145, phone: '+39 041 5283746', availableToday: true, nextSlot: '08:00',
    services: ['Controllo glicemia', 'Test pressione arteriosa', 'Screening cardiovascolare', 'Test vitamina D'], image: '🧪',
  },
  {
    id: '9', name: 'Poliambulatorio Diagnostica Express', type: 'Poliambulatorio', category: 'Diagnostica Rapida',
    location: 'Milano', address: 'Corso Buenos Aires 48, Milano', lat: 45.4773, lng: 9.2078,
    rating: 4.9, reviews: 231, phone: '+39 02 9467382', availableToday: true, nextSlot: '07:30',
    services: ['Test urine', 'Test PSA', 'Test infezioni respiratorie', 'Elettrocardiogramma (ECG)'], image: '🔬',
  },
  {
    id: '10', name: 'Studio Nutrizione & Benessere', type: 'Nutrizionista', category: 'Nutrizione',
    location: 'Roma', address: 'Via del Corso 90, Roma', lat: 41.9030, lng: 12.4802,
    rating: 4.8, reviews: 74, phone: '+39 06 3851926', availableToday: false, nextSlot: 'Domani 10:00',
    services: ['Consulenza nutrizionale', 'Piano alimentare', 'Analisi corporea', 'Test intolleranze'], image: '🥗',
  },
];

const categories = ['Tutti', 'Screening & Test', 'Diagnostica Rapida', 'Telemedicina', 'Infermieristica', 'Cronicità', 'Nutrizione', 'Vaccini'];

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
                {provider.distance !== null && (
                  <Badge variant="outline" className="rounded-full text-xs gap-1">
                    <Navigation className="h-3 w-3" />
                    {provider.distance < 1 ? `${(provider.distance * 1000).toFixed(0)} m` : `${provider.distance.toFixed(1)} km`}
                  </Badge>
                )}
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
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
