interface GeocodingResponse {
  display_name: string;
  lat: string;
  lon: string;
}

class GeocodingService {
  private readonly API_URL = 'https://geocode.maps.co/reverse';
  private readonly API_KEY = '681dd603c3440121498002cuzf8d024';

  async getAddressFromCoordinates (lat: number, lng: number): Promise<string> {
    try {
      const response = await fetch(
        `${this.API_URL}?lat=${lat}&lon=${lng}&api_key=${this.API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }

      const data: GeocodingResponse = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Geocoding error:', error);
      throw new Error('Не удалось определить адрес');
    }
  }
}

export const geocodingService = new GeocodingService();
