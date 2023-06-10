<template lang="pug">
q-drawer(v-model="props.show" side="left" :mini="mystore.mini" :width="200")
	q-list.q-mt-lg
		q-item(clickable v-app-ripple v-for="page in pages" :to="page.url")
			q-item-section(avatar)
				q-icon(:name="page.icon")
			q-item-section
				q-item-label {{ page.title }}

	q-btn(round flat dense  @click="mystore.toggleMini").mini.gt-sm
		q-icon(name="mdi-backburger" v-if="!mystore.mini")
		q-icon(name="mdi-forwardburger" v-else)

</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'

const props = defineProps({
	show: {
		type: Boolean,
		default: true,
	},
})

const mystore = useStore()

const pages = [
	{
		id: 0,
		title: 'Главная',
		icon: 'mdi-home-roof',
		url: '/',
	},
	{
		id: 1,
		title: 'Отчеты',
		icon: 'mdi-finance',
		url: '/report',
	},
	{
		id: 6,
		title: 'Запросы',
		icon: 'mdi-toy-brick-search-outline',
		url: '/requests',
	},
	{
		id: 4,
		title: 'Чек-листы',
		icon: 'mdi-check-all',
		url: '/checklists',
	},
	{
		id: 5,
		title: 'Темы',
		icon: 'mdi-lan',
		url: '/categories',
	},
]
// export default {
</script>

<style scoped lang="scss">
// @import '@/assets/styles/theme.scss';
.mini {
	position: absolute;
	bottom: 1rem;
	left: 0.5rem;
	overflow-x: hidden;
}
.q-item--active,
.q-item.q-router-link--active {
	background: $accent1;
	// color: black;
	color: $blue-9;
}
</style>
