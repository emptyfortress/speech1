<template lang="pug">
.bt
	q-btn(outline size="sm" label="1M" @click="setMonth")
	q-btn(outline size="sm" label="6M" @click="setHalf")
	q-btn(outline size="sm" label="1Y" @click="setYear")
	q-btn(outline size="sm" label="YTD" @click="setY")
	q-btn(outline size="sm" label="ALL" @click="setAll")

component(:is="VueApexCharts" ref="chart" type="area" height="330px" :options="options" :series="series" )
</template>

<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { series, options } from '@/stores/zoom'

const chart = ref(null)

const setMonth = () => {
	chart.value.zoomX(new Date('28 Jan 2013').getTime(), new Date('27 Feb 2013').getTime())
}
const setHalf = () => {
	chart.value.zoomX(new Date('27 Sep 2012').getTime(), new Date('27 Feb 2013').getTime())
}
const setYear = () => {
	chart.value.zoomX(new Date('27 Feb 2012').getTime(), new Date('27 Feb 2013').getTime())
}
const setY = () => {
	chart.value.zoomX(new Date('01 Jan 2013').getTime(), new Date('27 Feb 2013').getTime())
}
const setAll = () => {
	chart.value.zoomX(new Date('23 Jan 2012').getTime(), new Date('27 Feb 2013').getTime())
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.bt {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 3px;
}
</style>
