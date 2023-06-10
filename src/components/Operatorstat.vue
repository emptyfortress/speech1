<template lang="pug">
q-expansion-item(v-model="oper")
	template(v-slot:header)
		q-item-section(avatar).line
			q-avatar(icon="mdi-headset" flat)

		q-item-section
			.zag Операторы
		q-item-section(v-if="oper" side @click.stop)
			q-input(v-model="operator" dense debounce="300" color="primary" clearable).search
				template(v-slot:prepend)
					q-icon(name="mdi-magnify")
	q-card-section.q-px-md.q-pt-md
		.grid
			q-table(:rows="rows"
				:columns='columns'
				row-key="name"
				binary-state-sort
				:pagination="pagination"
				v-model:selected="selected"
				:selected-rows-label="getSelectedString"
				rows-per-page-label="Записей на странице"
				).table
				template(v-slot:body="props")
					q-tr(:props="props" @click="select(props.row)" :class="operClass(props.row)")
						q-td(key="name") {{ props.row.name }}
						q-td(key="total").text-right {{ props.row.total }}
						q-td(key="good").text-right {{ props.row.good }}
						q-td(key="percent").text-right {{ props.row.percent }}%

			q-card
				q-card-section(v-if="!selected.length") Соответствие сценарию
				q-card-section(v-else) {{ selected[0].name}}
				div(v-if="!selected.length")
					component(:is="VueApexCharts" height="265px" type="bar" :options="options1" :series="series1")
				div(v-else)
					component(:is="VueApexCharts" height="300px" type="donut" :options="options" :series="getSeries")

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { operators } from '@/stores/operators'
import VueApexCharts from 'vue3-apexcharts'

interface MyColumns {
	name: string
	label: string
	field: string | ((row: any) => any)
	required?: boolean
	align?: 'left' | 'right' | 'center'
	sortable?: boolean
	sort?: (a: any, b: any, rowA: any, rowB: any) => number
	sortOrder?: 'ad' | 'da'
	format?: (val: any, row: any) => any
	style?: string | ((row: any) => string)
	classes?: string | ((row: any) => string)
	headerStyle?: string
	headerClasses?: string
}

interface Row {
	name: string
	good: number
	notgood: number
	bad: number
	total: number
	percent: number
}

const columns: MyColumns[] = [
	{
		name: 'name',
		required: true,
		label: 'Оператор',
		align: 'left',
		field: 'name',
		sortable: true,
	},
	{
		name: 'total',
		required: false,
		label: 'Всего звонков',
		align: 'right',
		field: 'total',
		sortable: true,
	},
	{
		name: 'good',
		required: false,
		label: 'Соответствует сценарию',
		align: 'right',
		field: 'good',
		sortable: true,
	},
	{
		name: 'percent',
		required: false,
		label: '%',
		align: 'right',
		field: 'percent',
		sortable: true,
		format: (val, row) => `${val}%`,
	},
]

const rows = operators

const oper = ref(false)
const selected: Ref<Row[]> = ref([])

const select = (e: Row) => {
	if (selected.value.length === 0) {
		selected.value.push(e)
	} else if (selected.value[0].name === e.name) {
		selected.value = []
	} else {
		selected.value = []
		selected.value.push(e)
	}
}
const getSelectedString = (e: number) => {
	return `Выбран оператор`
}

const getSeries = computed(() => {
	let item = selected.value[0]
	let data = []
	data.push(item.good)
	data.push(item.notgood)
	data.push(item.bad)
	return data
})

const options = {
	chart: {
		type: 'donut',
	},
	labels: ['Соответствует', 'Частично', 'Не соответствует'],
	legend: {
		show: true,
		position: 'bottom',
	},
	dataLabels: {
		enabled: true,
		formatter: function (val: number) {
			return Math.round(val) + '%'
		},
	},
	plotOptions: {
		pie: {
			donut: {
				size: '70%',
			},
		},
	},
}

const series1 = [
	{
		data: [
			{ x: 'Екатерина', y: 15 },
			{ x: 'Елена', y: 93 },
			{ x: 'Ксения', y: 87 },
			{ x: 'Ирина', y: 59 },
			{ x: 'Ева', y: 19 },
		],
	},
]
const options1 = {
	chart: {
		type: 'bar',
	},
}

const pagination = ref({
	sortBy: 'total' as keyof Row,
	descending: true,
	page: 1,
	rowsPerPage: 5,
})

const operator = ref('')

const operClass = (e: Row) => {
	if (e.percent < 10) {
		return 'pink'
	}
	if (e.percent > 30) {
		return 'green'
	}
	return ''
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	.q-card {
		min-height: 100px;
	}
}
.search {
	width: 220px;
}
.pink {
	background: #ffdbe1;
}
.green {
	background: #bcf3c9;
}
.yellow {
	background: #ffedb6;
}
</style>
