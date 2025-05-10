<template>
  <div class="app" :data-theme="theme">
    <AppHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import AppHeader from '@/components/AppHeader.vue';

  const theme = ref('dark');

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      theme.value = savedTheme;
    }
  });
</script>

<style lang="scss">
@use '@/styles/variables.scss';

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
  background: var(--primary-bg);
  color: var(--text-primary);
}

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    height: calc(100% - var(--header-height));
    flex: 1;
    padding: 1rem;
  }
}
</style>
