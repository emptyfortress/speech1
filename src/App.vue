<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import SvgIcon from '@/components/SvgIcon.vue'
import Drawer from '@/components/Drawer.vue'
import DateDrawer from '@/components/DateDrawer.vue'
import KeyDrawer from '@/components/KeyDrawer.vue'
import NotificationDrawer from '@/components/NotificationDrawer.vue'
import SpeechDrawer from '@/components/SpeechDrawer.vue'
import Login from '@/components/Login.vue'
import Help from '@/components/Help.vue'
import { router } from './router/router'
// import { is } from 'quasar'

const mystore = useStore()
const toggleLeftDrawer = mystore.toggleLeftDrawer

const isLogged = ref(true)
const isOper = ref(false)

const login = () => {
	isLogged.value = true
	router.push('/')
}
const login1 = () => {
	router.push('/operator')
	isLogged.value = true
	isOper.value = true
}

const isLoading = ref(false)
const refresh = () => {
	isLoading.value = true
	setTimeout(() => {
		isLoading.value = false
	}, 3000)
}
const logout = () => {
	isLogged.value = false
	router.push('/')
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
				template(v-if="!isOper")
					.refreshInfo
						q-btn.q-mr-sm(dense flat round @click="refresh")
							SvgIcon(name="refresh" :spin="isLoading" )
						q-card
							.grid
								div Дашборд:
								div 2 мин назад
								div Отчеты:
								div 2 мин назад
								div Чек-лист:
								div 6 мин назад
								div Категории:
								div 8 мин назад


					q-btn#library.q-mr-sm(dense flat round icon="mdi-book-open-page-variant-outline" @click="mystore.toggleKeyDrawer")
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
								q-item(clickable v-close-popup @click="logout" )
									q-item-section(avatar)
										q-icon(name="mdi-location-exit")
									q-item-section Выйти
					q-btn#help(dense flat round icon="mdi-help-circle-outline" @click="mystore.openHelp")

			q-linear-progress(indeterminate color="accent" size="3px" v-show="isLoading")

		Drawer(:show="mystore.leftDrawer" v-if="!isOper")
		DateDrawer(v-if="!isOper")
		KeyDrawer(v-if="!isOper")
		NotificationDrawer(v-if="!isOper")
		SpeechDrawer(v-if="!isOper")
		Help(v-if="!isOper")

		q-page-container
			router-view
template(v-else)
	Login(@login="login" @login1="login1")

</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.head {
	color: $text-bright;
	background: rgba(0, 0, 0, 0.07);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}

.q-linear-progress {
	position: fixed;
	top: 0;
	left: 0;
}

.hd {
	color: #777;
}

:deep(.v-onboarding-item__actions button.v-onboarding-btn-primary) {
	background: $primary;
}

:deep(.v-onboarding-item__header-close) {
	svg {
		width: 10px;
		height: 10px;
	}
}

.refreshInfo {
	position: relative;

	.grid {
		display: grid;
		grid-template-columns: auto 1fr;
		row-gap: .2rem;
		column-gap: .5rem;

	}


	.q-card {
		position: absolute;
		top: 2rem;
		left: 50%;
		padding: .5rem 1rem;
		transform: translateX(-50%);
		font-size: .8rem;
		white-space: nowrap;

		display: none;
	}

	&:hover {
		.q-card {
			display: block;
		}
	}
}
</style>
