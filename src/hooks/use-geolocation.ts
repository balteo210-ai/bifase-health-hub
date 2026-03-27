import { useState, useEffect } from 'react';

export interface UserLocation {
  lat: number;
  lng: number;
  city?: string;
  loading: boolean;
  error: string | null;
}

// Haversine formula: distance in km between two lat/lng points
export function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Map of Italian city names to coordinates
export const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  'Milano': { lat: 45.4642, lng: 9.1900 },
  'Roma': { lat: 41.9028, lng: 12.4964 },
  'Napoli': { lat: 40.8518, lng: 14.2681 },
  'Torino': { lat: 45.0703, lng: 7.6869 },
  'Firenze': { lat: 43.7696, lng: 11.2558 },
  'Bologna': { lat: 44.4949, lng: 11.3426 },
  'Venezia': { lat: 45.4408, lng: 12.3155 },
  'Palermo': { lat: 38.1157, lng: 13.3615 },
};

export function getCityFromCoords(lat: number, lng: number): string {
  let closest = 'Italia';
  let minDist = Infinity;
  for (const [city, coords] of Object.entries(CITY_COORDS)) {
    const d = getDistanceKm(lat, lng, coords.lat, coords.lng);
    if (d < minDist) {
      minDist = d;
      closest = city;
    }
  }
  return closest;
}

export function useGeolocation(): UserLocation {
  const [location, setLocation] = useState<UserLocation>({
    lat: 0,
    lng: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({ ...prev, loading: false, error: 'Geolocalizzazione non supportata' }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const city = getCityFromCoords(pos.coords.latitude, pos.coords.longitude);
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          city,
          loading: false,
          error: null,
        });
      },
      (err) => {
        // Fallback to Milan center
        setLocation({
          lat: 45.4642,
          lng: 9.1900,
          city: 'Milano',
          loading: false,
          error: null,
        });
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
    );
  }, []);

  return location;
}
