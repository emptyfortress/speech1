<template lang="pug">
component(:is="VueApexCharts" type="bar" height="360" :options="podcatOptions" :series="podcatSeries" v-if="levelCheck")
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useCat } from '@/stores/category1'
import { randomArray } from '@/utils/utils'

const cat = useCat()

const levelCheck = computed(() => {
	if (cat.getItem?.level! < 3) {
		return true
	} else return false
})

const podcatSeries = computed(() => {
	return [
		{
			name: 'AHT',
			data: randomArray(cat.getItemPodcat.length, 4, 8),
		},
		{
			name: 'Тишина',
			data: randomArray(cat.getItemPodcat.length, 9, 20),
		},
		{
			name: 'Перебивания',
			data: randomArray(cat.getItemPodcat.length, 3, 11),
		},
	]
})

const podcatOptions = computed(() => {
	return {
		chart: {
			type: 'bar',
			stacked: true,
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			bar: {
				horizontal: true,
			},
		},
		stroke: {
			width: 1,
			colors: ['#fff'],
		},
		xaxis: {
			categories: cat.getItemPodcat,
		},
		yaxis: {
			show: true,
			title: {
				text: undefined,
			},
		},
		fill: {
			opacity: 1,
		},
		legend: {
			position: 'top',
			horizontalAlign: 'center',
		},
		colors: ['#29A1F9', '#FDB948', '#C72829'],
	}
})
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
