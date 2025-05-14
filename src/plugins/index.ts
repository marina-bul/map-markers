import { i18n, loadLocaleMessages } from './i18n'
import vuetify from './vuetify'
import router from '../router'
import store from '../store'

import type { App } from 'vue'

await loadLocaleMessages('ru')

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(i18n)
    .use(router)
    .use(store)
}
