<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { operators } from '@/stores/operators'
import type { QTableColumn } from 'quasar'
import Aggregat from '@/components/Aggregat.vue'
import { useOperatorList } from '@/stores/operatorList'
import { buildAggregate, filterArray } from '@/utils/utils'

const opList = useOperatorList()

const opercolumns: QTableColumn[] = [
	{ name: 'name', label: 'Оператор', field: 'name', align: 'left', sortable: true },
	{ name: 'city', label: 'Город', field: 'city', align: 'left', sortable: true },
	{ name: 'group', label: 'Группа', field: 'group', align: 'left', sortable: true },
	{ name: 'total', label: 'Звонки', field: 'total', align: 'right', sortable: true },
	{ name: 'good', label: 'Оценка', field: 'good', align: 'right', sortable: true },
	{ name: 'action', label: '', field: 'action', align: 'right', sortable: false },
]
const pagination = ref({
	sortBy: 'name' as keyof Row,
	descending: false,
	page: 1,
	rowsPerPage: 0,
})
const goto = (evt: Event, row: any, index: number) => {
	console.log(row.name)
}
const markOperator = (id: number) => {
	console.log('fuck: ', id)
}
const query = ref('')
const table = ref()

const filteredRows = computed(() => {
	let filt = {
		name: (name: string) => name.toLowerCase().includes(query.value.toLowerCase()),
		// city: (city: string) => ['СПб'].includes(city),
		// group: (group: string) => ['Юрлица'].includes(group),
	}
	return filterArray(operators, filt)
	// if (query.value.length > 0) {
	// 	return operators.filter((item) => item.name.toLowerCase().includes(query.value.toLowerCase()))
	// }
	// return operators
})

onMounted(() => {
	let temp = buildAggregate(filteredRows.value, ['city', 'group'])
	opList.setAggregat(temp)
})

// const filt = {
// 	size: (size: any) => size === 50 || size === 70,
// 	color: (color: any) => ['blue', 'black'].includes(color.toLowerCase()),
// 	locations: (locations: any) => locations.find((x) => ['JAPAN', 'USA'].includes(x.toUpperCase())),
// 	details: (details: any) => details.length < 30 && details.width >= 70,
// }
const nam = 'тон'
const cc = ['СПб', 'fuck']
const gr = ['Юрлица']
const fill = {
	group: (group: string) => gr.includes(group),
	city: (city: string) => cc.includes(city),
	// name: (name: string) => name.toLowerCase().includes(nam.toLowerCase()),
}

const test = () => {
	console.log(operators.length)
	const newArr = filterArray(operators, fill)
	console.log(newArr)
}
</script>

<template lang="pug">
q-page(padding)
	.container
		.header
			q-icon(name="mdi-headset")
			.zag(@click="test") Операторы
		.grid
			q-card.aggregat
				q-input(dense v-model="query" clearable hide-bottom-space @clear="query = ''")
					template(v-slot:prepend)
						q-icon(name="mdi-magnify")
				Aggregat

			q-table.table(
				ref="table"
				:rows="filteredRows"
				:pagination="pagination"
				:columns="opercolumns"
				hide-bottom
				@row-click="goto"
				row-key="id")
				template(v-slot:body-cell-action="props")
					q-td.action(:props="props")
						q-btn(flat round icon="mdi-tooltip-check-outline" dense size="sm" color="primary" @click.stop="markOperator(props.row.id)")
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
	div {
		background: white;
		width: 100%;
	}
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
	}
	// padding: 0.5rem;
}
</style>
