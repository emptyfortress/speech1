<template lang="pug">
q-chip(:label="date").cursor-pointer
	q-menu(transition-show="jump-down" transition-hide="jump-up")
		q-list
			q-item(clickable v-close-popup v-for="item in list" @click="setDateOptions(item)")
				q-item-section {{ item }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
	label: {
		type: String,
		default: 'Прошлая неделя',
	},
})

const list = [
	'Прошлая неделя',
	'Текущая неделя',
	'Прошлый месяц',
	'Текущий месяц',
	'Прошлый квартал',
	'Текущий квартал',
]

const date = ref(props.label)

const setDateOptions = (e: string) => {
	date.value = e
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.q-chip {
	background: $accent1;
	color: $blue-9;
}
</style>
