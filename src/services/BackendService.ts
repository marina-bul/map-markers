interface Marker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
}

class BackendService {
  private readonly STORAGE_KEY = 'gps-markers';

  async getMarkers (): Promise<Marker[]> {
    return new Promise(resolve => {
      const markers = localStorage.getItem(this.STORAGE_KEY);
      resolve(markers ? JSON.parse(markers) : []);
    });
  }

  async saveMarker (marker: Marker): Promise<void> {
    return new Promise(resolve => {
      const markers = this.getMarkers();
      markers.then(existingMarkers => {
        const updatedMarkers = [...existingMarkers, marker];
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedMarkers));
        resolve();
      });
    });
  }

  async deleteMarker (id: string): Promise<void> {
    return new Promise(resolve => {
      const markers = this.getMarkers();
      markers.then(existingMarkers => {
        const updatedMarkers = existingMarkers.filter(m => m.id !== id);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedMarkers));
        resolve();
      });
    });
  }
}

export const backendService = new BackendService();
