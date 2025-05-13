import { ref, type Ref } from 'vue';
import L, { type LatLngTuple } from 'leaflet';
import type { Marker } from '@/types/types';

type MapMode = 'view' | 'edit';

const DEFAULT_CENTER_COORDS: LatLngTuple = [44.7866, 20.4489];
const DEFAULT_ZOOM = 12
const MAX_ZOOM = 15

export function useMap (container: Ref<HTMLElement | null>) {
  let map = <L.Map | null>(null);
  const mode: Ref<MapMode> = ref('view');
  const newMarkerCoords: Ref<Pick<Marker, 'lat' | 'lng'> | null> = ref(null);

  const changeCenterCoords = (lat: number, lng: number) => {
    if (!map) {
      console.error('Карта не инициализирована.');
      return
    }

    map.setView([lat, lng], MAX_ZOOM);
  }

  const addMarker = (
    latLng: [number, number],
    onMarkerClick: () => void,
    popupContent?: string,
  ) => {

    if (!map) {
      console.error('Карта не инициализирована. Вызовите initMap() перед добавлением маркеров.');
      return
    }

    const marker = L.marker(latLng).addTo(map);
    if (popupContent) marker.bindPopup(popupContent);

    marker.on('click', () => {
      const latlng = marker.getLatLng();
      changeCenterCoords(latlng.lat, latlng.lng);
      onMarkerClick()
    });
  };

  const handleMapClick = (event: L.LeafletMouseEvent) => {
    if (mode.value === 'view') return;

    newMarkerCoords.value = { lat: event.latlng.lat, lng: event.latlng.lng };
  };

  const initMap = () => {
    if (!container.value) return null;

    map = L.map(container.value).setView( DEFAULT_CENTER_COORDS, DEFAULT_ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    map.on('click', handleMapClick);
  };

  const switchMapMode = () => {
    mode.value = mode.value === 'view' ? 'edit' : 'view'
  };

  return {
    mode,
    newMarkerCoords,
    initMap,
    addMarker,
    switchMapMode,
    changeCenterCoords,
  };
}
