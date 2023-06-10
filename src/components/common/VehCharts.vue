<template lang="pug">
component(:is="VueApexCharts" height="320px" type="bar" :options="options" :series="series")
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

const series = [{ data: [98, 80, 91, 79, 82, 60, 96] }]

const options = {
	chart: {
		type: 'bar',
		height: 320,
		toolbar: { show: false },
	},
	plotOptions: {
		bar: {
			horizontal: true,
		},
	},
	dataLabels: {
		enabled: true,
	},
	xaxis: {
		categories: [
			'Приветствие',
			'Назвать себя',
			'Локализация проблемы',
			'Просьба обождать',
			'Благодарность за ожидание',
			'Новые услуги',
			'Прощание',
		],
	},
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
