import { createI18n } from 'vue-i18n'

const loadedLanguages = new Set<string>();

export const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {},
});

export async function loadLocaleMessages (locale: string) {
  if (loadedLanguages.has(locale)) return

  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  loadedLanguages.add(locale);
}
