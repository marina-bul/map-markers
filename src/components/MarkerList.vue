<template>
  <div class="marker-list">
    <h3>Маркеры</h3>
    <div v-if="markers.length === 0" class="empty-state">
      Нет добавленных маркеров
    </div>
    <ul v-else>
      <li
        v-for="marker in markers"
        :key="marker.id"
        :class="{ active: selectedMarkerId === marker.id }"
        @click="selectMarker(marker)"
      >
        <div class="marker-info">
          <div class="marker-header">
            <h5>{{ marker.name }}</h5>
            <v-btn icon size="small" variant="text" @click.stop="deleteMarker(marker.id)">
              <v-icon color="red">mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>
          <p>{{ marker.address }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { backendService } from '@/services/BackendService';

  interface Marker {
    id: string;
    name: string;
    lat: number;
    lng: number;
    address: string;
  }

  const markers = ref<Marker[]>([]);
  const selectedMarkerId = ref<string | null>(null);
  const router = useRouter();

  const loadMarkers = async () => {
    markers.value = await backendService.getMarkers();
  };

  const selectMarker = (marker: Marker) => {
    selectedMarkerId.value = marker.id;
    router.push(`/map/${marker.id}`);
  };

  const deleteMarker = async (id: string) => {
    await backendService.deleteMarker(id);
    await loadMarkers();
    if (selectedMarkerId.value === id) {
      selectedMarkerId.value = null;
      router.push('/map');
    }
  };

  onMounted(loadMarkers);
</script>

<style lang="scss" scoped>
.marker-list {
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  padding: 1rem;
  height: 100%;
  overflow-y: auto;

  h3 {
    margin: 0 0 1rem;
    color: var(--text-primary);
  }

  .empty-state {
    color: var(--text-secondary);
    text-align: center;
    padding: 2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.75rem;
      border-bottom: 1px solid var(--border-color);
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background: var(--secondary-bg);
      }

      &.active {
        background: var(--accent-color);
        color: white;
      }

      .marker-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

      }

      .marker-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
