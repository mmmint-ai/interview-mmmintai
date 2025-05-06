import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import VuePictureSwipe from 'vue3-picture-swipe'

import App from './App.vue'
import router from './router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

dayjs.extend(relativeTime)

const app = createApp(App).use(vuetify).component('vue-picture-swipe', VuePictureSwipe)

app.use(createPinia())
app.use(router)

app.mount('#app')
