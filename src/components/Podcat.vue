<template lang="pug">
q-card-section
	.grid2
		q-table(:rows="rows"
			:columns="columns1"
			row-key="id"
			binary-state-sort
			flat
			:pagination="pagination"
			:filter="filter"
			rows-per-page-label="Записей на странице"
			hide-bottom
			)
			template(v-slot:top)
				.text-h6 {{props.categoryName}}
				q-space
				q-input(dense debounce="300" color="primary" clearable v-model="filter")
					template(v-slot:prepend)
						q-icon(name="mdi-magnify")
		.graf
			component(:is="VueApexCharts" height="101%" type="bar" :options="podcatOptions" :series="podcatSeries")
</template>

<script setup lang="ts">
import { addition } from '@/stores/addition'
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray } from '@/utils/utils'

const props = defineProps({
	categoryName: {
		type: String,
		default: 'Категория',
	},
})
const filter = ref('')
const rows = computed(() => {
	if (filter.value) {
		return addition.filter((e) => e.name.toLowerCase().includes(filter.value.toLowerCase()))
	}
	return addition
})

const columns1: Column[] = [
	{ name: 'name', label: 'Подкатегория', field: 'name', sortable: true, align: 'left' },
	{ name: 'call', label: 'Звонки', field: 'call', sortable: true, align: 'right' },
	{
		name: 'ant',
		label: 'АНТ, мин.',
		field: 'ant',
		sortable: true,
		align: 'right',
	},
	{
		name: 'loud',
		label: 'Тишина, %',
		field: 'loud',
		sortable: true,
		align: 'right',
	},
	{
		id: 4,
		name: 'interrupt',
		label: 'Перебивания, %',
		field: 'interrupt',
		sortable: true,
		align: 'right',
	},
]

const pagination = ref({
	descending: true,
	page: 1,
	rowsPerPage: 10,
})

const podcatOptions = {
	chart: {
		type: 'bar',
		stacked: true,
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			horizontal: true,
		},
	},
	stroke: {
		width: 1,
		colors: ['#fff'],
	},
	xaxis: {
		categories: [
			'Клиентский спрос',
			'стратегия',
			'планирование',
			'нестандартный подход',
			'рекламный клаттер',
			'SWOT-анализ',
			'тактический формат',
			'мониторинг активности',
			'Рейт-карта',
			'Ретроконверсия',
		],
		labels: {
			show: false,
			minHeight: 0,
			maxHeight: 0,
		},
	},
	yaxis: {
		show: false,
		title: {
			text: undefined,
		},
	},
	fill: {
		opacity: 1,
	},
	legend: {
		show: true,
		position: 'top',
		horizontalAlign: 'center',
	},
	colors: ['#29A1F9', '#FDB948', '#C72829'],
}

const podcatSeries = computed(() => {
	return [
		{ name: 'AHT', data: randomArray(rows.value.length, 10, 40) },
		{ name: 'Тишина', data: randomArray(rows.value.length, 3, 15) },
		{ name: 'Перебивания', data: randomArray(rows.value.length, 7, 20) },
	]
})
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.grid2 {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
}
.graf {
	margin-top: 64px;
}
</style>
