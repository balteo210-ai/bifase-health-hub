import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { Search, MapPin, Clock, LogOut, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const CitizenDashboard = () => {
  const { user, services, appointments, bookAppointment, cancelAppointment, logout } = useAppStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  if (!user) {
    navigate('/role-select');
    return null;
  }

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.providerName.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
  );

  const activeAppointments = appointments.filter((a) => a.status === 'confirmed');

  const handleBook = (serviceId: string, slotId: string) => {
    bookAppointment(serviceId, slotId);
    setSelectedService(null);
    toast.success('Appointment booked successfully!');
  };

  const handleCancel = (appointmentId: string) => {
    cancelAppointment(appointmentId);
    toast('Appointment cancelled. Slot is now available for others.', {
      icon: '🔄',
      description: 'Smart Slot Recovery activated',
    });
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold text-primary">Bifase</Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { logout(); navigate('/'); }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-12 rounded-xl bg-card pl-12 text-base shadow-sm"
              placeholder="Search services, providers, or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Services List */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-foreground">Available Services</h2>
            <div className="space-y-4">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.providerName}</p>
                      <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {service.location}
                        </span>
                        <Badge variant="secondary" className="text-xs">{service.type}</Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={selectedService === service.id ? 'outline' : 'default'}
                      onClick={() =>
                        setSelectedService(selectedService === service.id ? null : service.id)
                      }
                    >
                      {selectedService === service.id ? 'Close' : 'Book'}
                    </Button>
                  </div>

                  {selectedService === service.id && (
                    <div className="border-t pt-4">
                      <p className="mb-3 text-sm font-medium text-foreground">Available time slots:</p>
                      <div className="flex flex-wrap gap-2">
                        {service.slots.map((slot) => (
                          <Button
                            key={slot.id}
                            size="sm"
                            variant={slot.available ? 'outline' : 'ghost'}
                            disabled={!slot.available}
                            className={slot.available ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground' : 'opacity-40'}
                            onClick={() => handleBook(service.id, slot.id)}
                          >
                            <Clock className="mr-1 h-3 w-3" />
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* My Appointments */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">My Appointments</h2>
            {activeAppointments.length === 0 ? (
              <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
                <p className="text-muted-foreground">No upcoming appointments</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="rounded-xl border bg-card p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <span className="font-medium text-foreground">{apt.serviceName}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{apt.providerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {apt.date} at {apt.time}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleCancel(apt.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
