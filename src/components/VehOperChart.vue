<template lang="pug">
q-item
	q-item-section
		.text-subtitle1 Все операторы
.cent
		component(:is="VueApexCharts" width="400" type="donut" :options="options" :series="series")
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { randomArray } from '@/utils/utils'

const options = {
	chartOptions: {
		chart: {
			type: 'donut',
		},
	},
	labels: ['Все вехи пройдены', 'Пройдена половина вех', 'Меньше половины'],
	legend: {
		position: 'bottom',
	},
}
const series = randomArray(3, 20, 5)
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.cent {
	width: 100%;
	height: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
