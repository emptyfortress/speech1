<template lang="pug">
.grid
	q-card( v-for="trend in trends" :key="trend.id" @click="showDialog(trend.id)")
		div(v-if="trend.id === 1" )
			VueApexCharts(type="area" height="130px" :options="chartOptionsSpark1" :series="series1")
		div(v-if="trend.id === 2" )
			VueApexCharts(type="area" height="130px" :options="chartOptionsSpark2" :series="series2")
		div(v-if="trend.id === 3" )
			VueApexCharts(type="area" height="130px" :options="chartOptionsSpark3" :series="series3")
		div(v-if="trend.id === 4" )
			VueApexCharts(type="area" height="130px" :options="chartOptionsSpark4" :series="series4")

q-dialog(v-model="dialog")
	q-card(style="width: 900px; max-width: 80vw;")
		q-btn(round color="negative" icon="mdi-close" @click="dialog = false").close
		q-card-section
			VueApexCharts(type="area" :options="computeOptions" :series="computeSeries")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import {
	chartOptions1,
	chartOptions2,
	chartOptions3,
	chartOptions4,
	chartOptionsSpark1,
	chartOptionsSpark2,
	chartOptionsSpark3,
	chartOptionsSpark4,
} from '@/stores/charts1'

const trends = [
	{ id: 1, label: 'Вызовы' },
	{ id: 2, label: 'АНТ' },
	{ id: 3, label: 'Тишина' },
	{ id: 4, label: 'Перебивания' },
]
const series1 = [{ name: 'Вызовы', data: [55, 57, 65, 70, 77, 80, 67] }]
const series2 = [{ name: 'АНТ', data: [60, 57, 65, 67, 72, 42, 68] }]
const series3 = [{ name: 'Тишина', data: [20, 22, 18, 21, 23, 20, 24] }]
const series4 = [{ name: 'Перебивания', data: [15, 22, 18, 14, 13, 7, 3] }]
// const seriesSpark1 = [{ data: randomizeArray(sparklineData) }]

const dialog = ref(false)
const id = ref(0)
const showDialog = (e: number) => {
	dialog.value = true
	id.value = e
}

const computeOptions = computed(() => {
	switch (id.value) {
		case 1:
			return chartOptions1
		case 2:
			return chartOptions2
		case 3:
			return chartOptions3
		case 4:
			return chartOptions4
		default:
			return chartOptions1
	}
})

const computeSeries = computed(() => {
	switch (id.value) {
		case 1:
			return series1
		case 2:
			return series2
		case 3:
			return series3
		case 4:
			return series4
		default:
			return series1
	}
})
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1rem;
	.q-card {
		padding: 0.5rem 0 0 0;
	}
}
</style>
