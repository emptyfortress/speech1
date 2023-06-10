<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from '@/stores/store'
import SvgIcon from '@/components/SvgIcon.vue'
import Drawer from '@/components/Drawer.vue'
import DateDrawer from '@/components/DateDrawer.vue'
import KeyDrawer from '@/components/KeyDrawer.vue'
import NotificationDrawer from '@/components/NotificationDrawer.vue'
import SpeechDrawer from '@/components/SpeechDrawer.vue'
import Login from '@/components/Login.vue'
import SiriWave from 'siriwave'
import { router } from './router/router'

const mystore = useStore()
const toggleLeftDrawer = mystore.toggleLeftDrawer

onMounted(() => {
	var siriWave1 = new SiriWave({
		container: document.getElementById('siri')!,
		// width: 200,
		// height: 50,
		style: 'ios',
		cover: true,
		color: '#E45BCE',
	})
})

const isLogged = ref(true)
const login = () => {
	isLogged.value = true
	router.push('/')
}

const isLoading = ref(false)
const refresh = () => {
	isLoading.value = true
	setTimeout(() => {
		isLoading.value = false
	}, 3000)
}
</script>

<template lang="pug">
template(v-if="isLogged")
	q-layout(view="hHh LpR fFf")
		q-header.head
			q-toolbar(shrink)
				q-btn(dense flat round  @click="toggleLeftDrawer")
					SvgIcon(name="sound" color="#1565c0")

				q-toolbar-title.gt-sm.cursor-pointer(@click="toggleLeftDrawer")
					span.hd Речевая платформа Speech Drive
				q-space
				q-btn.q-mr-sm(dense flat round @click="refresh")
					SvgIcon(name="refresh" :spin="isLoading" )
				q-btn.q-mr-sm(dense flat round icon="mdi-book-open-page-variant-outline" @click="mystore.toggleKeyDrawer")
				q-btn(dense flat round icon="mdi-bell-outline" @click="mystore.toggleNotificationDrawer")
					q-badge(floating rounded color="red") 3
				q-btn.q-mx-md(dense round unelevated)
					q-avatar(size="30px")
						img(src="@/assets/img/user1.svg")
					q-menu(transition-show="jump-down" transition-hide="jump-up")
						q-list
							q-item(clickable v-close-popup @click="$router.push('/profile')")
								q-item-section(avatar)
									q-icon(name="mdi-card-account-details-outline")
								q-item-section Профиль
							q-item(clickable v-close-popup @click="$router.push('/users')")
								q-item-section(avatar)
									q-icon(name="mdi-account-search")
								q-item-section Пользователи
							q-item(clickable v-close-popup @click="$router.push('/about')")
								q-item-section(avatar)
									q-icon(name="mdi-information-outline")
								q-item-section О программе
							q-item(clickable v-close-popup @click="isLogged = false")
								q-item-section(avatar)
									q-icon(name="mdi-location-exit")
								q-item-section Выйти

			q-linear-progress(indeterminate color="accent" size="3px" v-show="isLoading")

		Drawer(:show="mystore.leftDrawer")
		DateDrawer
		KeyDrawer
		NotificationDrawer
		SpeechDrawer

		q-page-container
			router-view
		transition(name="fade")
			#siri(v-show="isLoading")
template(v-else)
	Login(@login="login")

</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.head {
	color: $text-bright;
	// background: $bgMain;
	background: rgba(0, 0, 0, 0.07);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}

#siri {
	width: 800px;
	height: 400px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.q-linear-progress {
	position: fixed;
	top: 0;
	left: 0;
}

.hd {
	color: #777;
	// text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
	// font-weight: 600;
}
</style>
