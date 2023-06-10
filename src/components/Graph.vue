<template lang="pug">
q-expansion-item(v-model="mystore.integral")
	template(v-slot:header)
		q-item-section(avatar).line
			q-avatar(icon="mdi-abacus" flat)

		q-item-section
			.zag Интегральная оценка
	q-card-section
		content-loader(v-if="mystore.loading" :width="1132"
			:height="429"
			:speed="2"
			primaryColor="#f2f2f2"
			secondaryColor="#ffffff")
			rect(x="0" y="27" rx="8" ry="8" width="371" height="402")
			rect(x="390" y="27" rx="8" ry="8" width="742" height="402")
			path(d="M 0 0 h 186 v 19 H 0 z M 393 0 h 155 v 19 H 393 z")

		.grid(v-else)
			div
				.zg Соответствие сценарию
				q-card
					component(:is="VueApexCharts" type="donut" height="301px" :options="options" :series="series")
					q-markup-table.tab
						tr
							td.desc Всего разговоров
							td 158
							td 100%
						tr
							td.desc
								span.blue Соответствует сценарию
							td 80
							td 51%
						tr
							td.desc
								span.green Частично соответствуют
							td 55
							td 35%
						tr
							td.desc
								span.orange Не соответствуют
							td 23
							td 15%
			div
				.zg Динамика за период
				q-card
					Zoomchart1
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useStore } from '@/stores/store'
import Zoomchart1 from '@/components/Zoomchart1.vue'
import { ContentLoader } from 'vue-content-loader'

// const integ = ref(false)
const mystore = useStore()

const series = [80, 55, 23]
const options = {
	chart: {
		type: 'donut',
	},
	labels: ['Соответствует', 'Частично', 'Не соответстует'],
	legend: {
		show: false,
		position: 'bottom',
	},
	plotOptions: {
		pie: {
			donut: {
				size: '70%',
				labels: {
					show: true,
					name: {
						show: true,
						label: 'fuck',
					},
					total: {
						show: true,
						label: 'Всего',
					},
				},
			},
		},
	},
	dataLabels: {
		enabled: true,
		formatter: function (val: number) {
			return Math.round(val) + '%'
		},
		dropShadow: {
			enabled: true,
		},
	},
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.grid {
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 1rem;
}
.zg {
	font-size: 1rem;
	font-weight: 500;
}
.q-card {
	min-height: 100px;
	padding: 1rem;
}
.tab {
	font-size: 0.8rem;
	color: #666;
	margin: 3px auto;
	width: 80%;
}
td {
	padding: 1px 0;
	text-align: right;
	&.desc {
		text-align: left;
	}
	span:before {
		content: '';
		width: 8px;
		height: 8px;
		display: inline-block;
		margin-right: 0.5rem;
		border-radius: 8px;
	}
	span.blue:before {
		background: $primary;
	}
	span.green:before {
		background: green;
	}
	span.orange:before {
		background: orange;
	}
}
</style>
