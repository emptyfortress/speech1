<template lang="pug">
VueApexCharts(:options="options" :series="series")
</template>

<script setup lang="ts">
import { ref, } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray } from '@/utils/utils'

const options = {
	chart: {
		type: 'bar',
	},
	plotOptions: {
		bar: {
			horizontal: false,
		},
	},
	labels: [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
	],
}

const series = ref([
	{
		data: randomArray(16, 10, 98),
	},
])

</script>

<style scoped lang="scss"></style>
