<template>
  <header class="app-header">
    <v-btn
      class="burger-btn"
      icon
      @click="isMenuOpen = !isMenuOpen"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <div class="app-logo">
      <v-icon size="26px">mdi-map-marker-radius-outline</v-icon>
      <h1>SquareGPS</h1>
    </div>
    <LangSwitcher />

    <v-navigation-drawer
      v-model="isMenuOpen"
      location="left"
      temporary
    >
      <v-list>
        <v-list-item>
          <router-link class="nav-link" to="/">{{ t('nav.about') }}</router-link>
        </v-list-item>
        <v-list-item>
          <router-link active-class="nav-link-active" class="nav-link" to="/map">
            {{ t('nav.map') }}
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import LangSwitcher from '@/components/LangSwitcher.vue';

  const { t } = useI18n();

  const isMenuOpen = ref(false)

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

      h1 {
        font-size: 1.5rem;
      }
    }

    .burger-btn {
      background-color: transparent;
      box-shadow: none;
    }

    nav {
      display: flex;
      gap: 1rem;
    }

    .nav-link {
      color: var(--text-secondary);
      text-decoration: none;
      padding: 0.5rem 0;
      font-weight: 600;

      &:hover {
        color: var(--accent-color);
      }

      &.router-link-active,
      &.nav-link-active {
        color: var(--accent-color);
      }
    }
}

</style>
