<template lang="pug">
VueApexCharts(type="heatmap" height="270" :options="chartOptions" :series="heatSeries")
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { heatSeries } from '@/stores/cloud'

const chartOptions = {
	chart: {
		height: 270,
		type: 'heatmap',
		toolbar: {
			show: true,
		},
		zoom: {
			enabled: true,
		},
	},
	dataLabels: {
		enabled: false,
	},
	colors: ['#008FFB'],
	title: {
		text: 'Операторы',
	},
}
</script>

<style scoped lang="scss"></style>
