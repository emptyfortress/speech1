<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray } from '@/utils/utils'

const sparkLine = {
	chart: {
		type: 'bar',
		height: 32,
		sparkline: {
			enabled: true,
		},
	},
	plotOptions: {
		bar: {
			columnWidth: '80%',
		},
	},
	tooltip: {
		fixed: {
			enabled: false,
		},
		x: {
			show: false,
		},
		y: {
			title: {
				formatter: function (seriesName: any) {
					return 'Вопрос: '
				},
			},
		},
		marker: {
			show: false,
		},
	},
	// tooltip: {
	// 	enabled: false,
	// 	marker: {
	// 		show: false,
	// 	},
	// },
}
const coolSeries = computed(() => {
	return [
		{
			name: 'Eval',
			data: randomArray(5, 10, 93),
		},
	]
})
</script>

<template lang="pug">
component(:is="VueApexCharts" type="bar" height="32" width="100" :options="sparkLine" :series="coolSeries")
</template>

<style scoped lang="scss"></style>
