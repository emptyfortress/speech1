<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps<{
	trainers: Trainer[]
}>()

const labels = computed(() => props.trainers.map((t) => t.lastName))

const series = computed(() => props.trainers.map((t) => t.evaluationCount))

const options = {
	chart: {
		type: 'donut',
	},
	labels: labels.value,
	legend: {
		show: false,
	},
	plotOptions: {
		pie: {
			donut: {
				size: '60%',
				labels: {
					show: true,
					total: {
						show: true,
						label: 'Всего оценок',
					},
				},
			},
		},
	},
	dataLabels: {
		enabled: true,
		formatter: function (val: number) {
			return Math.round(val) + '%'
		},
		dropShadow: {
			enabled: true,
		},
	},
	tooltip: {
		y: {
			formatter: (val: number) => `${val} оценок`,
		},
	},
}
</script>

<template lang="pug">
VueApexCharts(type="donut" :height='320' :options="options" :series="series")
</template>

<style scoped lang="scss"></style>
