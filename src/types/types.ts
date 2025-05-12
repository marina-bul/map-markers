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
