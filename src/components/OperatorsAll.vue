<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { operators } from '@/stores/operators'
import type { QTableColumn } from 'quasar'
import Aggregat from '@/components/Aggregat.vue'
import { useOperatorList } from '@/stores/operatorList'
import { buildAggregate, filterArray } from '@/utils/utils'
import { useRoute, useRouter } from 'vue-router'

const opList = useOperatorList()
const router = useRouter()

const opercolumns: QTableColumn[] = [
	{ name: 'name', label: 'Оператор', field: 'name', align: 'left', sortable: true },
	{ name: 'city', label: 'Город', field: 'city', align: 'left', sortable: true },
	{ name: 'group', label: 'Группа', field: 'group', align: 'left', sortable: true },
	{ name: 'date', label: 'Last evaluation', field: 'date', align: 'right', sortable: true },
	{ name: 'good', label: 'Оценка', field: 'good', align: 'right', sortable: true },
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
const selected = ref([])

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
	let temp = buildAggregate(operators, ['city', 'group', 'date'])
	opList.setAggregat(temp)
})
const goToOp = () => {
	if (opList.selectedOperators.length > 0) {
		const firstOp: Operator = opList.selectedOperators[0]
		router.push(`/oper/${firstOp.id}`)
	}
}
</script>

<template lang="pug">
q-page(padding)
	.container
		.header
			q-icon(name="mdi-headset")
			.zag Операторы
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
				template(v-slot:body-cell-action="props")
					q-td.action(:props="props")
						q-btn(flat round icon="mdi-tooltip-check-outline" dense size="sm" color="primary" @click.stop="markOperator(props.row.id)")

			div
			div
				transition(name="slide-top")
					.mybuttons(v-show="opList.selectedOperators.length")
						q-btn(color="primary" label="Просмотреть" @click="goToOp")
						q-btn(color="primary" label="Оценить" @click="goToOp")
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
	// div {
	// 	background: white;
	// 	width: 100%;
	// }
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
