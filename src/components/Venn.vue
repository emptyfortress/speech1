<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chart, LinearScale } from 'chart.js';
import { VennDiagramController, ArcSlice } from 'chartjs-chart-venn'


// Register the Venn diagram controller and necessary elements
Chart.register(VennDiagramController, ArcSlice, LinearScale);

const vennCanvas = ref<HTMLCanvasElement | null>(null)

// onMounted(() => {
// 	if (vennCanvas.value) {
// 		new Chart(vennCanvas.value, {
// 			type: VennDiagramController.id, // Specify the Venn chart type
// 			data: {
// 				datasets: [
// 					{
// 						label: 'Venn Dataset',
// 						data: [
// 							{ sets: ['A'], size: 20 },
// 							{ sets: ['B'], size: 10 },
// 							{ sets: ['A', 'B'], size: 5 },
// 						],
// 						backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
// 					},
// 				],
// 			},
// 			options: {
// 				responsive: true,
// 				plugins: {
// 					legend: {
// 						display: true,
// 						position: 'top',
// 					},
// 				},
// 			},
// 		});
// 	}
// });

</script>

<template lang="pug">
canvas(ref="vennCanvas")
</template>


<style scoped lang="scss">
canvas {
	// max-width: 500px;
	max-height: 250px;
	// max-width: 600px;
	// max-height: 400px;
}
</style>
