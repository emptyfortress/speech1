<template lang="pug">
VueApexCharts(type="bar" :options="barOptions" :series="barSeries")
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

const barSeries = [
	{
		data: [400, 430, 448],
	},
]
const barOptions = {
	chart: {
		type: 'bar',
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			horizontal: false,
		},
	},
	xaxis: {
		categories: ['Продажи', 'Сервис', 'Оплата'],
		labels: {
			show: true,
		},
	},
	yaxis: {
		labels: {
			show: false,
		},
	},
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
