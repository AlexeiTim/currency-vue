import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueMaskDirective } from 'v-mask'

const app = createApp(App)

app.directive('mask', VueMaskDirective)
app.use(createPinia())
app.use(router)

app.mount('#app')
