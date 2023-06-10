<template lang="pug">
VueApexCharts(height="320px" type="bar" :options="chartOptions" :series="series" @dataPointSelection="test")
q-btn(icon="mdi-close" @click="updateChart")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const chartOptions = ref({
	chart: {
		id: 'vuechart-example',
	},
	xaxis: {
		categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
	},
	colors: ['#29A1F9'],
})
const series = ref([
	{
		name: 'series-1',
		data: [30, 40, 45, 50, 49, 60, 70, 81],
	},
])

const updateChart = () => {
	const max = 90
	const min = 20
	const newData = series.value[0].data.map(() => {
		return Math.floor(Math.random() * (max - min + 1)) + min
	})

	const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']

	// Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
	chartOptions.value = {
		chart: {
			id: 'vuechart-example',
		},
		xaxis: {
			categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
		},
		colors: [colors[Math.floor(Math.random() * colors.length)]],
	}
	// In the same way, update the series option
	series.value = [
		{
			name: 'fuck',
			data: newData,
		},
	]
}
const test = (e: any, chartContext: any, config: any) => {
	console.log('test')
	console.log(config)
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
