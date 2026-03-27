// Mock data store for Bifase MVP
import { create } from 'zustand';

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Service {
  id: string;
  name: string;
  providerName: string;
  location: string;
  type: string;
  slots: TimeSlot[];
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  providerName: string;
  location: string;
  time: string;
  date: string;
  status: 'confirmed' | 'cancelled';
}

export interface User {
  email: string;
  name: string;
  role: 'citizen' | 'provider';
  businessName?: string;
  serviceType?: string;
}

// Mock services data
const mockServices: Service[] = [
  {
    id: '1',
    name: 'General Consultation',
    providerName: 'Dr. Sarah Martin',
    location: 'Paris 11e',
    type: 'General Medicine',
    slots: [
      { id: 's1', time: '09:00', available: true },
      { id: 's2', time: '09:30', available: false },
      { id: 's3', time: '10:00', available: true },
      { id: 's4', time: '10:30', available: true },
      { id: 's5', time: '14:00', available: true },
      { id: 's6', time: '14:30', available: false },
      { id: 's7', time: '15:00', available: true },
    ],
  },
  {
    id: '2',
    name: 'Dental Cleaning',
    providerName: 'Cabinet Dentaire Lumière',
    location: 'Lyon 3e',
    type: 'Dentistry',
    slots: [
      { id: 's8', time: '08:00', available: true },
      { id: 's9', time: '08:30', available: true },
      { id: 's10', time: '11:00', available: false },
      { id: 's11', time: '11:30', available: true },
      { id: 's12', time: '16:00', available: true },
    ],
  },
  {
    id: '3',
    name: 'Pharmacy Pickup',
    providerName: 'Pharmacie Centrale',
    location: 'Marseille 1er',
    type: 'Pharmacy',
    slots: [
      { id: 's13', time: '09:00', available: true },
      { id: 's14', time: '10:00', available: true },
      { id: 's15', time: '11:00', available: true },
      { id: 's16', time: '14:00', available: false },
      { id: 's17', time: '15:00', available: true },
    ],
  },
  {
    id: '4',
    name: 'Physiotherapy Session',
    providerName: 'Kiné Plus',
    location: 'Bordeaux Centre',
    type: 'Physiotherapy',
    slots: [
      { id: 's18', time: '08:00', available: false },
      { id: 's19', time: '09:00', available: true },
      { id: 's20', time: '10:00', available: true },
      { id: 's21', time: '15:00', available: true },
      { id: 's22', time: '16:00', available: true },
    ],
  },
  {
    id: '5',
    name: 'Eye Exam',
    providerName: 'Dr. Pierre Dupont',
    location: 'Toulouse Centre',
    type: 'Ophthalmology',
    slots: [
      { id: 's23', time: '09:30', available: true },
      { id: 's24', time: '10:30', available: true },
      { id: 's25', time: '14:00', available: true },
      { id: 's26', time: '15:30', available: false },
    ],
  },
];

interface AppState {
  user: User | null;
  services: Service[];
  appointments: Appointment[];
  providerServices: Service[];
  providerAppointments: Appointment[];
  login: (user: User) => void;
  logout: () => void;
  bookAppointment: (serviceId: string, slotId: string) => void;
  cancelAppointment: (appointmentId: string) => void;
  addProviderService: (service: Omit<Service, 'id'>) => void;
  removeProviderService: (serviceId: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  services: mockServices,
  appointments: [],
  providerServices: [
    {
      id: 'p1',
      name: 'General Consultation',
      providerName: 'My Clinic',
      location: 'Paris 11e',
      type: 'General Medicine',
      slots: [
        { id: 'ps1', time: '09:00', available: true },
        { id: 'ps2', time: '10:00', available: true },
        { id: 'ps3', time: '11:00', available: false },
        { id: 'ps4', time: '14:00', available: true },
        { id: 'ps5', time: '15:00', available: true },
      ],
    },
  ],
  providerAppointments: [
    {
      id: 'pa1',
      serviceId: 'p1',
      serviceName: 'General Consultation',
      providerName: 'My Clinic',
      location: 'Paris 11e',
      time: '11:00',
      date: 'Today',
      status: 'confirmed',
    },
  ],

  login: (user) => set({ user }),
  logout: () => set({ user: null }),

  bookAppointment: (serviceId, slotId) => {
    const { services, appointments } = get();
    const service = services.find((s) => s.id === serviceId);
    const slot = service?.slots.find((s) => s.id === slotId);
    if (!service || !slot) return;

    // Mark slot as unavailable
    const updatedServices = services.map((s) =>
      s.id === serviceId
        ? {
            ...s,
            slots: s.slots.map((sl) =>
              sl.id === slotId ? { ...sl, available: false } : sl
            ),
          }
        : s
    );

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      serviceId,
      serviceName: service.name,
      providerName: service.providerName,
      location: service.location,
      time: slot.time,
      date: 'Today',
      status: 'confirmed',
    };

    set({
      services: updatedServices,
      appointments: [...appointments, newAppointment],
    });
  },

  cancelAppointment: (appointmentId) => {
    const { appointments, services, providerAppointments } = get();
    const appointment = appointments.find((a) => a.id === appointmentId) || 
                        providerAppointments.find((a) => a.id === appointmentId);
    if (!appointment) return;

    // Smart Slot Recovery: mark the slot as available again
    const updatedServices = services.map((s) =>
      s.id === appointment.serviceId
        ? {
            ...s,
            slots: s.slots.map((sl) =>
              sl.time === appointment.time ? { ...sl, available: true } : sl
            ),
          }
        : s
    );

    set({
      services: updatedServices,
      appointments: appointments.map((a) =>
        a.id === appointmentId ? { ...a, status: 'cancelled' as const } : a
      ),
      providerAppointments: providerAppointments.map((a) =>
        a.id === appointmentId ? { ...a, status: 'cancelled' as const } : a
      ),
    });
  },

  addProviderService: (service) => {
    const id = `ps-${Date.now()}`;
    set((state) => ({
      providerServices: [...state.providerServices, { ...service, id }],
    }));
  },

  removeProviderService: (serviceId) => {
    set((state) => ({
      providerServices: state.providerServices.filter((s) => s.id !== serviceId),
    }));
  },
}));
