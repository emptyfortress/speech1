<template lang="pug">
.grid1
	q-card.tags
		canvas#canvas
		.zg Голос клиента
	q-card.q-pa-sm
		StackedChart
		//- Heat
</template>

<script setup>
import { Chart, registerables } from 'chart.js'
import { WordCloudChart } from 'chartjs-chart-wordcloud'
import { onMounted } from 'vue'
import { words } from '@/stores/cloud'
import StackedChart from '@/components/common/StackedChart.vue'
// import Heat from '@/components/Heat.vue'

Chart.register(...registerables)

const data = {
	labels: words.map((d) => d.key),
	datasets: [
		{
			label: '',
			data: words.map((d) => 0 + d.value * 2),
		},
	],
}

onMounted(() => {
	const canvas = document.getElementById('canvas')
	const chart = new WordCloudChart(canvas.getContext('2d'), {
		data: data,
		options: {
			padding: '0px',
		},
	})
})
</script>

<style scoped lang="scss">
.grid1 {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
}
.tags {
	// width: 100%;
	height: 300px;
	padding: 1rem;
	padding-top: 0;
	position: relative;
}
.zg {
	position: absolute;
	top: 8px;
	left: 12px;
	font-size: 15px;
	font-weight: 600;
}
</style>
