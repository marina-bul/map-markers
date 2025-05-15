<template>
  <div class="about-page">
    <h2>{{ t('about-page.title') }}</h2>
    <p>
      {{ t('about-page.description-1') }}<strong>Vuejs, Vuex, VueRouter, Vuetify</strong>{{ t('about-page.description-2') }}
    </p>

    <h3>{{ t('about-page.about-section.title') }}</h3>
    <p>
      {{ t('about-page.about-section.description') }}
    </p>

    <h3>{{ t('about-page.map-section.title') }}</h3>
    <p>
      {{ t('about-page.map-section.description') }}
    </p>
    <ol>
      <li>
        {{ t('about-page.map-section.requirements.add-marker') }}
        <ul>
          <li>
            {{ t('about-page.map-section.requirements.geocoding-api') }}
            <a href="https://geocode.maps.co/" target="_blank">https://geocode.maps.co/</a>.
          </li>
          <li>
            {{ t('about-page.map-section.requirements.geocoding-error') }}
          </li>
        </ul>
      </li>
      <li>{{ t('about-page.map-section.requirements.marker-click') }}</li>
      <li>{{ t('about-page.map-section.requirements.list-click') }}</li>
      <li>{{ t('about-page.map-section.requirements.local-storage') }}</li>
      <li>{{ t('about-page.map-section.requirements.url-id') }}</li>
    </ol>
    <p>
      {{ t('about-page.backend-note') }}
    </p>

    <h4>{{ t('about-page.additional.title') }}</h4>
    <ol>
      <li>
        {{ t('about-page.additional.mobile') }}
      </li>
      <li>
        {{ t('about-page.additional.localization') }}
      </li>
      <li>
        {{ t('about-page.additional.testing') }}
      </li>
    </ol>

    <p class="accent-text">{{ t('about-page.note') }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>

<style lang="scss" scoped>
  .about-page {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    background: var(--secondary-bg);
    border-radius: 8px;
    color: var(--text-secondary);
    height: 100%;
    overflow-y: auto;

    @media (max-width: 480px) {
      padding: 1rem;
    }

    h2 {
      margin-bottom: 2rem;
      color: var(--accent-color);
    }

    h3 {
      margin: 2rem 0 1rem;
      color: var(--text-secondary);
    }

    p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .accent-text {
      font-weight: 600;
      color: var(--accent-color)
    }

    ol {
      padding-left: 1.5rem;
      margin-bottom: 1rem;

      li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
      }

      ul {
        margin-top: 0.5rem;
        padding-left: 1.5rem;
      }
    }

    a {
      color: var(--accent-color);
    }
  }
</style>
