<script setup lang="ts">
import { computed, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps<{ trainers: Trainer[] }>()

const chartConfigs = ref([
	{ subtitle: 'Количество оценок', getValue: (t: Trainer) => t.evaluationCount },
	{ subtitle: 'Поданные апелляции', getValue: (t: Trainer) => t.appelation },
	{ subtitle: 'Средний балл', getValue: (t: Trainer) => t.averageScore },
])

// Вычисляем отсортированные данные для каждого графика
const sortedData = computed(() => {
	return chartConfigs.value.map((config) => {
		const sorted = [...props.trainers].sort((a, b) => config.getValue(b) - config.getValue(a))
		return {
			title: config.subtitle,
			categories: sorted.map((t) => t.lastName),
			series: sorted.map((t) => config.getValue(t)),
		}
	})
})

function getChartOptions(title: string, categories: string[]) {
	return {
		chart: {
			type: 'bar',
			toolbar: { show: false },
		},
		plotOptions: {
			bar: {
				horizontal: true,
				borderRadius: 4,
				barHeight: '60%',
			},
		},
		dataLabels: {
			enabled: true,
		},
		xaxis: {
			categories,
		},
		yaxis: {
			labels: {
				style: {
					fontSize: '12px',
				},
			},
		},
		title: {
			text: title,
			align: 'left',
			style: {
				fontSize: '16px',
				fontWeight: 600,
			},
		},
	}
}
</script>

<template lang="pug">
.trsdata
	q-card.q-pa-md(
		v-for="(item, index) in sortedData"
		:key="index"
	)
		VueApexCharts(
			type="bar"
			height="300"
			:options="getChartOptions(item.title, item.categories)"
			:series="[{ name: item.title, data: item.series }]"
		)

</template>

<style scoped lang="scss">
.trsdata {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 1rem;
}
</style>
