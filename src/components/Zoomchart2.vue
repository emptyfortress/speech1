<template lang="pug">
.bt
	q-btn(outline size="sm" label="Веха 1" @click="setBegin")
	q-btn(outline size="sm" label="Веха 2" @click="setHalf")
	q-btn(outline size="sm" label="Общая оценка" @click="setAll")

component(:is="VueApexCharts" ref="chart" type="area" height="330px" :options="options" :series="series" )
</template>

<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { series, options } from '@/stores/zoom'

const chart = ref(null)

const setBegin = () => {
	chart.value.zoomX(new Date('28 Jan 2012').getTime(), new Date('27 Feb 2012').getTime())
}
const setHalf = () => {
	chart.value.zoomX(new Date('27 Sep 2012').getTime(), new Date('27 Feb 2013').getTime())
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
