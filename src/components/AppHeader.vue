<template>
  <header class="app-header">
    <div class="app-logo">
      <v-icon size="36px">mdi-map-marker-radius-outline</v-icon>
      <h1>SquareGPS</h1>
    </div>
    <nav>
      <router-link class="nav-link" to="/">О задании</router-link>
      <router-link class="nav-link" to="/map">Карта</router-link>
    </nav>
  </header>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  height: var(--header-height);
  color: var(--accent-color);
  background: var(--header-color);
  box-shadow: var(--card-shadow);

  nav {
    display: flex;
    gap: 1rem;
  }

  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
      background: var(--secondary-bg);
    }

    &.router-link-active {
      color: var(--accent-color);
    }
  }
}

.app-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

</style>
