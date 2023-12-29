<script setup lang="ts">
import { ref, computed } from 'vue'
import { operators } from '@/stores/operators'
import type { QTableColumn } from 'quasar'
import Aggregat from '@/components/Aggregat.vue'
import { useOperatorList } from '@/stores/operatorList'

type List = {
	title: string
	value: boolean
	badge: number
}
type Block = {
	col: string
	name: string
	list: List[]
}
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
const goto = (evt, row, index) => {
	// console.log(row.name)
	console.log(table.value.filteredSortedRows)
}
const markOperator = (id: number) => {
	console.log('fuck: ', id)
}
const filter = ref('')
const city = ref(false)
const group = ref(false)
const table = ref()

// this is computed prop from quasar table
const filteredRows = computed(() => {
	if (!!table.value) {
		return table.value?.filteredSortedRows
	} else return operators
})

const oper = ref(operators)
const checkedItems = ref()

const aggregateData = computed(() => {
	let agg: Block[] = []
	const iteration = ['city', 'group']
	iteration.forEach((it: string) => {
		const block = [...new Set(operators.map((item: any) => item[it]))]
		const blockname = (it: string) => {
			switch (it) {
				case 'city':
					return 'Город'
				case 'group':
					return 'Группа'
				default:
					return 'Остальное'
			}
		}
		const list = block.map((el: any) => {
			const length = filteredRows.value.filter((item: any) => item[it] === el).length
			return {
				title: el,
				value: false,
				badge: length,
			}
		})
		list.sort((a, b) => b.badge - a.badge)

		const blocks: Block = {
			col: it,
			name: blockname(it),
			list: list,
		}

		agg.push(blocks)
	})

	return agg
})
</script>

<template lang="pug">
q-page(padding)
	.container
		.header
			q-icon(name="mdi-headset")
			.zag(@click="test" ) Операторы
		.grid
			q-card.aggregat
				q-input(dense v-model="filter" clearable hide-bottom-space @clear="filter = ''")
					template(v-slot:prepend)
						q-icon(name="mdi-magnify")
				Aggregat(:data="aggregateData")

			q-table.table(
			ref="table"
      :rows="oper"
			:pagination="pagination"
      :columns="opercolumns"
			:filter="filter"
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
