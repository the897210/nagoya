export interface Transport {
  type: string;
  detail: string;
  cost: string;
  is_best: boolean;
}

export interface Spot {
  id: string;
  time: string;
  name: string;
  lat: number;
  lng: number;
  type: string;
  map_code?: string;
  phone?: string;
  desc: string;
  long_desc?: string;
  transports: Transport[];
  selectedTransportIdx: number;
  seat_info: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  spots: Spot[];
}

export interface TripData {
  trip_id: string;
  title: string;
  theme_color: string;
  itinerary: ItineraryDay[];
}

export interface TransportLink {
  name: string;
  url: string;
  iconName: 'Train' | 'Bus' | 'Ticket' | 'Car';
  color: string;
}

export interface NewSpotState {
  name: string;
  time: string;
  address: string;
  desc: string;
  type: string;
}