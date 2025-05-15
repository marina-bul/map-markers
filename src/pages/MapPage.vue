<template>
  <div class="map-page">
    <div class="map-section">
      <MapComponent />
    </div>
    <div class="list-section">
      <MarkerList />
    </div>
  </div>
</template>

<script setup lang="ts">
  import MapComponent from '@/components/MapComponent.vue';
  import MarkerList from '@/components/MarkerList.vue';
</script>

<style lang="scss" scoped>
  .map-page {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1rem;
    height: 100%;
    padding: 1rem;
    overflow: hidden;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: 2fr 1fr;
      padding: 0;
    }

    .map-section {
      background: var(--primary-bg);
      border-radius: 8px;
      overflow: hidden;
    }

    .list-section {
      background: var(--secondary-bg);
      border-radius: 8px;
      box-shadow: var(--card-shadow);
      overflow-y: auto;
    }
  }
</style>
