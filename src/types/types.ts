export interface Marker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
}

interface Address {
  city: string;
  country: string;
  road: string;
  house_number: string;
  suburb: string;
  leisure?: string;
}

export interface GeocodingResponse {
  display_name: string;
  lat: string;
  lon: string;
  address: Address
}

export interface AddressResponse extends GeocodingResponse {
  shortAddress: string
}

interface SuccessBackendResponce<T> {
  status: 200
  data: T
}

interface FailedBackendResponce {
  status: 500
  error: Error
}

export type BackendResponce<T> = SuccessBackendResponce<T> | FailedBackendResponce

export interface BackendService {
  loadMarkers: () => void;
  getMarkers: () => Promise<Marker[]>;
  saveMarker: (marker: Omit<Marker, 'id'>) => Promise<BackendResponce<{ id: string }>>;
  removeMarker (id: string): Promise<void>
}
