<template lang="pug">
.grid1
	// q-card.tags(:class="{ 'full': isFullscreen }")
	q-card#tags.tags
		canvas#canvas
		.zg
			div Голос клиента
			q-btn(flat round dense :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="toggleFull")
	q-card.q-pa-sm
		StackedChart
		//- Heat
</template>

<script setup>
import { ref } from 'vue'
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
			padding: '10px',
		},
	})
})
const isFullscreen = ref(false)

// const togg = () => {
// 	isFullscreen.value = !isFullscreen.value
// }
const toggleFull = () => {
	const cloud = document.getElementById('tags')
	if (isFullscreen.value === false) {
		cloud.classList.add('full')
		isFullscreen.value = true
	} else {
		cloud.classList.remove('full')
		const canvas = document.getElementById('canvas')
		canvas.removeAttribute('width')
		canvas.removeAttribute('style')
		isFullscreen.value = false
	}
}
</script>

<style scoped lang="scss">
.grid1 {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
}

.tags {
	width: 100%;
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
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding-right: 1rem;
}

.full {
	position: fixed;
	height: 100vh;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 6000;
	padding: 1.5rem;
	overflow: auto;
}
</style>
