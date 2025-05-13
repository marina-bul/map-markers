<template>
  <div class="map-container">
    <div ref="mapRef" class="map" />
    <div class="controls">
      <v-btn class="main-btn" round @click="switchMapMode">
        {{ mode ==='edit' ? "Отмена" : "Добавить маркер" }}
      </v-btn>
    </div>

    <v-dialog v-model="isDialogOpen" max-width="400">
      <v-card>
        <v-card-title>Введите название маркера</v-card-title>
        <v-card-text>
          <v-text-field v-model="newMarkerName" label="Название" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="isDialogOpen = false">Отмена</v-btn>
          <v-btn :disabled="!newMarkerName" @click="createMarker">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  import { useMap } from '@/composables/map';
  import { useStore } from 'vuex';

  import type { Marker } from '@/types/types';

  import 'leaflet/dist/leaflet.css';

  const mapRef = ref<HTMLElement | null>(null);
  const newMarkerName = ref('');

  const router = useRouter();
  const {
    mode,
    newMarkerCoords,
    initMap,
    addMarker,
    switchMapMode,
    changeCenterCoords,
  } = useMap(mapRef);
  const store = useStore();

  const isDialogOpen = ref(false);
  const selectedMarker = computed(() => store.getters['markers/selectedMarker'])

  const addMarkerToMap = (marker: Marker) => {
    const popupContent = `<strong>${marker.name}</strong><p>${marker.address}</p>`;
    const handleMarkerClick = () => {
      store.dispatch('markers/selectMarker', marker.id);
      router.push(`/map/${marker.id}`);
    }

    addMarker([marker.lat, marker.lng], handleMarkerClick, popupContent);
  };

  const createMarker = async () => {
    isDialogOpen.value = false;

    const markerInfo = { name: newMarkerName, ...newMarkerCoords };
    const resp = await store.dispatch('markers/addMarker', markerInfo);

    if(resp) {
      addMarkerToMap(resp)
    } else {
      alert('Не удалось добавить маркер')
    }

    newMarkerName.value = ''
    switchMapMode()
  }

  onMounted(() => {
    const loadMarkers = async () => {
      await store.dispatch('markers/setMarkers');
      const storedMarkers: Marker[] = store.getters['markers/markersList']
      storedMarkers.forEach((marker: Marker) => addMarkerToMap(marker));
    };

    initMap();
    loadMarkers();
  });

  watch(
    () => selectedMarker.value,
    () => {
      if (selectedMarker.value) {
        changeCenterCoords(selectedMarker.value.lat, selectedMarker.value.lng);
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

    .main-btn {
      background-color: var(--accent-color);
    }
  }
</style>
