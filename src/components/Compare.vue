<script setup lang="ts">
import { ref } from 'vue'

const compareList = ref([
	{
		region: 'Все',
		group: 'Все',
		operator: 'Все',
		period: 'Прошлый месяц',
	},
	{
		region: 'Все',
		group: 'Все',
		operator: 'Все',
		period: 'Текущий месяц',
	}
])
</script>

<template lang="pug">
.container
	.compareblock
		.zag Сравнение:
		.compare(v-for="(item, index) in compareList" :key='index')
			q-btn.close(round color="negative" icon="mdi-close" @click="action" dense size="xs")
			q-avatar(size="md" color="primary" text-color="white") {{ index + 1 }}
			.grd
				template(v-for="(value, key) in item")
					div {{ key }}:
					div {{ value }}

		.q-gutter-x-xs
			q-btn(flat color="primary" label="Отмена" @click="action") 
			q-btn(unelevated color="primary" label="Сравнить" @click="action") 
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
</style>
