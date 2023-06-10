<template lang="pug">
.rel
	VueApexCharts(height="300px" type="area" :options="chartOptions" :series="series" @dataPointMouseEnter="test").q-my-sm
	.tit(@click="updateChart") {{veha[0].veha}}

</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
	components: { VueApexCharts },
	props: ['veha'],
	emits: ['dataPointSelection'],
	data: function () {
		return {
			chartOptions: {
				chart: {
					id: 'vuechart-example',
					zoom: {
						enabled: false,
					},
					toolbar: { show: false },
					events: {
						dataPointSelection: function (event, chartContext, config) {},
					},
				},
				dataLabels: {
					enabled: true,
				},
				labels: [
					'2022-03-04',
					'2022-03-11',
					'2022-03-18',
					'2022-03-24',
					'2022-04-01',
					'2022-04-08',
					'2022-04-14',
					'2022-04-21',
					'2022-04-28',
				],
				xaxis: {
					type: 'datetime',
				},
				yaxis: {
					opposite: true,
				},
			},
			series: [
				{
					name: 'series-1',
					data: [30, 40, 45, 50, 49, 60, 70, 81, 50],
				},
			],
		}
	},
	watch: {
		veha(newVeha, oldQuestion) {
			if (newVeha) {
				this.updateChart()
			}
		},
	},
	methods: {
		test() {
			console.log('fuck')
		},
		updateChart() {
			const max = 90
			const min = 20
			const newData = this.series[0].data.map(() => {
				return Math.floor(Math.random() * (max - min + 1)) + min
			})

			const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']

			// Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
			this.chartOptions = {
				colors: [colors[Math.floor(Math.random() * colors.length)]],
			}
			// In the same way, update the series option
			this.series = [
				{
					data: newData,
				},
			]
		},
	},
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.tit {
	position: absolute;
	top: 0;
	left: 0.7rem;
	font-size: 1rem;
	font-weight: 600;
}
</style>
