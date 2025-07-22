<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import type { QTableColumn } from 'quasar'

const props = defineProps<{
	trainers: Trainer[]
}>()

const emit = defineEmits<{
	(e: 'select', trainer: Trainer | null): void
}>()

const columns = ref<QTableColumn[]>([
	{
		name: 'avatar',
		label: '',
		field: 'avatar',
		align: 'center',
		style: 'width: 56px',
		sortable: false,
	},
	{
		name: 'lastName',
		label: 'Тренер',
		field: 'lastName',
		align: 'left',
		sortable: true,
	},
	{
		name: 'operatorCount',
		label: 'Операторы',
		field: 'operatorCount',
		align: 'right',
		sortable: true,
	},
	{
		name: 'evaluationCount',
		label: 'Оценки',
		field: 'evaluationCount',
		align: 'right',
		sortable: true,
	},
	{
		name: 'appelation',
		label: 'Аппеляции',
		field: 'appelation',
		align: 'right',
		sortable: true,
	},
	{
		name: 'correction',
		label: 'Исправления',
		field: 'correction',
		align: 'right',
		sortable: true,
	},
	{
		name: 'averageScore',
		label: 'Средний балл',
		field: 'averageScore',
		align: 'center',
		format: (val: number) => val.toFixed(2),
		sortable: true,
	},
])

const selected = ref<number | null>(null)

function handleRowClick(_: Event, row: Trainer, index: number) {
	if (selected.value === row.id) {
		selected.value = null
		emit('select', null)
	} else {
		selected.value = row.id
		emit('select', row)
	}
}

function getAvatarSrc(fileName: string): string {
	return new URL(`../assets/img/avatars/${fileName}`, import.meta.url).href
}

const getRowClass = (row: Trainer) => {
	return row.id == selected.value ? 'selected' : ''
}

const pagination = {
	rowsPerPage: 0,
}
</script>

<template lang="pug">
q-table.table.thinhd(
  :rows="trainers"
  :columns="columns"
  row-key="id"
  flat
	selection='single'
	:v-model:selected="selected"
  @row-click="handleRowClick"
	:table-row-class-fn='getRowClass'
)

	template(v-slot:header-selection="props")
	template(v-slot:body-selection="props")

	template(v-slot:body-cell-avatar="props")
		q-td(:props="props")
			q-avatar(size="32px")
				img(
					:src="getAvatarSrc(props.row.photoUrl)",
					alt="avatar",
					style="object-fit: cover"
				)

</template>

<style scoped lang="scss">
:deep(.q-table--col-auto-width) {
	display: none;
}
</style>
