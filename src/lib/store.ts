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
  status: 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  serviceType?: string;
  patientName?: string;
  patientPhone?: string;
}

export interface User {
  email: string;
  name: string;
  role: 'citizen' | 'provider';
  businessName?: string;
  serviceType?: string;
  subscribed?: boolean;
}

const COMMISSION_RATE = 0.05;

// Mock services data
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Controllo glicemia',
    providerName: 'Farmacia Salute Più',
    location: 'Milano',
    type: 'Screening & Test',
    price: 15,
    lat: 45.4625,
    lng: 9.1863,
    slots: [
      { id: 's1', time: '08:30', available: true },
      { id: 's2', time: '09:00', available: true },
      { id: 's3', time: '10:00', available: false },
      { id: 's4', time: '11:00', available: true },
      { id: 's5', time: '14:00', available: true },
    ],
  },
  {
    id: '2',
    name: 'Test urine',
    providerName: 'Centro Diagnostico Rapido',
    location: 'Roma',
    type: 'Diagnostica Rapida',
    price: 25,
    lat: 41.9005,
    lng: 12.4942,
    slots: [
      { id: 's6', time: '09:00', available: true },
      { id: 's7', time: '09:30', available: true },
      { id: 's8', time: '11:00', available: false },
      { id: 's9', time: '14:00', available: true },
    ],
  },
  {
    id: '3',
    name: 'Elettrocardiogramma (ECG)',
    providerName: 'CardioTelemedicina Italia',
    location: 'Torino',
    type: 'Telemedicina',
    price: 45,
    lat: 45.0735,
    lng: 7.6590,
    slots: [
      { id: 's10', time: '10:00', available: true },
      { id: 's11', time: '11:00', available: true },
      { id: 's12', time: '15:00', available: true },
    ],
  },
  {
    id: '4',
    name: 'Iniezione intramuscolare',
    providerName: 'Ambulatorio Infermieristico CuraSì',
    location: 'Napoli',
    type: 'Infermieristica',
    price: 10,
    lat: 40.8469,
    lng: 14.2530,
    slots: [
      { id: 's13', time: '08:00', available: true },
      { id: 's14', time: '09:00', available: true },
      { id: 's15', time: '10:00', available: true },
      { id: 's16', time: '14:00', available: false },
      { id: 's17', time: '15:00', available: true },
    ],
  },
  {
    id: '5',
    name: 'Consulenza nutrizionale',
    providerName: 'NutriVita Studio',
    location: 'Firenze',
    type: 'Nutrizione',
    price: 60,
    lat: 43.7710,
    lng: 11.2535,
    slots: [
      { id: 's18', time: '11:00', available: true },
      { id: 's19', time: '14:00', available: true },
      { id: 's20', time: '15:30', available: true },
      { id: 's21', time: '17:00', available: false },
    ],
  },
  {
    id: '6',
    name: 'Teleconsulto dermatologico',
    providerName: 'DermaOnline Italia',
    location: 'Online',
    type: 'Telemedicina',
    price: 35,
    lat: 45.4642,
    lng: 9.1900,
    slots: [
      { id: 's22', time: '09:00', available: true },
      { id: 's23', time: '10:30', available: true },
      { id: 's24', time: '14:00', available: true },
      { id: 's25', time: '16:00', available: true },
    ],
  },
  {
    id: '7',
    name: 'Consulto medico generico',
    providerName: 'Dott. Marco Benedetti',
    location: 'Online',
    type: 'Telemedicina',
    price: 40,
    lat: 41.9028,
    lng: 12.4964,
    slots: [
      { id: 's26', time: '08:30', available: true },
      { id: 's27', time: '11:00', available: true },
      { id: 's28', time: '15:00', available: false },
      { id: 's29', time: '17:30', available: true },
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
  completeAppointment: (appointmentId: string) => void;
  markNoShow: (appointmentId: string) => void;
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
      patientName: 'Marco Rossi',
      patientPhone: '+39 333 1234567',
    },
    {
      id: 'pa2',
      serviceId: 'p1',
      serviceName: 'Visita Generale',
      providerName: 'La Mia Clinica',
      location: 'Milano Centro',
      time: '09:00',
      date: '2026-03-25',
      price: 75,
      commission: 75 * COMMISSION_RATE,
      status: 'completed',
      patientName: 'Giulia Bianchi',
      patientPhone: '+39 338 7654321',
    },
    {
      id: 'pa3',
      serviceId: 'p1',
      serviceName: 'Visita Generale',
      providerName: 'La Mia Clinica',
      location: 'Milano Centro',
      time: '14:00',
      date: '2026-03-28',
      price: 75,
      commission: 75 * COMMISSION_RATE,
      status: 'confirmed',
      patientName: 'Luca Verdi',
      patientPhone: '+39 340 9876543',
    },
  ],

  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  subscribe: () => set((state) => ({
    user: state.user ? { ...state.user, subscribed: true } : null,
  })),

  bookAppointment: (serviceId, slotId, date) => {
    const { services, appointments, invoices, user } = get();
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

    const newInvoice = createInvoice(
      newAppointment,
      user?.name || 'Cliente',
      user?.email || 'cliente@email.com'
    );

    set({
      services: updatedServices,
      appointments: [...appointments, newAppointment],
      invoices: [...invoices, newInvoice],
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

  completeAppointment: (appointmentId) => {
    const { appointments, providerAppointments } = get();
    set({
      appointments: appointments.map((a) =>
        a.id === appointmentId ? { ...a, status: 'completed' as const } : a
      ),
      providerAppointments: providerAppointments.map((a) =>
        a.id === appointmentId ? { ...a, status: 'completed' as const } : a
      ),
    });
  },

  markNoShow: (appointmentId) => {
    const { appointments, providerAppointments } = get();
    set({
      appointments: appointments.map((a) =>
        a.id === appointmentId ? { ...a, status: 'no-show' as const } : a
      ),
      providerAppointments: providerAppointments.map((a) =>
        a.id === appointmentId ? { ...a, status: 'no-show' as const } : a
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
