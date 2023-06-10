<template lang="pug">
q-card(:class="{'full' : isFullscreen}")
	.top
		.hd Операторы
		div(v-if="!isFullscreen")
			label(@click="tabl = false") Граф
			q-toggle(v-model="tabl" dense size="xs")
			label(@click="tabl = true") Таблица
		q-btn(flat round dense :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="togg")
	transition(name="slide-bottom" v-if="!isFullscreen")
		component(:is="VueApexCharts" type="bar" height="235" :options="options" :series="series" v-if="tabl === false").graph
		q-table(v-else
			:columns="columns"
			dense
			:rows="bigData"
			row-key="name"
			binary-state-sort
			:filter="filter"
			:pagination="pagination"
			).table.thinhd.q-mt-md.full-width
	.grid(v-else)
		q-table(:columns="columns"
			:rows="bigData"
			row-key="name"
			binary-state-sort
			:filter="filter"
			:pagination="pagination1"
			).table.full-width
		.div
			component(:is="VueApexCharts" type="bar" :height="hei" :options="options1" :series="bigSeries")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { options, options1, series, bigSeries, bigData, columns } from '@/stores/operoptions'

const filter = ref('')
const isFullscreen = ref(false)
const tabl = ref(false)
const togg = () => {
	isFullscreen.value = !isFullscreen.value
}
const pagination = ref({
	page: 1,
	rowsPerPage: 6,
})
const pagination1 = ref({
	page: 1,
	rowsPerPage: 0,
})
const hei = computed(() => {
	return 50 * 35 + 22
})
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.hd {
	font-size: 0.93rem;
	font-weight: bold;
	margin-left: 0.5rem;
}
.graph {
	width: 100%;
}
label {
	font-size: 0.8rem;
	margin: 0 0.5rem;
	cursor: pointer;
}
.full {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 6000;
	padding: 1.5rem;
	overflow: auto;
	.table {
		box-shadow: none;
	}
}
.grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
}
.div {
	margin-top: -1px;
}
</style>
