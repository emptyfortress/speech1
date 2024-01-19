<script setup lang="ts">
import { ref } from 'vue'

const pagination = ref({
	page: 1,
	rowsPerPage: 8,
})

const columns = [
	{ name: 'date', label: 'Дата', field: 'date', sortable: true, align: 'left' },
	{ name: 'mark', label: 'Оценка', field: 'mark', sortable: true, align: 'right' },
	{ name: 'anketa', label: 'Анкета', field: 'anketa', sortable: true, align: 'left' },
	// { name: 'records', label: 'Записи', field: 'records', sortable: true, align: 'left' },
	{ name: 'supervisor', label: 'Супервизор', field: 'supervisor', sortable: true, align: 'left' },
]
const rows = [
	{ date: '2022-04-25 18:11', mark: 65, anketa: 'Квартальная', supervisor: 'Соловьев П.С.' },
	{ date: '2022-04-25 18:10', mark: 81, anketa: 'По категориям', supervisor: 'Воронин Т.П.' },
	{ date: '2022-04-24 18:09', mark: 77, anketa: 'Выборочная', supervisor: 'Орлова Г.Н.' },
	{ date: '2022-04-24 18:09', mark: 46, anketa: 'По категориям', supervisor: 'Соловьев П.С.' },
	{ date: '2022-04-24 18:08', mark: 62, anketa: 'Квартальная', supervisor: 'Соловьев П.С.' },
	{ date: '2022-04-24 16:44', mark: 75, anketa: 'Квартальная', supervisor: 'Воронин Т.П.' },
	{ date: '2022-04-24 16:43', mark: 74, anketa: 'По категориям', supervisor: 'Орлова Г.Н.' },
	{ date: '2022-04-24 16:08', mark: 59, anketa: 'Выборочная', supervisor: 'Соловьев П.С.' },
	{ date: '2022-04-24 16:07', mark: 53, anketa: 'Квартальная', supervisor: 'Воронин Т.П.' },
	{ date: '2022-04-24 16:06', mark: 66, anketa: 'Выборочная', supervisor: 'Воронин Т.П.' },
]
</script>

<template lang="pug">
q-table(:columns="columns"
	:rows="rows"
	:pagination="pagination"
	:filter="filter"
	rows-per-page-label="Строк на стр."
	row-key="id"
	).table
</template>

<style scoped lang="scss"></style>
