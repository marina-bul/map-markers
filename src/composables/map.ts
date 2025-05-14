import { ref, type Ref } from 'vue';
import L, { type LatLngTuple } from 'leaflet';
import type { Marker } from '@/types/types';

type MapMode = 'view' | 'edit';

const DEFAULT_CENTER_COORDS: LatLngTuple = [44.7866, 20.4489];
const DEFAULT_ZOOM = 12
const MAX_ZOOM = 15

export function useMap () {
  let map = <L.Map | null>(null);
  const mode: Ref<MapMode> = ref('view');
  const newMarkerCoords: Ref<Pick<Marker, 'lat' | 'lng'> | null> = ref(null);
  const renderedMarkers = new Map<string, L.Marker>();

  const changeCenterCoords = (lat: number, lng: number) => {
    if (!map) {
      console.error('Карта не инициализирована.');
      return
    }

    map.setView([lat, lng], MAX_ZOOM);
  }

  const initMap = (container: Ref<HTMLElement | null>, onMapClick?: () => void) => {
    if (!container.value) return null;

    map = L.map(container.value).setView( DEFAULT_CENTER_COORDS, DEFAULT_ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    map.on('click', (event: L.LeafletMouseEvent) => {
      if (mode.value === 'view') return;

      newMarkerCoords.value = { lat: event.latlng.lat, lng: event.latlng.lng };
      if(onMapClick) onMapClick()
    });
  };

  const switchMapMode = () => {
    mode.value = mode.value === 'view' ? 'edit' : 'view'
  };

  const addMarker = (
    markerInfo: Marker,
    onMarkerClick: () => void,
  ) => {
    if (!map) {
      console.error('Карта не инициализирована. Вызовите initMap() перед добавлением маркеров.');
      return
    }

    const marker = L.marker([markerInfo.lat, markerInfo.lng]).addTo(map);
    const popupContent = `<strong>${markerInfo.name}</strong><p>${markerInfo.address}</p>`;

    marker.bindPopup(popupContent);

    marker.on('click', () => {
      changeCenterCoords(markerInfo.lat, markerInfo.lng);
      onMarkerClick()
    });

    renderedMarkers.set(markerInfo.id, marker);
  };

  const removeMarker = (markerId: string) => {
    const marker = renderedMarkers.get(markerId);
    if (marker) {
      marker.remove();
      renderedMarkers.delete(markerId);
    }
  };

  return {
    mode,
    newMarkerCoords,
    initMap,
    addMarker,
    switchMapMode,
    changeCenterCoords,
    removeMarker,
  };
}
