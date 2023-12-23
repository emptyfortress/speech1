<script setup lang="ts">
import { ref } from 'vue'
import { operators } from '@/stores/operators'
import type { QTableColumn } from 'quasar'

const opercolumns: QTableColumn[] = [
	{ name: 'name', label: 'Оператор', field: 'name', align: 'left', sortable: true },
	{ name: 'city', label: 'Город', field: 'city', align: 'left', sortable: true },
	{ name: 'group', label: 'Группа', field: 'group', align: 'left', sortable: true },
	{ name: 'calls', label: 'Звонки', field: 'calls', align: 'left', sortable: true },
	{ name: 'marks', label: 'Оценка', field: 'marks', align: 'left', sortable: true },
	{ name: 'action', label: '', field: 'action', align: 'right', sortable: false },
]
const pagination = ref({
	sortBy: 'name' as keyof Row,
	descending: false,
	page: 1,
	rowsPerPage: 0,
})
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
      row-key="name")
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
</style>
