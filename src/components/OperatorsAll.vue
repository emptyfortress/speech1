<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { operators } from '@/stores/operators'
import type { QTableColumn } from 'quasar'
import Aggregat from '@/components/Aggregat.vue'
import { useOperatorList } from '@/stores/operatorList'
import { buildAggregate, filterArray } from '@/utils/utils'
import { useRouter } from 'vue-router'
import ChipCalendar1 from '@/components/ChipCalendar1.vue'
import MarkDialog from '@/components/MarkDialog.vue'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray } from '@/utils/utils'

const opList = useOperatorList()
const router = useRouter()

const opercolumns: QTableColumn[] = [
	{ name: 'name', label: 'Оператор', field: 'name', align: 'left', sortable: true },
	{ name: 'city', label: 'Город', field: 'city', align: 'left', sortable: true },
	{ name: 'group', label: 'Группа', field: 'group', align: 'left', sortable: true },
	{ name: 'percent', label: 'Всего оценок', field: 'percent', align: 'center', sortable: true },
	{ name: 'good', label: 'Среднее', field: 'good', align: 'center', sortable: true },
	{ name: 'graph', label: 'Тренд', field: 'graph', align: 'left', sortable: false },
	{ name: 'action', label: '', field: 'action', align: 'right', sortable: false },
]
const pagination = ref({
	sortBy: 'name' as keyof Row,
	descending: false,
	page: 1,
	rowsPerPage: 10,
})
const goto = (evt: Event, row: any, index: number) => {
	router.push(`/oper/${row.id}`)
}
const markOperator = (id: number) => {
	console.log('fuck: ', id)
}
const query = ref('')
const table = ref()

const filteredRows = computed(() => {
	let filt = {
		name: (name: string) => name.toLowerCase().includes(query.value.toLowerCase()),
		city: (city: string) => true,
		group: (group: string) => true,
	}
	if (opList.cityFilters.length > 0) {
		filt.city = (city: string) => opList.cityFilters.includes(city)
	}
	if (opList.groupFilters.length > 0) {
		filt.group = (group: string) => opList.groupFilters.includes(group)
	}
	return filterArray(operators, filt)
})

watchEffect(() => {
	let temp = buildAggregate(operators, ['city', 'group'])
	opList.setAggregat(temp)
})
const markDialog = ref(false)
const goToOp = () => {
	markDialog.value = true
	// if (opList.selectedOperators.length > 0) {
	// 	const firstOp: Operator = opList.selectedOperators[0]
	// 	router.push(`/oper/${firstOp.id}`)
	// }
}
const sparkLine = {
	chart: {
		type: 'line',
		height: 35,
		sparkline: {
			enabled: true,
		},
	},
	stroke: {
		width: 3,
		curve: 'smooth',
	},
	tooltip: {
		enabled: false,
		x: {
			show: false,
		},
		y: {
			title: {
				formatter: function () {
					return ''
				},
			},
		},
		marker: {
			show: false,
		},
	},
}
const coolSeries = (e: any) => {
	return [
		{
			name: 'Eval',
			data: randomArray(5, e.bad, e.good),
		},
	]
}
</script>

<template lang="pug">
q-page(padding)
	.container
		.header
			q-icon(name="mdi-headset")
			.zag Операторы
			q-space
			ChipCalendar1
		.grid
			q-card.aggregat
				q-input(dense v-model="query" placeholder="оператор" clearable hide-bottom-space @clear="query = ''")
					template(v-slot:prepend)
						q-icon(name="mdi-magnify")
				Aggregat

			q-table.table(
				ref="table"
				:rows="filteredRows"
				:pagination="pagination"
				:columns="opercolumns"
				selection="multiple"
				v-model:selected="opList.selectedOperators"
				@row-click="goto"
				color="primary"
				row-key="id")
				template(v-slot:body-cell-graph="props")
					q-td(:props="props")
						component(:is="VueApexCharts" type="line" height="35" width="110" :options="sparkLine" :series="coolSeries(props.row)" )
				template(v-slot:body-cell-action="props")
					q-td.action(:props="props")
						q-btn(flat round icon="mdi-tooltip-check-outline" dense size="sm" color="primary" @click.stop="markOperator(props.row.id)")

			div
			div
				transition(name="slide-top")
					.mybuttons(v-show="opList.selectedOperators.length")
						q-btn(color="primary" label="Оценить" @click="goToOp")
	MarkDialog(v-model="markDialog")
</template>

<style scoped lang="scss">
.header {
	margin-top: 1rem;
	display: flex;
	justify-content: start;
	gap: 2rem;
	align-items: center;
}
.grid {
	display: grid;
	grid-template-columns: 220px 1fr;
	justify-items: start;
	align-items: start;
	column-gap: 1rem;
	row-gap: 0.5rem;
	margin-top: 1rem;
}
.table {
	width: 100%;
}
:deep(.table tr) {
	.action > button {
		visibility: hidden;
	}
	&:hover {
		.action > button {
			visibility: visible;
		}
	}
}
.aggregat {
	font-size: 0.9rem;
	.q-input {
		padding: 1rem;
		padding-bottom: 0;
	}
}
.mybuttons {
	margin-top: 0.5rem;
	transition: 0.3s ease all;
	button {
		margin-right: 4px;
	}
}
</style>
