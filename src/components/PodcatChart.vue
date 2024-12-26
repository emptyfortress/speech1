<script setup lang="ts">
import { onMounted } from 'vue';
import { Chart, LinearScale } from 'chart.js';
import { VennDiagramController, ArcSlice } from 'chartjs-chart-venn'
// import { VennDiagramChart } from 'chartjs-chart-venn'

// Define the structure of the Venn data
// interface VennData {
// 	sets: string[];
// 	size: number;
// }

// Register the Venn diagram controller and necessary elements
Chart.register(VennDiagramController, ArcSlice, LinearScale);

// Function to render the Venn chart
const renderChart = () => {
	const ctx = document.getElementById('canvas')?.getContext('2d');

	// Ensure context is available
	if (!ctx) {
		console.error('Failed to get canvas context');
		return;
	}

	const vennData = [
		{ sets: ['A'], size: 10 },
		{ sets: ['B'], size: 20 },
		{ sets: ['C'], size: 30 },
		{ sets: ['A', 'B'], size: 5 },
		{ sets: ['A', 'C'], size: 15 },
		{ sets: ['B', 'C'], size: 10 },
		{ sets: ['A', 'B', 'C'], size: 3 }
	];

	new Chart(ctx, {
		// type: VennDiagramController.id,
		type: VennDiagramController.id,
		data: {
			datasets: [{
				data: vennData,
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				tooltip: {
					callbacks: {
						label(tooltipItem) {
							return `${tooltipItem.label}: ${tooltipItem.raw.size}`;
						}
					}
				}
			}
		}
	});
};

// Call renderChart when the component is mounted
onMounted(() => {
	renderChart();
});
</script>

<template lang="pug">
canvas(id="vennCanvas")
</template>


<style scoped lang="scss">
canvas {
	max-width: 600px;
	max-height: 400px;
}
</style>
