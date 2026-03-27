import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import {
  LogOut, Plus, Trash2, Calendar, Users, Clock, X, CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

const ProviderDashboard = () => {
  const {
    user, providerServices, providerAppointments,
    addProviderService, removeProviderService, cancelAppointment, logout,
  } = useAppStore();
  const navigate = useNavigate();

  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!user) {
    navigate('/role-select');
    return null;
  }

  const confirmedAppointments = providerAppointments.filter((a) => a.status === 'confirmed');
  const totalSlots = providerServices.reduce((acc, s) => acc + s.slots.length, 0);
  const availableSlots = providerServices.reduce(
    (acc, s) => acc + s.slots.filter((sl) => sl.available).length, 0
  );

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    addProviderService({
      name: newName,
      providerName: user.name,
      location: newLocation,
      type: newType,
      slots: [
        { id: `ns-${Date.now()}-1`, time: '09:00', available: true },
        { id: `ns-${Date.now()}-2`, time: '10:00', available: true },
        { id: `ns-${Date.now()}-3`, time: '11:00', available: true },
        { id: `ns-${Date.now()}-4`, time: '14:00', available: true },
        { id: `ns-${Date.now()}-5`, time: '15:00', available: true },
      ],
    });
    setNewName('');
    setNewType('');
    setNewLocation('');
    setDialogOpen(false);
    toast.success('Service added successfully!');
  };

  const handleCancelAppointment = (id: string) => {
    cancelAppointment(id);
    toast('Appointment cancelled. Slot recovered.', {
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
            <Badge variant="outline">Provider</Badge>
            <span className="text-sm text-muted-foreground">{user.name}</span>
            <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/'); }}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Calendar, label: 'Upcoming', value: confirmedAppointments.length, color: 'text-primary' },
            { icon: Users, label: 'Total bookings', value: providerAppointments.length, color: 'text-success' },
            { icon: Clock, label: 'Available slots', value: `${availableSlots}/${totalSlots}`, color: 'text-accent-foreground' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Services */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">My Services</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" /> Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddService} className="space-y-4">
                    <div>
                      <Label>Service name</Label>
                      <Input value={newName} onChange={(e) => setNewName(e.target.value)} required placeholder="e.g. General Consultation" />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select value={newType} onValueChange={setNewType}>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Medicine">General Medicine</SelectItem>
                          <SelectItem value="Dentistry">Dentistry</SelectItem>
                          <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                          <SelectItem value="Physiotherapy">Physiotherapy</SelectItem>
                          <SelectItem value="Ophthalmology">Ophthalmology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} required placeholder="e.g. Paris 11e" />
                    </div>
                    <Button type="submit" className="w-full">Add Service</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {providerServices.map((service) => (
                <div key={service.id} className="rounded-xl border bg-card p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.location}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">{service.type}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => {
                        removeProviderService(service.id);
                        toast.success('Service removed');
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {service.slots.map((slot) => (
                      <span
                        key={slot.id}
                        className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                          slot.available
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-muted text-muted-foreground line-through'
                        }`}
                      >
                        {slot.time}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointments */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">Appointments</h2>
            {providerAppointments.length === 0 ? (
              <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
                <p className="text-muted-foreground">No appointments yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {providerAppointments.map((apt) => (
                  <div key={apt.id} className="rounded-xl border bg-card p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          {apt.status === 'confirmed' ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : (
                            <X className="h-4 w-4 text-destructive" />
                          )}
                          <span className="font-medium text-foreground">{apt.serviceName}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {apt.date} at {apt.time}
                        </p>
                        <Badge
                          variant={apt.status === 'confirmed' ? 'default' : 'destructive'}
                          className="mt-2 text-xs"
                        >
                          {apt.status}
                        </Badge>
                      </div>
                      {apt.status === 'confirmed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleCancelAppointment(apt.id)}
                        >
                          Cancel
                        </Button>
                      )}
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

export default ProviderDashboard;
