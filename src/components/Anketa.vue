<script setup lang="ts">
import { ref } from 'vue'
import type { QTableColumn } from 'quasar'
import AnketaDialog from '@/components/AnketaDialog.vue'

const panel = ref(true)

const cols: QTableColumn[] = [
	{ name: 'anketa', label: 'Анкета', field: 'anketa', sortable: true, align: 'left' },
	{ name: 'descr', label: 'Описание', field: 'descr', sortable: true, align: 'left' },
	{ name: 'date', label: 'Дата создания', field: 'date', sortable: true, align: 'left' },
	{ name: 'author', label: 'Создал', field: 'author', sortable: true, align: 'left' },
	{ name: 'status', label: 'Статус', field: 'status', sortable: true, align: 'left' },
	{ name: 'action', label: '', field: 'action', sortable: false, align: 'right' },
]
const rows = ref<Anketa[]>([
	{
		id: 0,
		anketa: 'Квартальная',
		descr: 'Для оценок раз в квартал',
		date: '2022-04-25 18:11',
		status: 'Активна',
		author: 'Соловьев П.С.',
	},
	{
		id: 1,
		anketa: 'По категориям',
		descr: 'Для оценок категорий',
		date: '2022-04-25 18:11',
		status: 'Активна',
		author: 'Соловьев П.С.',
	},
	{
		id: 2,
		date: '2022-04-24 18:09',
		status: 'Активна',
		anketa: 'Выборочная',
		descr: 'Разовые проверки',
		author: 'Орлова Г.Н.',
	},
	{
		id: 3,
		date: '2022-05-27 18:09',
		status: 'На утверждении',
		anketa: 'Тестовая',
		descr: 'Тест на устойчивость',
		author: 'Орлова Г.Н.',
	},
])
const dialog = ref(false)

const current = ref<Anketa>(rows.value[0])
const currIndex = ref(0)
const showPreview = (evt: Event, row: any, index: number) => {
	current.value = row
	currIndex.value = index
	dialog.value = !dialog.value
}
const create = () => {
	console.log(111)
}
const duble = () => {
	let temp: Anketa = {
		id: rows.value.length,
		date: '2024-02-05 18:11',
		status: 'Подготовка',
		anketa: current.value.anketa + '-copy',
		descr: current.value.descr,
		author: current.value.author,
	}
	rows.value.push(temp)
	current.value = temp
	currIndex.value += 1
}
const remove = () => {
	rows.value.splice(currIndex.value, 1)
}
const kill = (ind: number) => {
	rows.value.splice(ind, 1)
}
</script>

<template lang="pug">
q-page(padding)
	.container
		q-expansion-item(v-model="panel" default-opened)
			template(v-slot:header)
				q-item-section.line(avatar)
					q-avatar(icon="mdi-playlist-check" flat)
				q-item-section
					.zag Анкеты
			q-card-section.q-px-md
				q-table(
					:columns="cols"
					:rows="rows"
					@row-click="showPreview"
					flat
					hide-pagination)
					template(v-slot:body-cell-action="props")
						q-td(:props="props")
							q-btn(flat round icon="mdi-trash-can-outline" dense @click.stop="" size="sm") 
								q-menu(anchor="bottom right" self="top right")
									q-list
										q-item(clickable v-close-popup @click="kill(props.rowIndex)").pink
											q-item-section Удалить


			q-card-actions.q-mx-md(align="right")
				q-btn(unelevated color="primary" label="Создать анкету" @click="create")
	AnketaDialog(v-model="dialog" :anketa="current" @duble="duble")
</template>

<style scoped lang="scss">
.header {
	margin-top: 1rem;
	display: flex;
	justify-content: start;
	gap: 2rem;
	align-items: center;
}
tr {
	.q-btn {
		visibility: hidden;
	}
	&:hover {
		.q-btn {
			visibility: visible;
		}
	}
}
:deep(.q-btn .q-icon) {
	color: #999;
	&:hover {
		color: #333;
	}
}
</style>
