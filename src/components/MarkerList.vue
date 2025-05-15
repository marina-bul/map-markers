<template>
  <div class="marker-list">
    <h3>{{ t('map-page.markers-title') }}</h3>
    <div v-if="markers.length === 0" class="empty-state">
      {{ t('empty-marker-list') }}
    </div>
    <v-list v-else class="list">
      <v-list-item
        v-for="marker in markers"
        :key="marker.id"
        class="marker"
        :class="{ 'selected': marker.id === selectedMarkerId }"
        @click="selectMarker(marker.id)"
      >
        <v-list-item-title class="marker-header">
          <h5 class="marker-title">{{ marker.name }}</h5>
          <v-btn icon size="small" variant="text" @click.stop="deleteMarker(marker.id)">
            <v-icon color="red">mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-list-item-title>
        <v-list-item-subtitle>{{ marker.address }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';


  const store = useStore();
  const router = useRouter();
  const { t } = useI18n()

  const markers = computed(() => store.getters['markers/markersList']);
  const selectedMarkerId = computed(() => {
    const selected = store.getters['markers/selectedMarker'];
    return selected ? selected.id : ''
  });

  const selectMarker = (markerId: string) => {
    store.dispatch('markers/selectMarker', markerId);
    router.push(`/map/${markerId}`);
  };

  const deleteMarker = async (markerId: string) => {
    await store.dispatch('markers/removeMarker', markerId);

    if (selectedMarkerId.value === markerId) {
      router.push('/map');
    }
  };

</script>

<style lang="scss" scoped>
.marker-list {
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: var(--card-shadow);

  h3 {
    margin: 0 0 1rem;
    color: var(--accent-color);

    @media (max-width: 360px) {
      margin: 0;
    }
  }

  .empty-state {
    color: var(--text-secondary);
    text-align: center;
    padding: 2rem;
  }

  .list {
    margin: 0;
    color: var(--text-secondary);
    background-color: transparent;
  }

  .marker {
    padding-bottom: 0.75rem;
  }

  .marker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .marker-title {
      font-size: 1rem;
    }
  }

  .selected {
    background-color: var(--hovered-bg);
  }
}
</style>
