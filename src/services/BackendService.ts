import type { BackendResponce, BackendService, Marker } from '@/types/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const DEFAULT_DELAY = 1000;

class LSBackendService implements BackendService {
  private readonly STORAGE_KEY = 'gps-markers';

  markers: Marker[];

  constructor () {
    this.markers = []
  }

  loadMarkers () {
    try {
      const loadedMarkers = localStorage.getItem(this.STORAGE_KEY);
      this.markers = loadedMarkers ? JSON.parse(loadedMarkers) : [];
    } catch (error) {
      console.error('Error loading markers:', error);
    }
  }

  async getMarkers (): Promise<Marker[]> {
    await delay(DEFAULT_DELAY);

    return this.markers;
  }

  async saveMarker (marker: Omit<Marker, 'id'>): Promise<BackendResponce<{ id: string }>> {
    const markerId = crypto.randomUUID();

    this.markers.push({ id: markerId, ...marker });

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.markers));
      await delay(DEFAULT_DELAY);

      return { status: 200, data: { id: markerId } }
    } catch(error) {
      await delay(DEFAULT_DELAY);
      throw { status: 500, error };
    }
  }

  async removeMarker (id: string): Promise<void> {
    return new Promise(resolve => {
      this.markers = this.markers.filter(m => m.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.markers));
      setTimeout(() => {resolve()}, 1000);
    });
  }
}

export const backendService = new LSBackendService();
