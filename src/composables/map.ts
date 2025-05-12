import type { Ref } from 'vue';
import L, { type LatLngTuple } from 'leaflet';

const DEFAULT_CENTER_COORDS: LatLngTuple = [44.7866, 20.4489];
const DEFAULT_ZOOM = 12

export function useMap (container: Ref<HTMLElement | null>) {
  let map = <L.Map | null>(null);

  const initMap = () => {
    if (!container.value) return null;

    map = L.map(container.value).setView( DEFAULT_CENTER_COORDS, DEFAULT_ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    return map;
  };

  const addMarker = (
    latLng: [number, number],
    popupContent?: string
  ) => {

    if (!map) {
      console.error('Карта не инициализирована. Вызовите initMap() перед добавлением маркеров.');
      return null;
    }

    const marker = L.marker(latLng).addTo(map);

    if (popupContent) {
      marker.bindPopup(popupContent);
    }

    return marker;
  };

  return {
    initMap,
    addMarker,
  };
}
