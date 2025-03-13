<template lang="pug">
VueApexCharts(:options="options" :series="series")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray } from '@/utils/utils'

const data = randomArray(20, 10, 98)

const highlightedIndexes = [0, 5, 9, 15]

const colors = data.map((_, index) =>
	highlightedIndexes.includes(index) ? '#0661A8' : '#008FFB'
)

const series = ref([
	{
		name: 'Data',
		data,
	},
])

const options = {
	chart: {
		type: 'bar',
	},
	plotOptions: {
		bar: {
			horizontal: false,
			distributed: true,
		},
	},
	labels: Array.from({ length: 16 }, (_, i) => i + 1),
	colors,
	legend: {
		show: true,
		markers: {
			fillColors: ['#0661A8', '#008FFB',],
		},
		itemMargin: {
			horizontal: 10,
			vertical: 5,
		},
		labels: {
			colors: '#333',
		},
		customLegendItems: ['Средняя оценка группы', 'Оценки чеклиста'],
	},
}

</script>

<style scoped lang="scss"></style>
