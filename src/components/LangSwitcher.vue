<template>
  <v-menu offset-y>
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        aria-label="Switch Language"
        class="btn-icon"
        icon
        variant="text"
      >
        <v-icon>mdi-web</v-icon>
      </v-btn>
    </template>

    <v-list class="lang-list">
      <v-list-item
        v-for="(label, code) in languages"
        :key="code"
        @click="switchLanguage(code)"
      >
        <v-list-item-title>
          {{ label }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { loadLocaleMessages } from '@/plugins/i18n'

  const { locale } = useI18n()

  const languages: Record<string, string> = {
    ru: 'Русский',
    en: 'English',
  }

  const switchLanguage = async (lang: string) => {
    if (locale.value === lang) return
    await loadLocaleMessages(lang)
    locale.value = lang
  }
</script>

<style lang="scss" scoped>
.btn-icon {
  height: auto;
}

.lang-list {
  width: 150px;
}
</style>
