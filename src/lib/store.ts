// Mock data store for Bifase MVP
import { create } from 'zustand';
import { Invoice, createInvoice } from './invoices';

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
  price: number;
  lat: number;
  lng: number;
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
  price: number;
  commission: number;
  status: 'confirmed' | 'cancelled';
}

export interface User {
  email: string;
  name: string;
  role: 'citizen' | 'provider';
  businessName?: string;
  serviceType?: string;
  subscribed?: boolean;
}

const COMMISSION_RATE = 0.02;

// Mock services data
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Visita Generale',
    providerName: 'Dott.ssa Sara Martini',
    location: 'Milano Centro',
    type: 'Medicina Generale',
    price: 80,
    lat: 45.4700,
    lng: 9.1900,
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
    name: 'Pulizia Dentale',
    providerName: 'Studio Dentistico Luce',
    location: 'Roma Prati',
    type: 'Odontoiatria',
    price: 120,
    lat: 41.9100,
    lng: 12.4650,
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
    name: 'Ritiro Farmacia',
    providerName: 'Farmacia Centrale',
    location: 'Napoli Centro',
    type: 'Farmacia',
    price: 5,
    lat: 40.8518,
    lng: 14.2681,
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
    name: 'Seduta di Fisioterapia',
    providerName: 'Fisio Plus',
    location: 'Torino Centro',
    type: 'Fisioterapia',
    price: 65,
    lat: 45.0703,
    lng: 7.6869,
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
    name: 'Visita Oculistica',
    providerName: 'Dott. Pietro Bianchi',
    location: 'Firenze Centro',
    type: 'Oculistica',
    price: 95,
    lat: 43.7696,
    lng: 11.2558,
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
  invoices: Invoice[];
  providerServices: Service[];
  providerAppointments: Appointment[];
  login: (user: User) => void;
  logout: () => void;
  subscribe: () => void;
  bookAppointment: (serviceId: string, slotId: string, date: string) => void;
  cancelAppointment: (appointmentId: string) => void;
  addProviderService: (service: Omit<Service, 'id'>) => void;
  removeProviderService: (serviceId: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  services: mockServices,
  appointments: [],
  invoices: [],
  providerServices: [
    {
      id: 'p1',
      name: 'Visita Generale',
      providerName: 'La Mia Clinica',
      location: 'Milano Centro',
      type: 'Medicina Generale',
      price: 75,
      lat: 45.4642,
      lng: 9.1900,
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
      serviceName: 'Visita Generale',
      providerName: 'La Mia Clinica',
      location: 'Milano Centro',
      time: '11:00',
      date: '2026-03-27',
      price: 75,
      commission: 75 * COMMISSION_RATE,
      status: 'confirmed',
    },
  ],

  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  subscribe: () => set((state) => ({
    user: state.user ? { ...state.user, subscribed: true } : null,
  })),

  bookAppointment: (serviceId, slotId, date) => {
    const { services, appointments } = get();
    const service = services.find((s) => s.id === serviceId);
    const slot = service?.slots.find((s) => s.id === slotId);
    if (!service || !slot) return;

    const updatedServices = services.map((s) =>
      s.id === serviceId
        ? { ...s, slots: s.slots.map((sl) => sl.id === slotId ? { ...sl, available: false } : sl) }
        : s
    );

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      serviceId,
      serviceName: service.name,
      providerName: service.providerName,
      location: service.location,
      time: slot.time,
      date,
      price: service.price,
      commission: service.price * COMMISSION_RATE,
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

    const updatedServices = services.map((s) =>
      s.id === appointment.serviceId
        ? { ...s, slots: s.slots.map((sl) => sl.time === appointment.time ? { ...sl, available: true } : sl) }
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

export const SUBSCRIPTION_PRICE = 359;
export { COMMISSION_RATE };
