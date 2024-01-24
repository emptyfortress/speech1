<script setup lang="ts">
import { ref } from 'vue'
import type { QTableColumn } from 'quasar'

const pagination = ref({
	page: 1,
	rowsPerPage: 8,
})

const filter = ref('')

const columns: QTableColumn[] = [
	{ name: 'date', label: 'Дата', field: 'date', sortable: true, align: 'left' },
	{ name: 'client', label: 'Клиент', field: 'client', sortable: true, align: 'left' },
	{ name: 'group', label: 'Группа', field: 'group', sortable: true, align: 'right' },
	{ name: 'category', label: 'Категория', field: 'category', sortable: true, align: 'left' },
	{ name: 'supervisor', label: 'Супервизор', field: 'supervisor', sortable: true, align: 'left' },
	{ name: 'anketa', label: 'Анкета', field: 'anketa', sortable: true, align: 'left' },
	{ name: 'mark', label: 'Оценка', field: 'mark', sortable: true, align: 'left' },
]
const rows = [
	{
		date: '2022-04-25 18:11',
		mark: 65,
		anketa: 'Квартальная',
		supervisor: 'Соловьев П.С.',
		client: 'Григорий',
		group: 'Юрлица',
		category: 'Продажи',
	},
	{ date: '2022-04-25 18:10', client: 'Александр', group: 'Юрлица', category: 'Продажи' },
	{
		date: '2022-04-24 18:09',
		mark: 77,
		anketa: 'Выборочная',
		supervisor: 'Орлова Г.Н.',
		client: 'Лев',
		group: 'Физлица',
		category: 'Сервис',
	},
	{ date: '2022-04-24 18:09', client: 'Андрей', group: 'История', category: 'Продажи' },
	{ date: '2022-04-24 18:08', client: 'Роман', group: 'Юрлица', category: 'Оплата' },
	{ date: '2022-04-24 16:44', client: 'Арсений', group: 'История', category: 'Сервис' },
	{ date: '2022-04-24 16:43', client: 'Степан', group: 'Юрлица', category: 'Продажи' },
	{ date: '2022-04-24 16:08', client: 'Владислав', group: 'Юрлица', category: 'Оплата' },
	{ date: '2022-04-24 16:07', client: 'Никита', group: 'История', category: 'Сервис' },
	{ date: '2022-04-24 16:06', client: 'Глеб', group: 'История', category: 'Оплата' },
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
