<script setup lang="ts">
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray } from '@/utils/utils'

const props = defineProps<{ trainer: Trainer }>()

const chartConfigs = ref([
	{ subtitle: 'Оценки', getValue: (t: Trainer) => t.evaluationCount },
	{ subtitle: 'Аппеляции', getValue: (t: Trainer) => t.appelation },
	{ subtitle: 'Исправления', getValue: (t: Trainer) => t.correction },
	{ subtitle: 'Средний балл', getValue: (t: Trainer) => t.averageScore },
])

const trends = computed(() =>
	chartConfigs.value.map((conf) => ({
		subtitle: conf.subtitle,
		title: conf.getValue(props.trainer).toString(),
		data: randomArray(7, 10, 50), // Или заменить на реальные значения, если будут
	}))
)

function getChartOptions(config: { title: string; subtitle: string }) {
	return {
		chart: {
			type: 'area',
			sparkline: {
				enabled: true,
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
		title: {
			text: config.title,
			offsetX: 0,
			style: {
				fontSize: '24px',
			},
		},
		subtitle: {
			text: config.subtitle,
			offsetX: 0,
			style: {
				fontSize: '14px',
			},
		},
	}
}
</script>

<template lang="pug">
.trend
	q-card(v-for="(chart, index) in trends" :key="index")
		VueApexCharts(
			type="area"
			height="130px"
			:options="getChartOptions(chart)"
			:series="[{ name: chart.subtitle, data: chart.data }]"
		)
</template>

<style scoped lang="scss">
.trend {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 1rem;
}
</style>
