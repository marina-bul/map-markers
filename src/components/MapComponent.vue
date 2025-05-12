<template>
  <div class="map-container">
    <div ref="mapRef" class="map" />
    <div class="controls">
      <v-btn round @click="toggleAddMode">
        {{ isAddingMode ? "Отмена" : "Добавить маркер" }}
      </v-btn>
    </div>

    <v-dialog v-model="isDialogOpen" max-width="400">
      <v-card>
        <v-card-title>Введите название маркера</v-card-title>
        <v-card-text>
          <v-text-field v-model="newMarker.name" label="Название" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="isDialogOpen = false">Отмена</v-btn>
          <v-btn :disabled="!newMarker.name" @click="confirmAddMarker">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import L from 'leaflet';

  // import { backendService } from '@/services/BackendService';
  import { geocodingService } from '@/services/GeocodingService';
  import { useMap } from '@/composables/map';
  import { useStore } from 'vuex';

  import type { RouteParams } from '@/router';
  import type { Marker } from '@/types/types';

  import 'leaflet/dist/leaflet.css';

  const mapRef = ref<HTMLElement | null>(null);
  const isAddingMode = ref(false);
  const isDialogOpen = ref(false);
  const newMarker = ref({ name: '', lat: 0, lng: 0 });

  const route = useRoute();
  const router = useRouter();
  const { initMap, addMarker } = useMap(mapRef);
  const store = useStore();

  const markerData: Record<string, Marker> = {};
  let map = <L.Map | null>(null);

  const loadMarkers = async () => {
    await store.dispatch('markers/loadMarkers');
    const markers = store.getters['markers/markersList'];

    markers.forEach((marker: Marker) => {
      const popupContent = `<strong>${marker.name}</strong><p>${marker.address}</p>`;
      const addedMarker = addMarker([marker.lat, marker.lng], popupContent);

      if(addedMarker) {
        addedMarker.on('click', () => {
          store.dispatch('markers/selectMarker', marker.id);
          router.push(`/map/${marker.id}`);
        });
      }

      markerData[marker.id] = marker;
    });
  };

  const handleMapClick = (event: L.LeafletMouseEvent) => {
    if (!isAddingMode.value) return;

    isDialogOpen.value = true

    newMarker.value.lat = event.latlng.lat
    newMarker.value.lng = event.latlng.lng
  };

  const confirmAddMarker = async () => {
    try {
      const { lat, lng } = newMarker.value;
      const address = await geocodingService.getAddressFromCoordinates(lat, lng);

      const marker: Marker = {
        id: Date.now().toString(),
        name: newMarker.value.name,
        lat,
        lng,
        address,
      };

      await store.dispatch('markers/addMarker', marker);
      await loadMarkers();
      isAddingMode.value = false;
    } catch (error) {
      console.error('Error adding marker:', error);
      alert('Не удалось добавить маркер');
    }

    isDialogOpen.value = false
    isAddingMode.value = false
  }

  const toggleAddMode = () => {
    isAddingMode.value = !isAddingMode.value;
  };

  onMounted(() => {
    map = initMap();

    if(!map) return;

    map.on('click', handleMapClick);
    loadMarkers();
  });

  watch(() => (route.params as RouteParams).id, newId => {
    if (!newId || !map) return;

    if (markerData[newId]) {
      map.setView([markerData[newId].lat, markerData[newId].lng], 15);
    }
  });
</script>

<style lang="scss" scoped>
  .map-container {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 400px;

    .map {
      width: 100%;
      height: 100%;
    }

    .controls {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 1000;
    }
  }
</style>
