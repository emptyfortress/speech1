<script setup lang="ts">
import { ref } from 'vue'
import { operators } from '@/stores/operators'
import type { QTableColumn } from 'quasar'

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
	console.log(row.name)
}
const markOperator = (id: number) => {
	console.log('fuck: ', id)
}
</script>

<template lang="pug">
q-page(padding)
	.container
		.header
			q-icon(name="mdi-headset")
			.zag Операторы
		.grid
			div lakjsd
			q-table.table(
      :rows="operators"
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
	grid-template-columns: 200px 1fr;
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
	cursor: pointer;
	.action > button {
		visibility: hidden;
	}
	&:hover {
		.action > button {
			visibility: visible;
		}
	}
}
</style>
