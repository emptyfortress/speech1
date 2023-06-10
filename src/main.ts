import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/mdi-v6/mdi-v6.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import '@/assets/styles/main.scss'
import { router } from '@/router/router'
import 'virtual:svg-icons-register'
import VueClickAway from 'vue3-click-away'
// import '@/quasar.config.ts'
import { createPinia } from 'pinia'
import { createRippleDirective } from 'vue-create-ripple'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
// app.use(Quasar)
app.use(Quasar, {
	plugins: {
		Notify,
	}, // import Quasar plugins and add here
	config: {
		notify: {
			position: 'bottom-right',
			timeout: 3000,
			icon: 'mdi-alert',
			color: 'primary',
			classes: 'notifications',
		},
	},
})
app.use(router)
app.use(VueClickAway)
app.use(pinia)
const opts = { class: 'my-ripple-class' }
app.directive('AppRipple', createRippleDirective(opts))

app.mount('#app')
