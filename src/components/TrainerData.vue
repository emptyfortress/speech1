<script setup lang="ts">
import { ref, watch } from 'vue'
import type { QTableColumn } from 'quasar'
import TrainerDialog from '@/components/TrainerDialog.vue'

const props = defineProps<{ trainer: Trainer }>()

const cols: QTableColumn[] = [
	{
		name: 'operator',
		label: 'Оператор',
		field: 'operator',
		align: 'left',
		sortable: true,
	},
	{
		name: 'date',
		label: 'Дата',
		field: 'date',
		align: 'left',
		sortable: true,
	},
	{
		name: 'anketa',
		label: 'Анкета',
		field: 'anketa',
		align: 'left',
		sortable: true,
	},
	{
		name: 'mark',
		label: 'Оценка',
		field: 'mark',
		align: 'right',
		sortable: true,
	},
]
const cols1: QTableColumn[] = [
	{
		name: 'operator',
		label: 'Оператор',
		field: 'operator',
		align: 'left',
		sortable: true,
	},
	{
		name: 'date',
		label: 'Дата',
		field: 'date',
		align: 'left',
		sortable: true,
	},
	{
		name: 'hint',
		label: 'Подсказка',
		field: 'hint',
		align: 'left',
		sortable: true,
	},
]

const operatorNames = [
	'Иванова А.',
	'Петров И.',
	'Смирнова К.',
	'Кузнецов А.',
	'Орлов Н.',
	'Федоров В.',
	'Соколова Т.',
	'Козлов Е.',
	'Новикова Л.',
	'Тихонов Р.',
]

function randomDate(): string {
	const now = new Date()
	const past = new Date(now.getTime() - Math.random() * 1000 * 60 * 60 * 24 * 30)
	return past.toLocaleDateString('ru-RU')
}

function randomMark(average: number): number {
	const variance = Math.random() * 0.6 - 0.3 // отклонение ±0.3
	return Number(Math.max(3, Math.min(5, average + variance)).toFixed(2))
}

const rows = ref<any[]>([])
const rows1 = ref<any[]>([])

watch(
	() => props.trainer,
	(trainer) => {
		rows.value = Array.from({ length: 10 }, (_, i) => ({
			operator: operatorNames[i],
			date: randomDate(),
			anketa: `Анкета №${Math.floor(Math.random() * 1000)}`,
			mark: randomMark(trainer.averageScore),
		}))
		rows1.value = Array.from({ length: 10 }, (_, i) => ({
			operator: operatorNames[i],
			date: randomDate(),
			hint: generateLoremText(50, 200), // ← вот здесь 👈
		}))
	},
	{ immediate: true }
)

function generateLoremText(min: number = 50, max: number = 200): string {
	const lorem =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

	const repeatCount = Math.ceil(max / lorem.length)
	const fullText = Array(repeatCount).fill(lorem).join(' ')
	const targetLength = Math.floor(Math.random() * (max - min + 1)) + min

	// 👉 случайный сдвиг в пределах допустимой длины
	const maxStart = fullText.length - targetLength
	const start = Math.floor(Math.random() * maxStart)

	return fullText.slice(start, start + targetLength).trim()
}

const showDialog = ref(false)
const dialogData = ref<any>(null)
const dialogMode = ref<'evaluation' | 'hint'>('evaluation')

function openDialog(row: any, mode: 'evaluation' | 'hint') {
	// console.log(row)
	dialogData.value = row
	dialogMode.value = mode
	showDialog.value = true
}
</script>

<template lang="pug">
.trdata
	q-table.table.thinhd(flat,
		:columns="cols"
		:rows="rows"
		title='Оценки операторов'
		@row-click="(evt, row) => openDialog(row, 'evaluation')"
	)

	q-table.table.thinhd(flat,
		:columns="cols1"
		:rows="rows1"
		title='Подсказки операторам'
		@row-click="(evt, row) => openDialog(row, 'hint')"
	)
		template(v-slot:body-cell-hint='props')
			q-td.ellipsis(:props="props") {{ generateLoremText() }}

TrainerDialog(
	v-model="showDialog"
	:mode="dialogMode"
	:data="dialogData"
)
</template>

<style scoped lang="scss">
.trdata {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 1rem;
}
.ellipsis {
	max-width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
