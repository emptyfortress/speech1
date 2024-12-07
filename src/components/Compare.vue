<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'

const store = useStore()

const compareList = ref([
	{
		checklist: 'Интегральный',
		region: 'Все',
		group: 'Все',
		operator: 'Все',
		period: 'Прошлый месяц',
	},
	{
		checklist: 'Интегральный',
		region: 'Все',
		group: 'Все',
		operator: 'Все',
		period: 'Текущий месяц',
	}
])
const toggleCompare = (() => {
	store.setCompare(false)
})

const remove = ((index: number) => {
	compareList.value.splice(index, 1)
})
</script>

<template lang="pug">
.compareblock
	.text-center
		.zag Сравнение:
		<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 256 256"><path fill="hsl(60 7% 60% / 1)" d="m239.43 133l-32-80a8 8 0 0 0-7.43-5a8.3 8.3 0 0 0-1.73.21L136 62V40a8 8 0 0 0-16 0v25.58L54.27 80.21a8 8 0 0 0-5.7 4.79l-32 80a7.9 7.9 0 0 0-.57 3c0 23.31 24.54 32 40 32s40-8.69 40-32a7.9 7.9 0 0 0-.57-3L66.92 93.77L120 82v126h-16a8 8 0 0 0 0 16h48a8 8 0 0 0 0-16h-16V78.42l51-11.32l-26.43 65.9a7.9 7.9 0 0 0-.57 3c0 23.31 24.54 32 40 32s40-8.69 40-32a7.9 7.9 0 0 0-.57-3m-160 35H32.62L56 109.54Zm97.24-32L200 77.54L223.38 136Z"/></svg>
	.compare(v-for="(item, index) in compareList" :key='index')
		q-btn.close(round color="negative" icon="mdi-close" @click="remove(index)" dense size="xs")
		q-avatar(size="md" color="primary" text-color="white") {{ index + 1 }}
		.grd
			template(v-for="(value, key) in item")
				div {{ key }}:
				div {{ value }}

	.buttons
		q-btn(flat color="primary" label="Отмена" @click="toggleCompare") 
		q-btn(unelevated color="primary" label="Сравнить" @click="") 
</template>


<style scoped lang="scss">
.grd {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-items: start;
	align-items: start;
	column-gap: 1rem;
	row-gap: 0;
}

.container {
	width: 1200px;
	padding-top: 2rem;
}

.compareblock {
	border: 2px solid #d0d0c2;
	padding: 1rem;
	background: $accent2;
	display: grid;
	grid-template-columns: auto 1fr 1fr 200px;
	column-gap: 2rem;
}

.compare {
	background: #fff;
	font-size: .8rem;
	box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, .2);
	position: relative;
	padding: .5rem;
	display: grid;
	grid-template-columns: auto 1fr;
	justify-items: start;
	align-items: start;
	column-gap: 2rem;
}

.close {
	position: absolute;
	top: -.5rem;
	right: -.5rem;
}

.buttons {
	grid-column: 4/5;
	align-self: end;
}
</style>
