<script setup lang="ts">
import { ref } from 'vue'
import { sparkOptions, areaOptions } from '@/stores/layoutChartOptions'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray } from '@/utils/utils'

const series = ref([{ name: 'Параметр', data: randomArray(7, 80, 5) }])
</script>

<template lang="pug">
q-page(padding)
	h2 hello
	q-card
		VueApexCharts(type="area" height="100%" :options="areaOptions" :series="series")


</template>

<style scoped lang="scss">
.q-card {
	padding: 1rem;
	// width: 600px;
	height: 300px;
}
</style>
