<template>
  <v-app class="app">
    <DesktopHeader v-if="mdAndUp" />
    <MobileHeader v-else />
    <main>
      <router-view />
    </main>
  </v-app>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useDisplay } from 'vuetify'

  import DesktopHeader from '@/components/DesktopHeader.vue';
  import { backendService } from '@/services/BackendService';

  const { mdAndUp } = useDisplay();

  onMounted(() => {
    backendService.loadMarkers()
  })

</script>

<style lang="scss">
  @use '@/styles/variables.css';

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    overflow: hidden;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .app {
    height: 100vh;
    display: flex;
    flex-direction: column;

    main {
      height: calc(100% - var(--header-height));
      flex: 1;
      padding: 1rem;

      background: var(--primary-bg);
      color: var(--text-primary);
    }
  }
</style>
