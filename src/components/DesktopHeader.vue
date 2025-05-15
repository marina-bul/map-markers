<template>
  <header class="app-header">
    <div class="app-logo">
      <v-icon size="36px">mdi-map-marker-radius-outline</v-icon>
      <h1>SquareGPS</h1>
    </div>
    <nav>
      <router-link class="nav-link" to="/">{{ t('nav.about') }}</router-link>
      <router-link active-class="nav-link-active" class="nav-link" to="/map">
        {{ t('nav.map') }}
      </router-link>
      <LangSwitcher />
    </nav>
  </header>
</template>

<script setup lang="ts">
  import LangSwitcher from '@/components/LangSwitcher.vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n()

</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: var(--header-height);
  color: var(--accent-color);
  background: var(--secondary-bg);
  box-shadow: var(--card-shadow);

  .app-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  nav {
    display: flex;
    gap: 1rem;
  }

  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    padding: 0.5rem 0;
    border-bottom: 2px solid transparent;
    transition: border-color 0.3s;

    &:hover {
      border-color: var(--accent-color);
    }

    &.router-link-active,
    &.nav-link-active {
      color: var(--accent-color);
      border-color: var(--accent-color);
    }
  }
}

</style>
