<template lang="pug">
component(:is="VueApexCharts" height="320px" type="bar" :options="options" :series="series")
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'

const series = [{ data: [98, 80, 91,] }]

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
			'Группа Приветcтвие',
			'Группа Проблемы',
			'Группа Прощание',
		],
	},
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';</style>
