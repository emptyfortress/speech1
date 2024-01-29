<script setup lang="ts">
import { ref } from 'vue'
import type { QTableColumn } from 'quasar'
import { useRoute, useRouter } from 'vue-router'

const pagination = ref({
	page: 1,
	rowsPerPage: 8,
})
const router = useRouter()
const route = useRoute()
const filter = ref('')

const columns: QTableColumn[] = [
	{ name: 'date', label: 'Дата', field: 'date', sortable: true, align: 'left' },
	{ name: 'anketa', label: 'Анкета', field: 'anketa', sortable: true, align: 'left' },
	{ name: 'status', label: 'Статус', field: 'status', sortable: true, align: 'left' },
	{ name: 'supervisor', label: 'Супервизор', field: 'supervisor', sortable: true, align: 'left' },
	{ name: 'mark', label: 'Оценка', field: 'mark', sortable: true, align: 'right' },
]
const rows = [
	{
		id: 0,
		date: '2022-04-25 18:11',
		mark: 65,
		status: 'Завершено',
		anketa: 'Квартальная',
		supervisor: 'Соловьев П.С.',
	},
	{
		id: 1,
		date: '2022-04-25 18:10',
		mark: 81,
		status: 'Эскалация',
		anketa: 'По категориям',
		supervisor: 'Воронин Т.П.',
	},
	{
		id: 2,
		date: '2022-04-24 18:09',
		mark: 77,
		status: 'Завершено',
		anketa: 'Выборочная',
		supervisor: 'Орлова Г.Н.',
	},
	{
		id: 3,
		date: '2022-04-24 18:09',
		mark: 46,
		status: 'В работе',
		anketa: 'По категориям',
		supervisor: 'Соловьев П.С.',
	},
	{
		id: 4,
		date: '2022-04-24 18:08',
		mark: 62,
		status: 'Завершено',
		anketa: 'Квартальная',
		supervisor: 'Соловьев П.С.',
	},
	{
		id: 5,
		date: '2022-04-24 16:44',
		mark: 75,
		status: 'Завершено',
		anketa: 'Квартальная',
		supervisor: 'Воронин Т.П.',
	},
	{
		id: 6,
		date: '2022-04-24 16:43',
		mark: 74,
		status: 'Завершено',
		anketa: 'По категориям',
		supervisor: 'Орлова Г.Н.',
	},
	{
		id: 7,
		date: '2022-04-24 16:08',
		mark: 59,
		status: 'Завершено',
		anketa: 'Выборочная',
		supervisor: 'Соловьев П.С.',
	},
	{
		id: 8,
		date: '2022-04-24 16:07',
		mark: 53,
		status: 'Завершено',
		anketa: 'Квартальная',
		supervisor: 'Воронин Т.П.',
	},
	{
		id: 9,
		date: '2022-04-24 16:06',
		mark: 66,
		status: 'Завершено',
		anketa: 'Выборочная',
		supervisor: 'Воронин Т.П.',
	},
]

const goto = (evt: Event, row: any, index: number) => {
	let id = route.params.id
	router.push(`/oper/${id}/eval`)
}
</script>

<template lang="pug">
q-table(:columns="columns"
	:rows="rows"
	:pagination="pagination"
	:filter="filter"
	@row-click="goto"
	rows-per-page-label="Строк на стр."
	row-key="id"
	).table
	template(v-slot:body-cell-status="props")
		q-td(:props="props")
			div(v-if="props.row.status == 'Завершено'") {{ props.row.status }}
			q-badge(v-else color="purple" :label="props.row.status")
</template>

<style scoped lang="scss"></style>
