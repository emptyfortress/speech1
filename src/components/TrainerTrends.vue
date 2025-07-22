<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { randomNumber, randomArray } from '@/utils/utils'

const chartOptionsMarks = {
	chart: {
		type: 'area',
		sparkline: {
			enabled: true,
		},
		animations: {
			enabled: false,
		},
	},
	stroke: {
		curve: 'smooth',
	},
	fill: {
		opacity: 0.3,
	},
	xaxis: {
		crosshairs: {
			width: 1,
		},
	},
	yaxis: {
		min: 0,
	},
	title: {
		text: randomNumber(5, 25, 0),
		offsetX: 0,
		style: {
			fontSize: '24px',
		},
	},
	subtitle: {
		text: 'Оценки',
		offsetX: 0,
		style: {
			fontSize: '14px',
		},
	},
}
const series1 = [{ name: 'Вызовы', data: randomArray(7, 20, 55) }]
</script>

<template lang="pug">
.trend
	q-card
		VueApexCharts(type="area" height="130px" :options="chartOptionsMarks" :series="series1")
	q-card
	q-card
	q-card
</template>

<style scoped lang="scss">
.trend {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 1rem;
}
</style>
